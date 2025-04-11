import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBox, FaTruck, FaMapMarkerAlt, FaCheckCircle, FaUser, FaEnvelope, FaPhone, FaCreditCard, FaCalendarAlt, FaShippingFast } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserApis } from '../../../apis/userApi/userApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import DashboardLayout from '../../../components/DashboardLayout';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';

interface OrderItem {
  id: number;
  product_id: number;
  price: string;
  quantity: number;
  total: string;
  name?: string;
  product?: {
    id: number;
    product_name: string;
    product_code: string;
    product_images: string[];
    product_description: string;
    product_status: string;
    stock_quantity: number;
    selling_price: string;
    // Add other product fields as needed
  };
}

interface Customer {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  phone_number?: string;
  profile_picture?: string;
  username?: string;
  customer_code?: string;
}

interface Address {
  id: number;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state?: string;
  state_name?: string;
  postal_code?: string;
  country?: string;
  country_name?: string;
  address_name?: string;
  phone_number?: string;
  email?: string;
}

interface PaymentRecord {
  coupon?: number;
  delivery: number;
  discount: number;
  product: number;
  productWeight?: number;
  tax: number;
  total: number;
  verifiedPaymentAmount?: number;
}

interface Order {
  id: number;
  order_code: string;
  customer_id: number;
  customer_address_id: number;
  status: string;
  payment_method: string;
  delivery_method: string;
  subtotal: string;
  total: string;
  currency: string;
  created_at: string;
  updated_at: string;
  order_items: OrderItem[];
  customer?: Customer;
  shipping_address?: Address;
  customer_address?: Address;
  payment_record?: PaymentRecord;
  order_step?: string;
  order_type?: string;
  payment_link?: string;
  transaction_id?: number;
  metadata?: any;
  deleted_at?: string | null;
}


const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const selectedStore = useSelector((state: RootState) => state.globalState?.selectedStore || null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);
  const [delivery, setDelivery] = useState<any>(null);

  useEffect(() => {
    if (!selectedStore || !orderId) {
      toast.error("Missing store or order ID");
      navigate('/delivery');
      return;
    }

    const fetchOrderDetails = async () => {
      setIsLoading(true);
      try {
        const response = await UserApis.getOneOrder(selectedStore, orderId);
        if (response?.data) {
          setOrder(response.data.data.order);
          setDelivery(response.data.data.delivery);
        } else {
          toast.error("Failed to load order details");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        toast.error("Failed to load order details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [selectedStore, orderId, navigate]);

  // Format date
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  // Format currency
  const formatCurrency = (amount: string | number, currency: string) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return `${currency} ${numAmount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  // Get status color based on current status
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('delivered') || statusLower.includes('completed') || statusLower.includes('paid')) 
      return 'bg-green-100 text-green-800';
    if (statusLower.includes('transit') || statusLower.includes('processing')) 
      return 'bg-blue-100 text-blue-800';
    if (statusLower.includes('pending')) 
      return 'bg-yellow-100 text-yellow-800';
    if (statusLower.includes('cancelled') || statusLower.includes('failed')) 
      return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  // Get customer name from order
  const getCustomerName = (order: Order | null) => {
    if (!order) return "N/A";
    
    if (order.customer?.full_name) {
      return order.customer.full_name;
    } else if (order.customer?.first_name && order.customer?.last_name) {
      return `${order.customer.first_name} ${order.customer.last_name}`;
    } else if (order.customer?.name) {
      return order.customer.name;
    }
    
    return "N/A";
  };

  // Get customer email from order
  const getCustomerEmail = (order: Order | null) => {
    if (!order) return "N/A";
    
    if (order.customer?.email) {
      return order.customer.email;
    } else if (order.shipping_address?.email || order.customer_address?.email) {
      return order.shipping_address?.email || order.customer_address?.email;
    }
    
    return "N/A";
  };

  // Get customer phone from order
  const getCustomerPhone = (order: Order | null) => {
    if (!order) return "N/A";
    
    if (order.customer?.phone) {
      return order.customer.phone;
    } else if (order.customer?.phone_number) {
      return order.customer.phone_number;
    } else if (order.shipping_address?.phone_number || order.customer_address?.phone_number) {
      return order.shipping_address?.phone_number || order.customer_address?.phone_number;
    }
    
    return "N/A";
  };

  // Get shipping address from order
  const getShippingAddress = (order: Order | null) => {
    if (!order) return null;
    
    return order.shipping_address || order.customer_address || null;
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

  // Get the shipping address
  const shippingAddress = getShippingAddress(order);

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4">
        {/* <div className="mb-6">
          <Link
            to="/delivery"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft className="mr-2" /> Back to Deliveries
          </Link>
        </div> */}

        {order ? (
          <div className="space-y-8">
            {/* Order Header */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-blue-600 px-6 py-4">
                <h1 className="text-xl font-bold text-white">
                  Order #{order.order_code}
                </h1>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      {order.order_step && (
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.order_step)}`}>
                          {order.order_step}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-gray-600">
                      Order Date: {formatDate(order.created_at)}
                    </p>
                    {order.order_type && (
                      <p className="mt-1 text-gray-600">
                        Order Type: <span className="capitalize">{order.order_type}</span>
                      </p>
                    )}
                  </div>
                  <div className="mt-4 md:mt-0 flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-3">
                    {delivery?.tracking_number && (
                      <Link 
                        to={`/delivery/track/${delivery.tracking_number}`}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <FaTruck className="mr-2" />
                        Track Delivery
                      </Link>
                    )}
                    {order.payment_link && (
                      <a 
                        href={order.payment_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                      >
                        <FaCreditCard className="mr-2" />
                        Payment Link
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Order Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h2 className="text-lg font-semibold mb-3 flex items-center">
                      <FaUser className="text-gray-400 mr-2" />
                      Customer Information
                    </h2>
                    <div className="space-y-2">
                      <p><span className="font-medium">Name:</span> {getCustomerName(order)}</p>
                      {order.customer?.username && (
                        <p><span className="font-medium">Username:</span> {order.customer.username}</p>
                      )}
                      {order.customer?.customer_code && (
                        <p><span className="font-medium">Customer Code:</span> {order.customer.customer_code}</p>
                      )}
                      <p className="flex items-center">
                        <FaEnvelope className="text-gray-400 mr-2" />
                        {getCustomerEmail(order)}
                      </p>
                      <p className="flex items-center">
                        <FaPhone className="text-gray-400 mr-2" />
                        {getCustomerPhone(order)}
                      </p>
                      {order.customer?.profile_picture && (
                        <div className="mt-3">
                          <img 
                            src={order.customer.profile_picture} 
                            alt="Customer" 
                            className="w-16 h-16 object-cover rounded-full"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h2 className="text-lg font-semibold mb-3 flex items-center">
                      <FaMapMarkerAlt className="text-gray-400 mr-2" />
                      Shipping Address
                    </h2>
                    {shippingAddress ? (
                      <div>
                        {shippingAddress.address_name && (
                          <p className="font-medium mb-1">{shippingAddress.address_name}</p>
                        )}
                        <p>{shippingAddress.address_line_1}</p>
                        {shippingAddress.address_line_2 && <p>{shippingAddress.address_line_2}</p>}
                        <p>
                          {shippingAddress.city}
                          {shippingAddress.state_name || shippingAddress.state ? `, ${shippingAddress.state_name || shippingAddress.state}` : ''}
                          {shippingAddress.postal_code ? ` ${shippingAddress.postal_code}` : ''}
                        </p>
                        {(shippingAddress.country || shippingAddress.country_name) && (
                          <p>{shippingAddress.country || shippingAddress.country_name}</p>
                        )}
                        {shippingAddress.phone_number && (
                          <p className="mt-2">
                            <FaPhone className="text-gray-400 mr-2 inline" />
                            {shippingAddress.phone_number}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500">Shipping address not available</p>
                    )}
                  </div>
                </div>
                
                {/* Payment and Delivery Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h2 className="text-lg font-semibold mb-3 flex items-center">
                      <FaCreditCard className="text-gray-400 mr-2" />
                      Payment Details
                    </h2>
                    <div className="space-y-2">
                      <p><span className="font-medium">Method:</span> <span className="capitalize">{order.payment_method}</span></p>
                      <p>
                        <span className="font-medium">Status:</span> 
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </p>
                      {order.transaction_id && (
                        <p><span className="font-medium">Transaction ID:</span> {order.transaction_id}</p>
                      )}
                      <p><span className="font-medium">Subtotal:</span> {formatCurrency(order.subtotal, order.currency)}</p>
                      {order.payment_record && (
                        <>
                          <p><span className="font-medium">Products:</span> {formatCurrency(order.payment_record.product, order.currency)}</p>
                          <p><span className="font-medium">Delivery:</span> {formatCurrency(order.payment_record.delivery, order.currency)}</p>
                          {order.payment_record.tax > 0 && (
                            <p><span className="font-medium">Tax:</span> {formatCurrency(order.payment_record.tax, order.currency)}</p>
                          )}
                          {order.payment_record.discount > 0 && (
                            <p><span className="font-medium">Discount:</span> -{formatCurrency(order.payment_record.discount, order.currency)}</p>
                          )}
                          {order.payment_record.coupon > 0 && (
                            <p><span className="font-medium">Coupon:</span> -{formatCurrency(order.payment_record.coupon, order.currency)}</p>
                          )}
                          {order.payment_record.verifiedPaymentAmount && (
                            <p><span className="font-medium">Verified Amount:</span> {formatCurrency(order.payment_record.verifiedPaymentAmount, order.currency)}</p>
                          )}
                        </>
                      )}
                      <p className="text-lg font-semibold mt-2"><span className="font-medium">Total:</span> {formatCurrency(order.total, order.currency)}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h2 className="text-lg font-semibold mb-3 flex items-center">
                      <FaTruck className="text-gray-400 mr-2" />
                      Delivery Information
                    </h2>
                    {delivery ? (
                      <div className="space-y-2">
                        <p><span className="font-medium">Company:</span> <span className="capitalize">{delivery.company_name}</span></p>
                        <p><span className="font-medium">Tracking Number:</span> {delivery.tracking_number || "Not available yet"}</p>
                        <p>
                          <span className="font-medium">Status:</span> 
                          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${getStatusColor(delivery.status)}`}>
                            {delivery.status}
                          </span>
                        </p>
                        {delivery.orderFetch && delivery.orderFetch.length > 0 && delivery.orderFetch[0].orderStatus && (
                          <p>
                            <span className="font-medium">Delivery Status:</span> 
                            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${getStatusColor(delivery.orderFetch[0].orderStatus)}`}>
                              {delivery.orderFetch[0].orderStatus}
                            </span>
                          </p>
                        )}
                        <p><span className="font-medium">Cost:</span> {formatCurrency(delivery.cost, delivery.currency)}</p>
                        <p><span className="font-medium">Created:</span> {formatDate(delivery.created_at).split(',')[0]}</p>
                        
                        {delivery.dispatched_at && (
                          <p><span className="font-medium">Dispatched:</span> {formatDate(delivery.dispatched_at).split(',')[0]}</p>
                        )}
                        {delivery.estimated_delivery_at && (
                          <p><span className="font-medium">Estimated Delivery:</span> {formatDate(delivery.estimated_delivery_at).split(',')[0]}</p>
                        )}
                        {delivery.delivered_at && (
                          <p><span className="font-medium">Delivered:</span> {formatDate(delivery.delivered_at).split(',')[0]}</p>
                        )}
                        {delivery.delivery_note && (
                          <p><span className="font-medium">Note:</span> {delivery.delivery_note}</p>
                        )}
                        {delivery.support_contact && (
                          <p><span className="font-medium">Support Contact:</span> {delivery.support_contact}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500">Delivery information not available</p>
                    )}
                  </div>
                </div>
                
                {/* Delivery Logistics Details */}
                {delivery && delivery.orderFetch && delivery.orderFetch.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-md mb-8">
                    <h2 className="text-lg font-semibold mb-3 flex items-center">
                      <FaShippingFast className="text-gray-400 mr-2" />
                      Logistics Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        {delivery.orderFetch[0].manifest && (
                          <>
                            {delivery.orderFetch[0].manifest.requestType && (
                              <p><span className="font-medium">Delivery Type:</span> <span className="capitalize">{delivery.orderFetch[0].manifest.requestType}</span></p>
                            )}
                            {delivery.orderFetch[0].manifest.pickUpState && (
                              <p><span className="font-medium">Pickup State:</span> {delivery.orderFetch[0].manifest.pickUpState}</p>
                            )}
                            {delivery.orderFetch[0].manifest.dropOffState && (
                              <p><span className="font-medium">Delivery State:</span> {delivery.orderFetch[0].manifest.dropOffState}</p>
                            )}
                            {delivery.orderFetch[0].manifest.PickUpHub && (
                              <p><span className="font-medium">Pickup Hub:</span> {delivery.orderFetch[0].manifest.PickUpHub}</p>
                            )}
                            {delivery.orderFetch[0].manifest.DropOffHub && (
                              <p><span className="font-medium">Dropoff Hub:</span> {delivery.orderFetch[0].manifest.DropOffHub}</p>
                            )}
                            {delivery.orderFetch[0].manifest.fragile && (
                              <p><span className="font-medium">Fragile:</span> Yes</p>
                            )}
                          </>
                        )}
                        {delivery.orderFetch[0].weight && Number(delivery.orderFetch[0].weight) > 0 && (
                          <p><span className="font-medium">Weight:</span> {delivery.orderFetch[0].weight} kg</p>
                        )}
                        {delivery.orderFetch[0].orderVerified && (
                          <p>
                            <span className="font-medium">Order Verified:</span>
                            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${getStatusColor(delivery.orderFetch[0].orderVerified)}`}>
                              {delivery.orderFetch[0].orderVerified}
                            </span>
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        {delivery.orderFetch[0].organizationUser && (
                          <p><span className="font-medium">Handled By:</span> {delivery.orderFetch[0].organizationUser.fullname}</p>
                        )}
                        {delivery.orderFetch[0].paymentStatus && (
                          <p>
                            <span className="font-medium">Delivery Payment:</span>
                            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${getStatusColor(delivery.orderFetch[0].paymentStatus)}`}>
                              {delivery.orderFetch[0].paymentStatus}
                            </span>
                          </p>
                        )}
                        {delivery.orderFetch[0].orderDate && (
                          <p><span className="font-medium">Order Date:</span> {delivery.orderFetch[0].orderDate}</p>
                        )}
                        {delivery.orderFetch[0].pickUpDate && (
                          <p><span className="font-medium">Pickup Date:</span> {delivery.orderFetch[0].pickUpDate}</p>
                        )}
                        {delivery.orderFetch[0].deliveryDate && (
                          <p><span className="font-medium">Delivery Date:</span> {delivery.orderFetch[0].deliveryDate}</p>
                        )}
                        {delivery.orderFetch[0].statusDescription && (
                          <p><span className="font-medium">Status Note:</span> {delivery.orderFetch[0].statusDescription}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-blue-600 px-6 py-4">
                <h2 className="text-lg font-bold text-white">
                  Order Items
                </h2>
              </div>
              
              <div className="p-6">
                {order.order_items && order.order_items.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {order.order_items.map((item:any) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {/* Show product details with more information */}
                              <div className="flex items-center">
                                {/* Show product image if available */}
                                {item.product && item.product.product_images && item.product.product_images.length > 0 && (
                                  <img 
                                    src={item.product.product_images[0]} 
                                    alt={item.product.product_name} 
                                    className="w-12 h-12 object-cover rounded-md mr-3"
                                  />
                                )}
                                <div>
                                  <p className="font-medium">
                                    {item.product?.product_name || item.name || `Product #${item.product_id}`}
                                  </p>
                                  {item.product?.product_code && (
                                    <p className="text-xs text-gray-500">Code: {item.product.product_code}</p>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatCurrency(item.price, order.currency)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {formatCurrency(item.total, order.currency)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td colSpan={3} className="px-6 py-4 text-right text-sm font-medium text-gray-900">Subtotal:</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {formatCurrency(order.subtotal, order.currency)}
                          </td>
                        </tr>
                        {order.payment_record && (
                          <>
                            <tr>
                              <td colSpan={3} className="px-6 py-4 text-right text-sm font-medium text-gray-900">Delivery:</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {formatCurrency(order.payment_record.delivery.toString(), order.currency)}
                              </td>
                            </tr>
                            {order.payment_record.tax > 0 && (
                              <tr>
                                <td colSpan={3} className="px-6 py-4 text-right text-sm font-medium text-gray-900">Tax:</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {formatCurrency(order.payment_record.tax.toString(), order.currency)}
                                </td>
                              </tr>
                            )}
                            {order.payment_record.discount > 0 && (
                              <tr>
                                <td colSpan={3} className="px-6 py-4 text-right text-sm font-medium text-gray-900">Discount:</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  -{formatCurrency(order.payment_record.discount.toString(), order.currency)}
                                </td>
                              </tr>
                            )}
                            {order.payment_record.coupon > 0 && (
                              <tr>
                                <td colSpan={3} className="px-6 py-4 text-right text-sm font-medium text-gray-900">Coupon:</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  -{formatCurrency(order.payment_record.coupon.toString(), order.currency)}
                                </td>
                              </tr>
                            )}
                          </>
                        )}
                        <tr>
                          <td colSpan={3} className="px-6 py-4 text-right text-base font-bold text-gray-900">Total:</td>
                          <td className="px-6 py-4 whitespace-nowrap text-base font-bold text-gray-900">
                            {formatCurrency(order.total, order.currency)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FaBox className="mx-auto text-4xl mb-3 text-gray-300" />
                    <p>No items found for this order.</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Order Timeline */}
            {delivery && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-blue-600 px-6 py-4">
                  <h2 className="text-lg font-bold text-white">
                    Order Timeline
                  </h2>
                </div>
                
                <div className="p-6">
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute h-full w-0.5 bg-gray-200 left-6 top-0"></div>
                    
                    {/* Timeline Events */}
                    <div className="ml-16 space-y-8">
                      {/* Order Created */}
                      <div className="relative">
                        <div className="absolute -left-16 mt-1.5 rounded-full w-8 h-8 bg-blue-100 flex items-center justify-center">
                          <FaCalendarAlt className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-md font-semibold">Order Placed</h3>
                          <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
                          <p className="text-sm mt-1">Order #{order.order_code} was created</p>
                        </div>
                      </div>
                      
                      {/* Payment Received */}
                      {order.status === 'paid' && (
                        <div className="relative">
                          <div className="absolute -left-16 mt-1.5 rounded-full w-8 h-8 bg-green-100 flex items-center justify-center">
                            <FaCreditCard className="text-green-600" />
                          </div>
                          <div>
                            <h3 className="text-md font-semibold">Payment Received</h3>
                            <p className="text-sm text-gray-500">{formatDate(order.updated_at)}</p>
                            <p className="text-sm mt-1">Payment of {formatCurrency(order.total, order.currency)} received via {order.payment_method}</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Order Confirmed */}
                      {order.order_step === 'confirmed' && (
                        <div className="relative">
                          <div className="absolute -left-16 mt-1.5 rounded-full w-8 h-8 bg-blue-100 flex items-center justify-center">
                            <FaCheckCircle className="text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-md font-semibold">Order Confirmed</h3>
                            <p className="text-sm text-gray-500">{formatDate(order.updated_at)}</p>
                            <p className="text-sm mt-1">Order has been confirmed and is being processed</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Delivery Created */}
                      <div className="relative">
                        <div className="absolute -left-16 mt-1.5 rounded-full w-8 h-8 bg-blue-100 flex items-center justify-center">
                          <FaShippingFast className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-md font-semibold">Delivery Created</h3>
                          <p className="text-sm text-gray-500">{formatDate(delivery.created_at)}</p>
                          <p className="text-sm mt-1">
                            Delivery arranged with {delivery.company_name}
                            {delivery.tracking_number && ` (Tracking #${delivery.tracking_number})`}
                          </p>
                        </div>
                      </div>
                      
                      {/* Dispatched */}
                      {delivery.dispatched_at && (
                        <div className="relative">
                          <div className="absolute -left-16 mt-1.5 rounded-full w-8 h-8 bg-blue-100 flex items-center justify-center">
                            <FaTruck className="text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-md font-semibold">Order Dispatched</h3>
                            <p className="text-sm text-gray-500">{formatDate(delivery.dispatched_at)}</p>
                            <p className="text-sm mt-1">Your order is on its way</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Delivered */}
                      {delivery.delivered_at && (
                        <div className="relative">
                          <div className="absolute -left-16 mt-1.5 rounded-full w-8 h-8 bg-green-100 flex items-center justify-center">
                            <FaCheckCircle className="text-green-600" />
                          </div>
                          <div>
                            <h3 className="text-md font-semibold">Order Delivered</h3>
                            <p className="text-sm text-gray-500">{formatDate(delivery.delivered_at)}</p>
                            <p className="text-sm mt-1">Your order has been delivered successfully</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Current Status if not delivered */}
                      {!delivery.delivered_at && (
                        <div className="relative">
                          <div className="absolute -left-16 mt-1.5 rounded-full w-8 h-8 bg-yellow-100 flex items-center justify-center">
                            <FaTruck className="text-yellow-600" />
                          </div>
                          <div>
                            <h3 className="text-md font-semibold">Current Status: {delivery.status}</h3>
                            <p className="text-sm text-gray-500">{formatDate(delivery.updated_at || delivery.created_at)}</p>
                            {delivery.orderFetch && delivery.orderFetch.length > 0 && delivery.orderFetch[0].orderStatus && (
                              <p className="text-sm mt-1">
                                Logistics Status: {delivery.orderFetch[0].orderStatus}
                                {delivery.orderFetch[0].statusDescription && ` - ${delivery.orderFetch[0].statusDescription}`}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <FaBox className="mx-auto text-5xl mb-4 text-gray-300" />
            <h2 className="text-xl font-semibold mb-2">Order Not Found</h2>
            <p className="text-gray-600 mb-6">We couldn't find order details for order #{orderId}.</p>
            <Link 
              to="/dashboard/delivery" 
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Deliveries
            </Link>
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

export default OrderDetails;