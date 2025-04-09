import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';
import { IoAddCircleOutline } from 'react-icons/io5';
import { NavLink, Link } from "react-router-dom";
import { UserApis } from '../../../apis/userApi/userApi';
import { FaEdit } from 'react-icons/fa';

const Store = () => {
  const [stores, setStores] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    UserApis.getStore()
      .then((response) => {
        if (response?.data) {
          setStores(response?.data);
        }
      })
      .catch(function (error) {
        console.error("Error fetching stores:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Format date string to more readable format
  const formatDate = (dateString:any) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return dateString;
    }
  };

  // Get status style based on status
  const getStatusStyle = (status:any) => {
    switch(status) {
      case "active":
        return "text-green-500";
      case "deleted":
        return "text-red-500";
      default:
        return "text-yellow-300";
    }
  };

  return (
    <DashboardLayout>
      <div>
        <div className="flex gap-3 items-center mb-7">
          <Link
            to={"/dashboard/create-site"}
            className="rounded-full h-fit flex items-center gap-3 px-4 py-2"
            style={{
              background: "linear-gradient(to bottom, #382B67, #7056CD)",
            }}
          >
            <IoAddCircleOutline className="text-white" />
            <h5 className="text-[#FFFFFF] text-[16px] font-[400] whitespace-nowrap">
              Create Site
            </h5>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-700"></div>
          </div>
        ) : (
          <>
            {/* Desktop Table (hidden on small screens) */}
            <div className="hidden md:block shadow-lg rounded-lg overflow-hidden mt-6">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-gray-500 divide-y divide-gray-200">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left">S/N</th>
                      <th scope="col" className="px-4 py-3 text-left">Site Name</th>
                      <th scope="col" className="px-4 py-3 text-left">Industry Type</th>
                      <th scope="col" className="px-4 py-3 text-left">Product Type</th>
                      <th scope="col" className="px-4 py-3 text-left">Site Abbreviation</th>
                      <th scope="col" className="px-4 py-3 text-left">Date Created</th>
                      <th scope="col" className="px-4 py-3 text-left">Status</th>
                      <th scope="col" className="px-4 py-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {stores?.data?.data?.length > 0 ? (
                      stores.data.data.map((store:any, index:any) => (
                        <tr key={store.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap">{index + 1}</td>
                          <td className="px-4 py-4 whitespace-nowrap font-medium">{store.store_name}</td>
                          <td className="px-4 py-4 whitespace-nowrap">{store.industry_type}</td>
                          <td className="px-4 py-4 whitespace-nowrap">{store.product_type}</td>
                          <td className="px-4 py-4 whitespace-nowrap">{store.store_abbreviation}</td>
                          <td className="px-4 py-4 whitespace-nowrap">{formatDate(store.created_at)}</td>
                          <td className={`px-4 py-4 whitespace-nowrap font-bold ${getStatusStyle(store.status)}`}>
                            {store.status}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <NavLink 
                              to={`/edit-store/${store.id}`}
                              className="text-blue-500 hover:text-blue-700 underline"
                            >
                              Edit
                            </NavLink>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                          No sites found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile View (shown only on small screens) */}
            <div className="md:hidden space-y-4">
              {stores?.data?.data?.length > 0 ? (
                stores.data.data.map((store:any, index:any) => (
                  <div key={store.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-500">Site Name</div>
                        <div className="font-bold text-lg">{store.store_name}</div>
                      </div>
                      <div className={`font-bold ${getStatusStyle(store.status)}`}>
                        {store.status}
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-gray-500">Industry Type</div>
                          <div className="font-medium">{store.industry_type}</div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-gray-500">Product Type</div>
                          <div className="font-medium">{store.product_type}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-gray-500">Abbreviation</div>
                          <div className="font-medium">{store.store_abbreviation}</div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-gray-500">Created</div>
                          <div className="font-medium">{formatDate(store.created_at)}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                      <span className="text-xs text-gray-500">#{index + 1}</span>
                      <NavLink 
                        to={`/edit-store/${store.id}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 gap-1"
                      >
                        <FaEdit /> <span>Edit site</span>
                      </NavLink>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                  No sites found
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Store;