import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../../components/DashboardLayout';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserApis } from '../../../apis/userApi/userApi';
import { FaEye, FaSearch, FaTruck } from 'react-icons/fa';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';


const Delivery = () => {
  // const navigate = useNavigate();
  const selectedStore = useSelector((state: RootState) => state.globalState?.selectedStore || null);
  const [loader, setLoader] = useState(false);
  const [deliveries, setDeliveries] = useState<any>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  
  // Function to fetch deliveries based on selected company
  const fetchDeliveries = useCallback((companyName: string = "") => {
    if (!selectedStore) {
      toast.error("Please select a Site");
      return;
    }
    
    setLoader(true);
    UserApis.getDeliveries(selectedStore, companyName)
      .then((response) => {
        if (response?.data) {
          const deliveriesData = response.data.data.data as any;
          setDeliveries(deliveriesData);
          
          // Extract unique company names for filter dropdown
          const uniqueCompanies:any = Array.from(new Set(deliveriesData.map((delivery:any) => delivery.company_name)));
          setCompanies(uniqueCompanies);
        } else {
          toast.error("Failed to load deliveries.");
        }
      })
      .catch((error) => {
        console.error("Error fetching deliveries:", error);
        toast.error("Failed to load deliveries.");
      })
      .finally(() => {
        setLoader(false);
      });
  }, [selectedStore]);

  // Handle company filter change
  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const companyName = e.target.value;
    setSelectedCompany(companyName);
    fetchDeliveries(companyName);
  };

  // Initial data fetch
  useEffect(() => {
    fetchDeliveries();
  }, [fetchDeliveries]);

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  // Format status with color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'in transit':
        return 'text-blue-600 bg-blue-100';
      case 'dispatched':
        return 'text-purple-600 bg-purple-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Truncate long text
  const truncateText = (text: string, maxLength: number = 20) => {
    if (!text) return "N/A";
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-800 mb-3 md:mb-0">Delivery Management</h1>
          
          <div className="w-full md:w-auto flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow md:w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                value={selectedCompany}
                onChange={handleCompanyChange}
              >
                <option value="">All Delivery Companies</option>
                {companies.map((company, index) => (
                  <option key={index} value={company}>{company}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loader ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : deliveries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th> */}
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {deliveries.map((delivery:any) => (
                  <tr key={delivery.id} className="hover:bg-gray-50">
                    {/* <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">#{delivery.order_id}</td> */}
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 capitalize">{delivery.company_name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {delivery.tracking_number ? truncateText(delivery.tracking_number) : "Not Available"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(delivery.status)}`}>
                        {delivery.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {delivery.currency} {delivery.cost}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(delivery.created_at).split(',')[0]}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Link 
                          to={`/dashboard/delivery/order/${delivery.tracking_number}`}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded"
                          title="View Order Details"
                        >
                          <FaEye />
                        </Link>
                        
                        {delivery.tracking_number ? (
                          <Link 
                            to={`/dashboard/delivery/track/${delivery.tracking_number}`}
                            className="text-green-600 hover:text-green-800 p-1 rounded"
                            title="Track Order"
                          >
                            <FaTruck />
                          </Link>
                        ) : (
                          <button 
                            className="text-gray-400 cursor-not-allowed p-1 rounded"
                            disabled
                            title="No Tracking Available"
                          >
                            <FaTruck />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <p className="text-gray-500">No deliveries found.</p>
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

export default Delivery;