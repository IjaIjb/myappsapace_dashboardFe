import React, { useEffect, useState } from "react";
import useAddress from "../../../../../features/hooks/useAddress";
import { useModal } from "../../../../../features/context/ModalService";
import { FaMapMarkerAlt, FaSpinner, FaTrash } from "react-icons/fa";
import AddNewAddress from "../../../../modals/AddNewAddress";
import RequestModal from "../../../../modals/RequestModal";
import { truncateString } from "../../../../../helpers/helpers";

function AddressData() {
  const {
    fetchAddresses,
    activeAddress,
    addresses,
    setDefaultAddress,
    deleteAddress,
  } = useAddress();
  const [addressLoading, setAddressLoading] = useState(false);
  const { openModal } = useModal();

  // Track selected address for styling
  const [selectedAddress, setSelectedAddress] = useState(activeAddress?.id || null);
  const [settingDefault, setSettingDefault] = useState(false);

  useEffect(() => {
    handleFetchAddresses();
  }, []);

  useEffect(() => {
    setSelectedAddress(activeAddress?.id || null);
  }, [activeAddress]);

  const handleFetchAddresses = async () => {
    await fetchAddresses({
      onBefore: () => setAddressLoading(true),
      onFinally: () => setAddressLoading(false),
    });
  };

  // Function to set an address as default
  const handleSetDefault = async (id) => {
    if (id === activeAddress?.id) {
      console.log("This is already the default address.");
      return;
    }

    setSettingDefault(true);
    await setDefaultAddress(id, {
      onSuccess: () => {
        setSelectedAddress(id);
        handleFetchAddresses(); // Reload addresses after update
      },
    });
    setSettingDefault(false);
  };

  const showAddNewAddressModal = () => {
    openModal(<AddNewAddress />, { modalSize: "max-w-3xl" });
  };

  const handleDelete = (deleteData) => {
    openModal(
      <RequestModal
        requestName="Gream"
        requestTitle={`Delete ${truncateString(deleteData.address_name, 10)} Address`}
        requestMessage="Are you sure you want to delete this Address?"
        requestData={{ mode: "redux", requestFunction: () => deleteAddress(deleteData.id) }}
      />,
      { modalSize: "max-w-md" }
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="topHeader flex justify-between mb-4 items-center">
        <h2 className="text-xl font-semibold">Addresses</h2>
        <button
          onClick={showAddNewAddressModal}
          className="text-white text-sm transition ease-in-out duration-300 bg-orange-500 hover:bg-orange-400 px-4 py-2 rounded-md"
        >
          Add New Address
        </button>
      </div>

      {/* Loading State */}
      {addressLoading && (
        <div className="py-12 text-center flex flex-col items-center">
          <FaSpinner className="text-gray-400 text-5xl animate-spin mb-4" />
          <h3 className="text-lg font-bold text-gray-500">Fetching your Address ...</h3>
          <p className="text-sm text-gray-400 mt-2">Please wait while we load your address data.</p>
        </div>
      )}

      {/* Empty State */}
      {!addressLoading && addresses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <FaMapMarkerAlt className="text-5xl text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold">No Addresses Found</h3>
          <p className="text-sm text-gray-400 mt-2">You haven't added any addresses yet.</p>
        </div>
      )}

      {/* Address List */}
      {!addressLoading && addresses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {addresses.map((address) => (
            <div
              key={address.id}
              onClick={() => handleSetDefault(address.id)}
              className={`p-4 border cursor-pointer rounded-lg shadow-sm bg-gray-50 relative ${
                selectedAddress === address.id ? "ring-2 ring-blue-500" : ""
              }`}
            >
              {/* Default Badge */}
              {address.is_default == 1 && (
                <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  Default
                </span>
              )}

              {/* Address Info */}
              <h3 className="text-lg font-quicksand font-medium">{address.address_name}</h3>
              <p className="text-gray-700 font-lato text-sm">{address.address_line_1}</p>
              {address.address_line_2 && (
                <p className="text-gray-700 mt-1 text-sm">{address.address_line_2}</p>
              )}
              <p className="text-gray-500 mt-1 font-outfit text-xs">
                {address.city}, {address.state}, {address.country} - {address.postal_code}
              </p>
              <p className="text-gray-600 font-lato text-sm mt-2">📞 {address.phone_number}</p>

              {/* Actions */}
              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-4">
                  <button className="text-red-600" onClick={() => handleDelete(address)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AddressData;
