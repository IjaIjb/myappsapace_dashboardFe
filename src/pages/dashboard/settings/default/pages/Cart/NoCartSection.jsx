import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

function NoCartSection() {
  return (
    <div className='w-full flex justify-center items-center py-10 max-w-screen-xl mx-auto'>
        <div className='border border-gray-300 rounded-2xl px-6 py-10 flex flex-col items-center space-y-4 w-full'>
            <FaShoppingCart size={52} className='text-gray-500 font-quicksand' />
            <h2 className='text-xl font-semibold text-gray-700 font-quicksand'>Your cart is empty</h2>
            <p className='text-gray-500 text-sm text-center font-lato'>Looks like you haven't added anything yet. Start shopping now!</p>
            <NavLink to='/' className='mt-3 px-4 py-2 text-white bg-blue-600 ease-in-out duration-300 transition hover:bg-blue-700 rounded-lg'>
                    Continue Shopping
            </NavLink>
        </div>
    </div>
  )
}

export default NoCartSection