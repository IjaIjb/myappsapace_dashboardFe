import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useCart from '../../../../../features/hooks/useCart';
import { formatProductPrice } from '../../../../../helpers/helpers';
import useCheckout from '../../../../../features/hooks/useCheckout';

function CheckOuSummary({ canProceed }) {
    const { items, deliveryFee, couponDiscount, totalDiscount, totalPrice, finalTotal, totalTax, couponCodeUsed } = useCart();

    const { validateCoupon } = useCheckout();

    const [couponCode, setCouponCode] = useState(couponCodeUsed ?? '');
    const [couponError, setCouponError] = useState('');

    const applyCoupon = async () => {
        if (!couponCode.trim()) {
            setCouponError("Please enter a coupon code.");
            return;
        }
    
        await validateCoupon({coupon_code: couponCode}, {
            onSuccess: (response) => {
                setCouponError('');
            },
            onError: (error) => {
                setCouponError(error.response.data.message);
            },
        });
    };
    

    return (
        <div className='w-full md:w-1/3 bg-white p-6 border rounded-lg self-start'>
            <div className="topSec flex justify-between items-center mb-4">
                <h2 className='text-lg font-quicksand font-bold'>Cart Summary</h2>
                <NavLink to='/cart' className="px-4 p-1 font-lato rounded-lg bg-red-300 hover:opacity-70 transition ease-in-out duration-300 text-xs text-white">
                    Edit Cart
                </NavLink>
            </div>
            
            <div className='space-y-3 font-lato text-sm'>
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.uuid} className='flex space-x-2 items-center border-b pb-2'>
                            <img 
                                src={item.productImages[0] ?? "https://dummyimage.com/300x400/ddd/555&text=No+Image"} 
                                alt={item.name} 
                                className='w-14 h-12 rounded-md' 
                            />
                            <div className='w-full'>
                                <p className='font-bold font-lato truncate w-48'>{item.productName}</p>
                                <p className='text-gray-500 text-xs font-outfit'>
                                    {formatProductPrice(item.price)} x {item.quantity}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='text-center text-gray-500'>Your cart is empty</p>
                )}
            </div>

            {/* Coupon Section */}
            <div className="mt-4">
                <h3 className="text-sm font-bold mb-2">Apply Coupon</h3>
                <div className={`flex items-center border border-gray-300 rounded-lg overflow-hidden ${couponError ? 'border-red-500' : ''} `}>
                    <input 
                        disabled={couponCodeUsed}
                        type="text" 
                        className="w-full p-2 text-sm border rounded-lg focus:outline-none" 
                        placeholder="Enter coupon code" 
                        value={couponCode} 
                        onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button 
                        disabled={couponCodeUsed}
                        type='button'
                        className="bg-blue-500 text-white px-4 py-2 text-sm font-lato font-semibold hover:bg-blue-600 transition-all"
                        onClick={applyCoupon}
                    >
                        Apply
                    </button>
                </div>
                {couponError && <p className="text-red-500 text-xs mt-1">{couponError}</p>}
            </div>


            <div className='space-y-2 mt-3 font-lato text-sm'>
                <p className='flex justify-between'><span>Subtotal:</span> <span>{formatProductPrice(totalPrice)}</span></p>
                
                {
                    totalDiscount > 0 && (
                        <p className='flex justify-between'><span>Discount:</span> <span className="text-red-500">-{formatProductPrice(totalDiscount)}</span></p>
                    )
                }

                {
                    couponDiscount > 0 && (
                        <p className='flex justify-between'><span>Coupon Discount:</span> <span className="text-red-500">-{formatProductPrice(couponDiscount)}</span></p>
                    )
                }

                {
                    deliveryFee > 0 && (
                        <p className='flex justify-between'><span>Delivery:</span> <span className='text-blue-600'>{formatProductPrice(deliveryFee)}</span></p>
                    )
                }

                {
                    totalTax > 0 && (
                        <p className='flex justify-between'><span>Tax:</span> <span className='text-blue-600'>{formatProductPrice(totalTax)}</span></p>
                    )
                }
            </div>

            <hr className='my-4'/>
            <p className='flex font-quicksand justify-between text-lg font-bold'>
                <span>Total:</span> 
                <span>{formatProductPrice(finalTotal)}</span>
            </p>
            <button 
                type='submit'
                className={`w-full mt-4 py-3 rounded-lg transition ${canProceed ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`} 
                disabled={!canProceed}
            >
                Place Order
            </button>
        </div>
    );
}

export default CheckOuSummary;
