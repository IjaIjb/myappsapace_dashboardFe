import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import DashboardLayout from "../../../components/DashboardLayout";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaEdit, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { UserApis } from "../../../apis/userApi/userApi";

const Coupon = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );
  const [coupons, setCoupons] = React.useState<any>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const onOpenModal = () => {
    setOpen(true);
  };
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    if (!selectedStore) {
      onOpenModal();
    } else {
      onCloseModal();
    }
  }, [selectedStore]);

  React.useEffect(() => {
    if (selectedStore) {
      setLoading(true);
      UserApis.getCoupon(selectedStore)
        .then((response) => {
          if (response?.data) {
            console.log(response?.data);
            // Make sure we're accessing the coupons array from the response
            setCoupons(response?.data?.coupons || []);
          }
        })
        .catch(function (error) {
          console.error("Error fetching coupons:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedStore]);

  // Format date from "2025-04-05 00:00:00" to "Apr 5, 2025"
  const formatDate = (dateStr: any) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };

  // Handle coupon activation/deactivation
  const toggleCouponStatus = (id: any, currentStatus: any) => {
    // Implement your API call to toggle status here
    console.log(
      `Toggling coupon ${id} from ${currentStatus ? "active" : "inactive"} to ${
        !currentStatus ? "active" : "inactive"
      }`
    );
  };

  return (
    <DashboardLayout>
      <Modal
        classNames={{
          modal: "rounded-[10px] overflow-visible relative",
        }}
        open={open}
        onClose={() => {}} // Prevents closing the modal
        closeOnEsc={false} // Prevent closing with the Escape key
        closeOnOverlayClick={false} // Prevent closing by clicking outside
        showCloseIcon={false} // Hides the close button
        center
      >
        <div className="px-2 md:px-5 h-[100px] flex justify-center items-center text-center">
          <div>
            <h4 className="text-[20px] font-[600] mb-4">Don't have a Store?</h4>
            <Link
              to="/dashboard/create-store"
              className="underline text-blue-800"
            >
              Create a Store
            </Link>
          </div>
        </div>
      </Modal>
      <div>
        <div className="flex gap-3 items-center mb-7">
          <Link
            to={"/dashboard/create-coupon"}
            className="rounded-full h-fit flex items-center gap-3 px-4 py-2"
            style={{
              background: "linear-gradient(to bottom, #382B67, #7056CD)",
            }}
          >
            <IoAddCircleOutline className="text-white" />
            <h5 className="text-[#FFFFFF] text-[16px] font-[400] whitespace-nowrap">
              Create Coupon
            </h5>
          </Link>
        </div>

        <div className="shadow-lg sm:rounded-lg w-full mt-6 overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-700"></div>
            </div>
          ) : coupons.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No coupons found. Create your first coupon to get started.
            </div>
          ) : (
            <table className="min-w-full text-sm text-gray-500 divide-y divide-gray-200">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    S/N
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Coupon Code
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Discount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Expiry Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {coupons.map((coupon: any, index: any) => (
                  <tr key={coupon.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {coupon.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {coupon.discount_value}
                      {coupon.discount_type === "percentage" ? "%" : " (Fixed)"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(coupon.expiry_date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(coupon.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          coupon.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {coupon.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() =>
                            toggleCouponStatus(coupon.id, coupon.is_active)
                          }
                          className="text-purple-600 hover:text-purple-900"
                          title={coupon.is_active ? "Deactivate" : "Activate"}
                        >
                          {coupon.is_active ? (
                            <FaToggleOn className="text-xl" />
                          ) : (
                            <FaToggleOff className="text-xl" />
                          )}
                        </button>
                        <Link
                          to={`/dashboard/edit-coupon/${coupon.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Edit"
                        >
                          <FaEdit />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Coupon;
