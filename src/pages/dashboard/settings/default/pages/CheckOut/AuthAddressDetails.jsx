import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { useModal } from '../../../../../features/context/ModalService';
import AddNewAddress from '../../../../modals/AddNewAddress';
import ChangeAddress from '../../../../modals/ChangeAddress';
import useAddress from '../../../../../features/hooks/useAddress';

function AuthAddressDetails() {

    const { openModal } = useModal(); 

    const { addresses, activeAddress } = useAddress();

    const showAddNewAddressModal = () => {
        openModal(<AddNewAddress />, { modalSize: "max-w-3xl" });
    };

    const showChangeAddressModal = () => {
        openModal(<ChangeAddress />, { modalSize: "max-w-2xl" });
    };

  return (
    <>

        <div className="flex justify-between items-center">
            <h2 className='text-lg font-bold flex items-center gap-2'>
                <FaCheckCircle className={`text-${activeAddress ? 'green' : 'gray'}-500`} /> 
                1. Choose Delivery Address 
            </h2>
            {(addresses.length > 0 || activeAddress) && (
                <button type='button' onClick={showChangeAddressModal} className='px-4 py-1.5 rounded-lg bg-blue-500 transition duration-300 ease-in-out hover:opacity-70 text-white text-sm'>
                    Change
                </button>
            )}
        </div>
        {!activeAddress ? (
            <div className="fullScreen flex flex-col items-center justify-center py-10">
                <p className="text-gray-700 text-md font-lato font-medium mb-4">
                    You need to create an address before proceeding.
                </p>
                <button 
                    type='button'
                    className="bg-blue-600 font-outfit text-white px-6 py-2 text-sm rounded-lg hover:bg-blue-700 transition"
                    onClick={showAddNewAddressModal}
                >
                    Add Address
                </button>
            </div>
        ) : (
            <div className="p-4 border rounded-lg mt-3 bg-gray-100">
                <p className="font-bold text-md">{activeAddress.address_name}</p>
                <p className="text-gray-600 text-sm">
                    {activeAddress.address_line_1}
                </p>
                <p className="text-gray-600 text-sm">{activeAddress.phone_number}</p>
            </div>
        )}
    </>
  )
}

export default AuthAddressDetails