import React from 'react'; 
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import useCart from '../../../../../features/hooks/useCart';
import { formatProductPrice } from '../../../../../helpers/helpers';
import useAuth from "../../../../../features/hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../../../../features/context/ModalService';
import ContinueAuth from '../../../../modals/ContinueAuth';

function CartSection() {
    
    const { isAuthenticated } = useAuth();
    const { items, addProductToCart, reduceProductQuantity, removeProductFromCart, clearAllCartItems, totalPrice, finalTotal, totalTax, totalDiscount, couponDiscount } = useCart();

    const { openModal, closeModal } = useModal();

    const navigate = useNavigate();

    const checkOutAction = () => {
        if (!isAuthenticated) {
            openModal(<ContinueAuth />, {
                modalSize: "max-w-lg"
            });

            return;
        }
        
        closeModal();
        navigate("/checkout");
    } 
    return ( 
        <div className='w-full flex flex-col md:flex-row gap-6 p-4'>
            {/* Cart Items Section */}
            <div className='w-full md:w-2/3 bg-white rounded-lg'>
              
                {/* Cart Table */}
                <table className='w-full border-collapse'>
                    <thead>
                        <tr className='bg-gray-100 text-gray-700 font-quicksand font-normal text-xs uppercase'>
                            <th className='p-3 text-left'>Product</th>
                            <th className='p-3 text-center'>Price</th>
                            <th className='p-3 text-center'>Quantity</th>
                            <th className='p-3 text-right'>Subtotal</th>
                            <th className='p-3 text-center'>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.productCode} className='border-b text-sm font-lato hover:bg-gray-50 transition'>
                                {/* Single Product */}
                                <td className='p-3 flex items-center gap-3'>
                                    <img src={item.productImages[0] ?? "https://dummyimage.com/300x400/ddd/555&text=No+Image"} alt={item.name} className='w-12 h-12 rounded-md shadow' />
                                    <div className='flex flex-col'>
                                        <span className='w-32 truncate font-lato font-normal' title={item.productName}>
                                            {item.productName}
                                        </span>
                                        <span className='text-green-600 text-xs font-outfit'>In Stock</span>
                                    </div>
                                </td>

                                {/* Single Price */}
                                <td className='p-3 text-center font-semibold'>{formatProductPrice(item.price)}</td>

                                {/* Single Quantity */}
                                <td className='p-3 text-center space-x-1'>
                                    <button onClick={() => reduceProductQuantity(item.uuid)} className='bg-gray-300 p-2 rounded hover:bg-gray-400 duration-300 ease-in-out transition'><FaMinus size={9} /></button>
                                    <span className='px-3 font-semibold'>{item.quantity}</span>
                                    <button onClick={() => addProductToCart(item.uuid, 1)} className='bg-gray-300 p-2 rounded hover:bg-gray-400 duration-300 ease-in-out transition'><FaPlus size={9} /></button>
                                </td>

                                 {/* Single Subtotal */}
                                <td className='p-3 text-right font-semibold'>{formatProductPrice(item.total)}</td>

                                 {/* Single Remove */}
                                <td className='p-3 text-center'>
                                    <button onClick={() => removeProductFromCart(item.uuid)} className='text-red-500 hover:text-red-700 duration-300 ease-in-out transition'><FaTrash size={15} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {/* Promo & Clear Cart */}
                <div className='flex justify-between items-center mt-4'>
                    <button onClick={() => clearAllCartItems()} className='text-red-500 hover:underline'>Clear Cart</button>
                </div>
            </div>
            
            {/* Cart Summary Section */}
            <div className='w-full md:w-1/3 bg-white p-6 rounded-lg'>
                <h2 className='text-lg font-quicksand font-bold mb-4'>Cart Summary</h2>
                <div className='space-y-3 font-lato text-sm'>
                    
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
                        totalTax > 0 && (
                            <p className='flex justify-between'><span>Tax:</span> <span className='text-blue-600'>{formatProductPrice(totalTax)}</span></p>
                        )
                    }
                    
                </div>
                <hr className='my-4'/>
                <p className='flex font-quicksand justify-between text-lg font-bold'><span>Total:</span> <span>{formatProductPrice(finalTotal)}</span></p>        
                <button onClick={checkOutAction} className='w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition'>Check Out</button>
            </div>
        </div>
    );
}

export default CartSection;
