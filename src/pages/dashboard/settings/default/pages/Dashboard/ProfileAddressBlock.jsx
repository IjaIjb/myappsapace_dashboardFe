import React, { useEffect, useState } from 'react'
import useAddress from '../../../../../features/hooks/useAddress';
import useUser from '../../../../../features/hooks/useUser';
import { useModal } from '../../../../../features/context/ModalService';
import AddNewAddress from '../../../../modals/AddNewAddress';
import ChangeAddress from '../../../../modals/ChangeAddress';

function ProfileAddressBlock({ ordersLoading, orderAnalytics }) {
    const { profile } = useUser();
    const { openModal } = useModal(); 

    const [loadAddresses, setLoadAddresses] = useState(false);
    const { fetchAddresses, activeAddress, addresses } = useAddress();

    const fetchAllMyAddress = async () => {
        if (!activeAddress) {
            await fetchAddresses({
                onBefore: () => setLoadAddresses(true),
                onFinally: () => setLoadAddresses(false),
            });
        }
    };

    useEffect(() => {
        fetchAllMyAddress();
    }, []);

    const showAddNewAddressModal = () => {
        openModal(<AddNewAddress />, { modalSize: "max-w-3xl" });
    };

    const showChangeAddressModal = () => {
        openModal(<ChangeAddress />, { modalSize: "max-w-2xl" });
    };

    return (
        <div className="w-full grid grid-cols-3 my-5 gap-5">

            {/* Profile Block */}
            <div className="flex flex-col border rounded-lg min-h-[290px] flex-1">
                <div className="titleSection border-b p-3">
                    <h2 className="text-xs font-quicksand font-semibold uppercase">Account Info</h2>
                </div>
                <div className="bodyContent flex p-3 flex-col flex-1 justify-between">
                    <div className="topSection flex items-center gap-4 py-4">
                        <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
                            <img 
                                src={profile.profile_picture || "https://cdn-icons-png.flaticon.com/512/16512/16512388.png"} 
                                alt="Profile Avatar" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="font-lato font-semibold">{profile.first_name} {profile.last_name}</h2>
                            <p className="text-sm"><b>Customer Code:</b> <span className="text-gray-600">{profile.customer_code}</span></p>
                        </div>
                    </div>
                    <div className="profildata text-sm font-lato flex flex-col gap-1">
                        <p><b>Email:</b> <span className="text-gray-600">{profile.email}</span></p>
                        <p><b>Phone:</b> <span className="text-gray-600">{profile.phone_number}</span></p>
                        <p><b>Gender:</b> <span className="text-gray-600">{profile.gender || "None"}</span></p>
                    </div>
                    <div className="mt-auto">
                        <button className="btn btn-primary px-4 rounded-md py-2 border-[#2DA5F3] border text-[#2DA5F3] font-semibold text-sm">Edit Profile</button>
                    </div>
                </div>
            </div>

            {/* Address Block */}
            <div className="flex flex-col border rounded-lg min-h-[290px] flex-1">
                <div className="titleSection border-b p-3">
                    <h2 className="text-xs font-semibold uppercase">Billing Address</h2>
                </div>
                <div className="bodyContent p-3 flex flex-col flex-1 justify-between">
                    {loadAddresses ? (
                        <div className="flex flex-1 justify-center items-center">
                            <div className="animate-spin rounded-full border-4 border-gray-300 border-t-[#c10202] h-16 w-16"></div>
                        </div>
                    ) : (
                        <>
                            {/* If no addresses exist, show "Add Address" button */}
                            {!activeAddress && addresses.length === 0 && (
                                <div className="flex flex-1 justify-center items-center">
                                    <button onClick={showAddNewAddressModal} type='button' className="btn btn-primary px-4 py-2 rounded-md border-[#2DA5F3] border text-[#2DA5F3] font-semibold text-sm">
                                        Add Address
                                    </button>
                                </div>
                            )}

                            {/* If addresses exist but no active address is set, show "Set Default Address" button */}
                            {addresses.length > 0 && !activeAddress && (
                                <div className="flex flex-1 justify-center items-center">
                                    <button onClick={showChangeAddressModal} type='button' className="btn btn-primary px-4 py-2 rounded-md border-[#2DA5F3] border text-[#2DA5F3] font-semibold text-sm">
                                        Set Default Address
                                    </button>
                                </div>
                            )}

                            {/* If an active address exists, display its details */}
                            {activeAddress && (
                                <div className='flex pt-4 flex-col gap-3 flex-1 justify-between'>
                                    <div className="tohether flex flex-col gap-3">
                                        <div className="topSection flex gap-4">
                                            <div>
                                                <h2 className="font-lato font-semibold">{activeAddress.address_name}</h2>
                                                <p className="text-gray-600 py-1 text-sm">{activeAddress.address_line_1}</p>
                                            </div>
                                        </div>

                                        <div className="profildata text-sm font-lato flex flex-col gap-1">
                                            <p><b>Email:</b> <span className="text-gray-600">{profile.email}</span></p>
                                            <p><b>Phone:</b> <span className="text-gray-600">{activeAddress.phone_number}</span></p>
                                        </div>
                                    </div>
                                    
                                    <div className="">
                                        <button onClick={showChangeAddressModal} type='button' className="btn btn-primary px-4 rounded-md py-2 border-[#2DA5F3] border text-[#2DA5F3] font-semibold text-sm">
                                            Change Default Address
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Order Block */}
            <div className="flex flex-col min-h-[290px] justify-between flex-1">
                {
                    ordersLoading ? (
                        <div className="flex flex-1 justify-center items-center">
                            <div className="animate-spin rounded-full border-4 border-gray-300 border-t-[#c10202] h-16 w-16"></div>
                        </div>
                    ) : (
                        <>
                            <div className="singleCard bg-[#EAF6FE] rounded-lg py-4 px-3 flex gap-3">
                                <div className="leftIcon bg-white rounded-lg flex justify-center items-center p-3">
                                    <svg width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.2" d="M9.23744 13.9258L5.31244 18.6258C5.21356 18.7411 5.14379 18.8785 5.10899 19.0264C5.07419 19.1743 5.07538 19.3284 5.11244 19.4758L6.64994 26.4383C6.68704 26.6038 6.76563 26.7571 6.87831 26.8839C6.99099 27.0107 7.13405 27.1067 7.29406 27.1629C7.45407 27.2192 7.62575 27.2338 7.79297 27.2054C7.96018 27.1771 8.11744 27.1067 8.24994 27.0008L11.9999 24.0008C9.79994 20.1758 9.08744 16.8133 9.23744 13.9258Z" fill="#2DA5F3"/>
                                        <path opacity="0.2" d="M22.6875 13.8379L26.6125 18.5504C26.7114 18.6658 26.7812 18.8031 26.816 18.9511C26.8508 19.099 26.8496 19.253 26.8125 19.4004L25.275 26.3504C25.2396 26.5169 25.1622 26.6717 25.0503 26.8C24.9383 26.9282 24.7954 27.0258 24.6351 27.0834C24.4749 27.141 24.3026 27.1567 24.1346 27.129C23.9666 27.1014 23.8084 27.0313 23.675 26.9254L19.925 23.9254C22.125 20.0879 22.8375 16.7254 22.6875 13.8379Z" fill="#2DA5F3"/>
                                        <path d="M18 28H14" stroke="#2DA5F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M15.3751 2.47472C13.0001 4.37472 5.06255 11.9747 12.0001 23.9997H20.0001C26.8001 11.9747 18.9751 4.38722 16.6251 2.47472C16.4497 2.32827 16.2285 2.24805 16.0001 2.24805C15.7716 2.24805 15.5504 2.32827 15.3751 2.47472Z" stroke="#2DA5F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M9.23744 13.9258L5.31244 18.6258C5.21356 18.7411 5.14379 18.8785 5.10899 19.0264C5.07419 19.1743 5.07538 19.3284 5.11244 19.4758L6.64994 26.4383C6.68704 26.6038 6.76563 26.7571 6.87831 26.8839C6.99099 27.0107 7.13405 27.1067 7.29406 27.1629C7.45407 27.2192 7.62575 27.2338 7.79297 27.2054C7.96018 27.1771 8.11744 27.1067 8.24994 27.0008L11.9999 24.0008" stroke="#2DA5F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M22.6875 13.8242L26.6875 18.6242C26.7864 18.7396 26.8561 18.877 26.8909 19.0249C26.9258 19.1728 26.9246 19.3269 26.8875 19.4742L25.35 26.4367C25.3129 26.6022 25.2343 26.7556 25.1216 26.8823C25.009 27.0091 24.8659 27.1051 24.7059 27.1614C24.5459 27.2176 24.3742 27.2323 24.207 27.2039C24.0398 27.1755 23.8825 27.1051 23.75 26.9992L20 23.9992" stroke="#2DA5F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M16 13.5C16.8284 13.5 17.5 12.8284 17.5 12C17.5 11.1716 16.8284 10.5 16 10.5C15.1716 10.5 14.5 11.1716 14.5 12C14.5 12.8284 15.1716 13.5 16 13.5Z" fill="#2DA5F3"/>
                                    </svg>
                                </div>
                                <div className="rightText flex font-lato flex-col gap-1">
                                    <h2 className="font-lato font-semibold">{orderAnalytics.orders_total_by_status}</h2>
                                    <p className="text-sm text-gray-600">Total Orders</p>
                                </div>
                            </div>

                            <div className="singleCard bg-[#FFF3EB] rounded-lg py-4 px-3 flex gap-3">
                                <div className="leftIcon bg-white rounded-lg flex justify-center items-center p-3">
                                    <svg width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.2" d="M4 26V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H27C27.2652 6 27.5196 6.10536 27.7071 6.29289C27.8946 6.48043 28 6.73478 28 7V26L24 24L20 26L16 24L12 26L8 24L4 26Z" fill="#FA8232"/>
                                        <path d="M9.5 13H22.5" stroke="#FA8232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M9.5 17H22.5" stroke="#FA8232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M4 26V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H27C27.2652 6 27.5196 6.10536 27.7071 6.29289C27.8946 6.48043 28 6.73478 28 7V26L24 24L20 26L16 24L12 26L8 24L4 26Z" stroke="#FA8232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div className="rightText flex font-lato flex-col gap-1">
                                    <h2 className="font-lato font-semibold">{orderAnalytics.pending_orders}</h2>
                                    <p className="text-sm text-gray-600">Pending Orders</p>
                                </div>
                            </div>

                            <div className="singleCard bg-[#EAF7E9] rounded-lg py-4 px-3 flex gap-3">
                                <div className="leftIcon bg-white rounded-lg flex justify-center items-center p-3">
                                    <svg width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.2" d="M4.1375 9.32422C4.04693 9.47979 3.99946 9.6567 4 9.83672V22.1617C4.00096 22.3397 4.04884 22.5144 4.13882 22.668C4.2288 22.8216 4.35769 22.9488 4.5125 23.0367L15.5125 29.2242C15.6608 29.309 15.8292 29.3521 16 29.3492L16.1125 15.9992L4.1375 9.32422Z" fill="#2DB324"/>
                                        <path d="M28 22.1627V9.83766C27.999 9.65963 27.9512 9.485 27.8612 9.33137C27.7712 9.17775 27.6423 9.05057 27.4875 8.96266L16.4875 2.77516C16.3393 2.68958 16.1711 2.64453 16 2.64453C15.8289 2.64453 15.6607 2.68958 15.5125 2.77516L4.5125 8.96266C4.35769 9.05057 4.22879 9.17775 4.13882 9.33137C4.04884 9.485 4.00096 9.65963 4 9.83766V22.1627C4.00096 22.3407 4.04884 22.5153 4.13882 22.6689C4.22879 22.8226 4.35769 22.9497 4.5125 23.0377L15.5125 29.2252C15.6607 29.3107 15.8289 29.3558 16 29.3558C16.1711 29.3558 16.3393 29.3107 16.4875 29.2252L27.4875 23.0377C27.6423 22.9497 27.7712 22.8226 27.8612 22.6689C27.9512 22.5153 27.999 22.3407 28 22.1627V22.1627Z" stroke="#2DB324" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M22.125 19.0625V12.5625L10 5.875" stroke="#2DB324" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M27.8624 9.32422L16.1125 15.9992L4.13745 9.32422" stroke="#2DB324" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M16.1125 16L16 29.35" stroke="#2DB324" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div className="rightText flex font-lato flex-col gap-1">
                                    <h2 className="font-lato font-semibold">{orderAnalytics.completed_orders}</h2>
                                    <p className="text-sm text-gray-600">Completed Orders</p>
                                </div>
                            </div>
                        </>
                    )
                }
                {/* Single Order Card */}
                
            </div>
        </div>
    );
}

export default ProfileAddressBlock;
