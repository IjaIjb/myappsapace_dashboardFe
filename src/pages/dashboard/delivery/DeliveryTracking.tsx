import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBox, FaTruck, FaMapMarkerAlt, FaCheckCircle, FaClock } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserApis } from '../../../apis/userApi/userApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import DashboardLayout from '../../../components/DashboardLayout';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';

// Updated interface based on API response
interface TrackingHistoryItem {
  orderStatus: string;
  statusCreationDate: string;
  statusDescription: string;
}

interface TrackingOrder {
  createdAt: string;
  orderNo: string;
  orderStatus: string;
  proofOfDelivery: string | null;
  recipientAddress: string;
  recipientName: string;
  recipientState: string;
  senderAddress: string;
  senderName: string;
}

interface TrackingData {
  hostory: TrackingHistoryItem[]; // Note: keeping "hostory" as is since it's in the API response
  order: TrackingOrder;
}

interface Customer {
  id: number;
  customer_code: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone_number: string;
  username: string;
  profile_picture: string;
  status: string;
  store_code: string;
  selected_currency: string;
  country_id: number | null;
  country_name: string | null;
  state_id: number | null;
  state_name: string | null;
  date_of_birth: string | null;
  gender: string | null;
  lga: string | null;
  other_name: string | null;
  google_id: string | null;
  address: string | null;
}

interface DeliveryDetails {
  address_line_1: string;
  address_line_2: string | null;
  address_name: string;
  city: string;
  country_name: string | null;
  email: string;
  phone_number: string;
  postal_code: string;
  state_name: string | null;
  customer: Customer;
  customer_id: number;
  is_default: number;
  store_code: string;
}


interface Product {
  id: number;
  product_name: string;
  product_description: string;
  product_short_description: string;
  product_images: string[];
  selling_price: string;
  product_code: string;
  product_status: string;
}

interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  price: string;
  quantity: number;
  total: string;
  created_at: string;
  updated_at: string;
  product?: Product;
}

interface PaymentRecord {
  coupon: number;
  delivery: number;
  discount: number;
  product: number;
  productWeight: number;
  tax: number;
  total: number;
  verifiedPaymentAmount: number;
}

interface Order {
  id: number;
  order_code: string;
  status: string;
  currency: string;
  subtotal: string;
  total: string;
  payment_method: string;
  delivery_method: string;
  created_at: string;
  updated_at: string;
  order_step: string;
  order_type: string;
  payment_record: PaymentRecord;
  order_items: OrderItem[];
}

interface Delivery {
  id: number;
  order_id: number;
  company_name: string;
  tracking_number: string;
  cost: string;
  currency: string;
  status: string;
  created_at: string;
  store_code: string;
  support_contact: string | null;
  delivered_at: string | null;
  dispatched_at: string | null;
  estimated_delivery_at: string | null;
  delivery_note: string | null;
}

interface ApiResponse {
  delivery: Delivery;
  order: Order;
  orderItems: OrderItem[];
  orderTrack: TrackingData;
  deliveryDetails: DeliveryDetails;
}

const DeliveryTracking = () => {
  const { trackingNumber } = useParams();
  const navigate = useNavigate();
  const selectedStore = useSelector((state: RootState) => state.globalState?.selectedStore || null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails | null>(null);

  useEffect(() => {
    if (!selectedStore || !trackingNumber) {
      toast.error("Missing store or tracking number");
      navigate('/delivery');
      return;
    }

    const fetchTrackingDetails = async () => {
      setIsLoading(true);
      try {
        const response = await UserApis.getTrackOneOrder(selectedStore, trackingNumber);
        if (response?.data && response.data.data) {
          // Updated to match actual API response structure
          const responseData: ApiResponse = response.data.data;
          setTrackingData(responseData.orderTrack);
          setDelivery(responseData.delivery);
          setOrder(responseData.order);
          setOrderItems(responseData.orderItems || []);
          setDeliveryDetails(responseData.deliveryDetails);
        } else {
          toast.error("Failed to load tracking details");
        }
      } catch (error) {
        console.error("Error fetching tracking details:", error);
        toast.error("Failed to load tracking details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrackingDetails();
  }, [selectedStore, trackingNumber, navigate]);

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  // Get status color based on current status
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('delivered')) return 'bg-green-100 text-green-800';
    if (statusLower.includes('transit')) return 'bg-blue-100 text-blue-800';
    if (statusLower.includes('pick')) return 'bg-yellow-100 text-yellow-800';
    if (statusLower.includes('pending')) return 'bg-orange-100 text-orange-800';
    if (statusLower.includes('failed')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  // Get icon based on status
  const getStatusIcon = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('delivered')) return <FaCheckCircle className="text-green-500" />;
    if (statusLower.includes('transit')) return <FaTruck className="text-blue-500" />;
    if (statusLower.includes('pick')) return <FaBox className="text-yellow-500" />;
    if (statusLower.includes('pending')) return <FaClock className="text-orange-500" />;
    return <FaBox className="text-gray-500" />;
  };

  // Function to go back to delivery list
  const handleGoBack = () => {
    navigate('/delivery');
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <LoadingSpinner />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4">
      

        {trackingData ? (
          <>
            {/* Order Summary Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="bg-blue-600 px-6 py-4">
                <h1 className="text-xl font-bold text-white">
                  Tracking Details: {trackingData.order.orderNo}
                </h1>
              </div>

              {/* Status Banner */}
              <div className={`px-6 py-3 flex items-center justify-between ${getStatusColor(trackingData.order.orderStatus)}`}>
                <div className="flex items-center">
                  {getStatusIcon(trackingData.order.orderStatus)}
                  <span className="ml-2 font-medium">{trackingData.order.orderStatus}</span>
                </div>
                <span className="text-sm">Last Updated: {formatDate(trackingData.order.createdAt)}</span>
              </div>

              {/* Order Details */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-3">Shipping Information</h2>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <FaMapMarkerAlt className="text-gray-400 mt-1 mr-2" />
                        <div>
                          <p className="font-medium">Recipient</p>
                          <p className="text-gray-700">{trackingData.order.recipientName}</p>
                          <p className="text-gray-600">{trackingData.order.recipientAddress}</p>
                          <p className="text-gray-600">{trackingData.order.recipientState}</p>
                          {deliveryDetails && (
                            <>
                              <p className="text-gray-600">{deliveryDetails.city}</p>
                              <p className="text-gray-600">{deliveryDetails.postal_code}</p>
                              <p className="text-gray-600">{deliveryDetails.phone_number}</p>
                              <p className="text-gray-600">{deliveryDetails.email}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold mb-3">Sender Information</h2>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <FaMapMarkerAlt className="text-gray-400 mt-1 mr-2" />
                        <div>
                          <p className="font-medium">Sender</p>
                          <p className="text-gray-700">{trackingData.order.senderName}</p>
                          <p className="text-gray-600">{trackingData.order.senderAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Customer Details */}
                {deliveryDetails && deliveryDetails.customer && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h2 className="text-lg font-semibold mb-3">Customer Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-1">
                        <div className="flex items-center mb-4">
                          {deliveryDetails.customer.profile_picture ? (
                            <img 
                              src={deliveryDetails.customer.profile_picture} 
                              alt={deliveryDetails.customer.full_name} 
                              className="w-16 h-16 rounded-full object-cover border border-gray-200"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                              {deliveryDetails.customer.first_name.charAt(0)}
                              {deliveryDetails.customer.last_name.charAt(0)}
                            </div>
                          )}
                          <div className="ml-4">
                            <h3 className="font-medium text-lg">{deliveryDetails.customer.full_name}</h3>
                            <p className="text-gray-500 text-sm">@{deliveryDetails.customer.username}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Customer Code</p>
                            <p className="font-medium">{deliveryDetails.customer.customer_code}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <p className="font-medium capitalize">{deliveryDetails.customer.status}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{deliveryDetails.customer.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium">{deliveryDetails.customer.phone_number}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Currency</p>
                            <p className="font-medium">{deliveryDetails.customer.selected_currency}</p>
                          </div>
                          {deliveryDetails.customer.gender && (
                            <div>
                              <p className="text-sm text-gray-500">Gender</p>
                              <p className="font-medium capitalize">{deliveryDetails.customer.gender}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Delivery details */}
                {delivery && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h2 className="text-lg font-semibold mb-3">Delivery Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-500">Company</p>
                        <p className="font-medium">{delivery.company_name}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-500">Cost</p>
                        <p className="font-medium">{delivery.currency} {delivery.cost}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-500">Status</p>
                        <p className="font-medium">{delivery.status}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-500">Created</p>
                        <p className="font-medium">{formatDate(delivery.created_at).split(',')[0]}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Order details */}
                {order && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h2 className="text-lg font-semibold mb-3">Order Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-500">Order ID</p>
                        <p className="font-medium">{order.order_code}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-500">Payment Method</p>
                        <p className="font-medium capitalize">{order.payment_method}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="font-medium">{order.currency} {order.total}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-500">Status</p>
                        <p className="font-medium capitalize">{order.status}</p>
                      </div>
                    </div>

                    {/* Order step information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-500">Order Step</p>
                        <p className="font-medium capitalize">{order.order_step}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-500">Order Type</p>
                        <p className="font-medium capitalize">{order.order_type}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-500">Delivery Method</p>
                        <p className="font-medium capitalize">{order.delivery_method}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-500">Subtotal</p>
                        <p className="font-medium">{order.currency} {order.subtotal}</p>
                      </div>
                    </div>
                    
                    {/* Payment breakdown */}
                    {order.payment_record && (
                      <div className="mt-4">
                        <h3 className="text-md font-medium mb-2">Payment Breakdown</h3>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Product Total</p>
                              <p className="font-medium">{order.currency} {order.payment_record.product.toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Delivery Fee</p>
                              <p className="font-medium">{order.currency} {order.payment_record.delivery.toFixed(2)}</p>
                            </div>
                            {order.payment_record.discount > 0 && (
                              <div>
                                <p className="text-sm text-gray-500">Discount</p>
                                <p className="font-medium text-green-600">-{order.currency} {order.payment_record.discount.toFixed(2)}</p>
                              </div>
                            )}
                            {order.payment_record.coupon > 0 && (
                              <div>
                                <p className="text-sm text-gray-500">Coupon</p>
                                <p className="font-medium text-green-600">-{order.currency} {order.payment_record.coupon.toFixed(2)}</p>
                              </div>
                            )}
                            {order.payment_record.tax > 0 && (
                              <div>
                                <p className="text-sm text-gray-500">Tax</p>
                                <p className="font-medium">{order.currency} {order.payment_record.tax.toFixed(2)}</p>
                              </div>
                            )}
                            {order.payment_record.productWeight > 0 && (
                              <div>
                                <p className="text-sm text-gray-500">Weight Charge</p>
                                <p className="font-medium">{order.currency} {order.payment_record.productWeight.toFixed(2)}</p>
                              </div>
                            )}
                            <div className="col-span-2 md:col-span-4 border-t border-gray-200 pt-2 mt-2">
                              <div className="flex justify-between">
                                <p className="font-medium">Total Amount</p>
                                <p className="font-bold">{order.currency} {order.payment_record.total.toFixed(2)}</p>
                              </div>
                              {order.payment_record.verifiedPaymentAmount && (
                                <div className="flex justify-between mt-1">
                                  <p className="text-sm text-gray-500">Verified Payment</p>
                                  <p className="font-medium">{order.currency} {order.payment_record.verifiedPaymentAmount.toFixed(2)}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Order items */}
                    {orderItems && orderItems.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-md font-medium mb-2">Order Items</h3>
                        <div className="bg-gray-50 rounded-md overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {orderItems.map((item) => (
                                <tr key={item.id}>
                                  <td className="px-4 py-2 text-sm text-gray-900">
                                    {item.product ? (
                                      <div>
                                        <p className="font-medium">{item.product.product_name}</p>
                                        <p className="text-xs text-gray-500 mt-1">{item.product.product_short_description}</p>
                                        <p className="text-xs text-gray-400">Code: {item.product.product_code}</p>
                                      </div>
                                    ) : (
                                      `Product #${item.product_id}`
                                    )}
                                  </td>
                                  <td className="px-4 py-2">
                                    {item.product && item.product.product_images && item.product.product_images.length > 0 ? (
                                      <img 
                                        src={item.product.product_images[0]} 
                                        alt={item.product.product_name}
                                        className="w-16 h-16 object-cover rounded-md"
                                      />
                                    ) : (
                                      <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                                        <span className="text-gray-400 text-xs">No image</span>
                                      </div>
                                    )}
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{order.currency} {item.price}</td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{order.currency} {item.total}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-blue-600 px-6 py-4">
                <h2 className="text-lg font-bold text-white">Tracking Timeline</h2>
              </div>
              <div className="p-6">
                {trackingData.hostory && trackingData.hostory.length > 0 ? (
                  <div className="relative">
                    {trackingData.hostory.map((history, index) => (
                      <div key={index} className="ml-6 mb-8 relative">
                        {/* Vertical line connecting events */}
                        {index !== trackingData.hostory.length - 1 && (
                          <div className="absolute top-7 left-3 -ml-3 h-full w-0.5 bg-blue-200"></div>
                        )}
                        
                        {/* Timeline dot */}
                        <div className="absolute top-1 left-0 -ml-3">
                          <div className="h-6 w-6 rounded-full border-2 border-blue-500 bg-white flex items-center justify-center">
                            {getStatusIcon(history.orderStatus)}
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="pl-8">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-1">
                            <h3 className="text-lg font-medium text-gray-900">{history.orderStatus}</h3>
                            <span className="text-sm text-gray-500">{formatDate(history.statusCreationDate)}</span>
                          </div>
                          <p className="text-gray-600">{history.statusDescription}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <FaTruck className="mx-auto text-4xl mb-3 text-gray-300" />
                    <p>No tracking history available for this delivery yet.</p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <FaTruck className="mx-auto text-5xl mb-4 text-gray-300" />
            <h2 className="text-xl font-semibold mb-2">Tracking Information Not Found</h2>
            <p className="text-gray-600 mb-6">We couldn't find tracking information for {trackingNumber}.</p>
            <button 
              onClick={handleGoBack}
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Deliveries
            </button>
          </div>
        )}
      </div>
      
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </DashboardLayout>
  );
};

export default DeliveryTracking;