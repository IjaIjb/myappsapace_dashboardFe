import React, { useState } from 'react'
import { FaBoxOpen, FaCalendarAlt, FaCheckCircle, FaChevronDown, FaClipboardCheck, FaClipboardList, FaHandshake, FaMap, FaMapMarkerAlt, FaShoppingCart, FaStar, FaTruck, FaUser } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import useOrder from '../../../../../features/hooks/useOrder';
import useUser from "../../../../../features/hooks/useUser";
import { formatDateTimeRecord, formatOrderSummary, formatTotalAmount, getOrderStatusIndex, getPaymentMethodLogo, getStatusColor } from '../../../../../helpers/helpers';

function SingleOrder() {

  const [dropdownIndex, setDropdownIndex] = useState(null);

  const { profile } = useUser();

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const { singleOrder } = useOrder();

  const { order_items, activities } = singleOrder;

  const steps = [
    { label: "Order Placed", icon: FaClipboardCheck },
    { label: "Packaging", icon: FaBoxOpen },
    { label: "On The Road", icon: FaTruck },
    { label: "Delivered", icon: FaHandshake },
  ];

  const getOrderActivityIcon = (status) => {
    switch (status) {
      case "created":
        return <FaCalendarAlt size={20} className="text-blue-400" />;
      case "confirmed":
        return <FaCheckCircle size={20} className="text-green-500" />;
      case "on_the_way":
        return <FaMap size={20} className="text-blue-400" />;
      case "arrived_at_store":
        return <FaMapMarkerAlt size={20} className="text-blue-400" />;
      case "out_for_delivery":
        return <FaUser size={20} className="text-blue-400" />;
      case "delivered":
        return <FaCheckCircle size={20} className="text-green-500" />;
      default:
        return <FaCalendarAlt size={20} className="text-gray-400" />;
    }
  };

  const currentStep = getOrderStatusIndex(singleOrder.order_step);

  

  return (
    <div className='w-full border rounded-lg my-5 overflow-hidden'>

        {/* Header */}
      <div className="flex justify-between border-b px-3 py-4 items-center">
        <div className="label flex space-x-2">
          <NavLink to='/order-history' className='cursor-pointer'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.25 12H3.75" stroke="#191C1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10.5 5.25L3.75 12L10.5 18.75" stroke="#191C1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </NavLink>
        
          <h2 className="text-md font-quicksand font-semibold">Order Details</h2>
        </div>
        {
          singleOrder.status === "pending" && singleOrder.payment_link && (
            <NavLink to={`${singleOrder.payment_link}`} className="text-orange-500 hover:underline font-lato text-sm">Continue checkout →</NavLink>
          )
        }
        
        {
          singleOrder.status === "paid" && (
            <div className="flex items-center gap-2 font-lato text-sm text-gray-600">
              <FaCheckCircle size={18} className="text-green-500" />
              <span>Payment Received</span>
            </div>
          )
        }
       
      </div>

      <div className="middleSection border-b">
        {/* Order Details */}
        <div className="genertal p-6 space-y-5">

          <div className={`${getStatusColor(singleOrder.status, 'bg')} rounded-md p-4`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div className="flex font-lato flex-col gap-2">
                <h2 className="text-lg font-semibold">#{singleOrder.order_code}</h2>
                <p className="text-sm text-gray-600">
                  {formatOrderSummary(singleOrder)}
                </p>
              </div>
              <span className="text-2xl font-lato font-bold text-blue-500 mt-2 md:mt-0">{formatTotalAmount(singleOrder.total, singleOrder.currency)}</span>
            </div>
          </div>

          {/* <p className="text-sm text-gray-700 mb-2 text-center md:text-left">
            Order expected arrival <strong>23 Jan, 2021</strong>
          </p> */}

          <div className="flex flex-col items-center w-full p-4 md:p-6">
            <div className="relative flex flex-col md:flex-row items-center w-full max-w-4xl">
              
              {/* Progress Background Line */}
              <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-300 rounded-full -translate-y-1/2 hidden md:block"></div>
              
              {/* Progress Filled Line */}
              <div
                className="absolute top-1/2 left-0 h-2 bg-orange-500 rounded-full -translate-y-1/2 transition-all duration-500 hidden md:block"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              ></div>

              {/* Steps */}
              <div className="relative flex flex-wrap md:flex-nowrap justify-center md:justify-between w-full gap-4">
                {steps.map((step, index) => {
                  const isCompleted = index <= currentStep;
                  return (
                    <div key={index} className="flex flex-col items-center w-20 md:w-24">
                      {/* Step Icon */}
                      <div
                        className={`w-10 h-10 md:w-12 md:h-12 mt-5 flex items-center justify-center rounded-full border-4 shadow-lg transition-all duration-500 ${
                          isCompleted
                            ? "bg-orange-500 text-white border-orange-500"
                            : "bg-gray-200 text-gray-500 border-gray-400"
                        }`}
                      >
                        {<step.icon size={20} />}
                      </div>
                      
                      {/* Step Label */}
                      <p
                        className={`text-xs md:text-sm font-semibold mt-2 transition-all duration-500 text-center ${
                          isCompleted ? "text-gray-900" : "text-gray-400"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
 
      </div>

      <div className="otherSection border-b">

        <div className="p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-quicksand font-bold mb-4 text-center md:text-left">
            Order Activity
          </h2>

          {activities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6">
              <FaClipboardList size={40} className="text-gray-400 mb-2" />
              <p className="text-gray-500 text-sm md:text-base font-medium">
                No activity found for this order.
              </p>
              <p className="text-xs text-gray-400">Check back later for updates.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4"
                >
                  {/* Icon */}
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg shrink-0 ${
                      activity.status === "delivered" ? "bg-green-100" : "bg-blue-100"
                    }`}
                  >
                    {getOrderActivityIcon(activity.status)}
                  </div>
    
                  {/* Message & Date */}
                  <div className="text-center sm:text-left">
                    <p className="text-gray-700 text-sm">{activity.note || "No additional details"}</p>
                    <p className="text-xs text-gray-500">
                      {formatDateTimeRecord(activity.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
        </div>

      </div>

      <div className="forthSection border-b">
        <div className="p-6">
          {/* Header */}
          <h2 className="text-xl font-bold font-quicksand mb-4 flex items-end gap-1 text-gray-800">
            Product <span className="text-gray-500 text-sm">({order_items.length})</span>
          </h2>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full border-collapse min-w-[600px]">
              {/* Table Header */}
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="text-left py-3 px-4 font-lato uppercase text-xs font-semibold">Products</th>
                  <th className="text-center py-3 px-4 font-lato uppercase text-xs font-semibold">Price</th>
                  <th className="text-center py-3 px-4 font-lato uppercase text-xs font-semibold">Quantity</th>
                  <th className="text-right py-3 px-4 font-lato uppercase text-xs font-semibold">Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {order_items.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b transition-all duration-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100`}
                  >
                    {/* Product Details */}
                    <td className="py-4 px-4 flex items-center space-x-4">
                      <img
                        src={item.product.product_images[0]}
                        alt={item.product.product_name}
                        className="w-14 h-14 rounded-md object-cover border border-gray-300 shadow-sm"
                      />
                      <div className="w-48">
                        <p className="text-blue-600 uppercase font-lato text-xs font-bold">{item.product.vendor ?? 'General'}</p>
                        <p className="text-gray-700 text-sm font-lato font-medium truncate">{item.product.product_name}</p>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="text-gray-900 text-sm font-lato font-medium text-center py-4 px-4">{formatTotalAmount(item.total, singleOrder.currency)}</td>

                    {/* Quantity */}
                    <td className="text-gray-900 text-sm font-lato font-medium text-center py-4 px-4">{item.quantity}</td>

                    {/* Action Dropdown */}
                    <td className="text-right py-4 px-4">
                      <div className="relative inline-block">
                        <button
                          onClick={() => toggleDropdown(index)}
                          disabled={singleOrder.status === 'pending'}
                          className="flex items-center px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none"
                        >
                          <span>Actions</span> <FaChevronDown className="w-3 h-3 ml-1" />
                        </button>

                        {dropdownIndex === index && singleOrder.status === 'paid' && (
                          <div
                            className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden transition-all duration-200"
                          >
                            <button
                              className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200"
                              onClick={() => alert("Add Review Clicked")}
                            >
                              <FaStar className="mr-2 text-yellow-500" /> Add Review
                            </button>
                            <button
                              className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200"
                              onClick={() => alert("Buy Again Clicked")}
                            >
                              <FaShoppingCart className="mr-2 text-blue-500" /> Buy Again
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="fifthSection">
        <div className="p-4 text-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {/* Billing Address */}
            <div className="">
              <h3 className="text-lg font-quicksand font-semibold mb-2">Billing Address</h3>
              <p className="font-semibold text-md font-lato">{profile.first_name} {profile.last_name}</p>
              <p className="text-gray-600 font-lato text-sm">
                {profile.address || 'Nil'}
              </p>
              <p className="mt-2 text-sm font-lato">
                <span className="font-semibold">Phone Number:</span> {profile.phone_number || 'Nil'}
              </p>
              <p className="text-sm font-lato">
                <span className="font-semibold">Email:</span> {profile.email}
              </p>
            </div>

            {/* Shipping Address */}
            <div className="border-l pl-6">
              <h3 className="text-lg font-quicksand font-semibold mb-2">Shipping Address</h3>
              <p className="font-semibold">{singleOrder.customer_address.address_name}</p>
              <p className="text-gray-600 font-lato text-sm py-1">{singleOrder.customer_address.address_line_1}</p>
              {
                singleOrder.customer_address.address_line_2 && (
                  <p className="mt-2 text-sm font-lato py-1">{singleOrder.customer_address.address_line_2}</p>
                )
              }

              <p className="text-sm">
                <span className="font-semibold font-lato">Phone Number:</span> {singleOrder.customer_address.phone_number}
              </p>
              
              <p className="text-sm">
                <span className="font-semibold font-lato">Email:</span> {profile.email}
              </p>
            </div>

            {/* Payment Data */}
            <div className="border-l pl-6">
              <h3 className="text-lg font-semibold mb-2">Payment</h3>
              {/* Show Payment Gateway Logo Only If Payment Is Made */}
              {singleOrder.status !== 'pending' && (
                <div className='paymentImage h-10 w-full mb-2'>
                  <img 
                    src={getPaymentMethodLogo(singleOrder.payment_method)} 
                    className="w-full h-full object-contain" 
                    alt={singleOrder.payment_method} 
                  />
                </div>
              )}

              {/* Show Payment Date or Pending Message */}
              {singleOrder.status === 'pending' ? (
                <div className="text-center text-red-500 p-3 rounded-lg">
                  <p className="font-semibold py-2">No Payment Made</p>
                  {
                    singleOrder.payment_link && (
                      <NavLink 
                        className="mt-2 px-4 text-sm font-lato py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        to={singleOrder.payment_link} 
                      >
                        Complete Payment
                      </NavLink>
                    )
                  }
                </div>
              ) : (
                <p className="text-gray-600 font-outfit text-sm">
                  Payment Date: <b>{formatDateTimeRecord(singleOrder.transaction.updated_at)}</b>
                </p>
              )}

            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default SingleOrder