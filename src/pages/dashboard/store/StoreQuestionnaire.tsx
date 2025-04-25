import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserApis } from '../../../apis/userApi/userApi';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';

interface QuestionnaireProps {
  storeCode?: string;
  onClose?: () => void;
  isModal?: boolean;
  onComplete?: () => void;
  questionnaireExists?: boolean;
}

const StoreQuestionnaire: React.FC<QuestionnaireProps> = ({ 
  storeCode, 
  onClose, 
  isModal = false,
  onComplete,
  questionnaireExists 
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    store_type: '',
    business_type: '',
    year_started: '',
    annual_revenue: '',
    product_type: ''
  });
console.log(questionnaireExists)
  // Fetch existing questionnaire data if it exists
  useEffect(() => {
    if (storeCode && questionnaireExists) {
      fetchQuestionnaireData();
    }
  }, [storeCode, questionnaireExists]);

  const fetchQuestionnaireData = async () => {
    if (!storeCode) return;
    
    setFetchingData(true);
    setError(null);
    
    try {
      const response = await UserApis.getSingleKycStoreQuestionaire(storeCode);
      // console.log(response)
      
      if (response?.data) {
        // Set form data with existing values
        console.log(response.data)
        setFormData({
          store_type: response.data.questionnaire.store_type || '',
          business_type: response.data.questionnaire.business_type || '',
          year_started: response.data.questionnaire.year_started || '',
          annual_revenue: response.data.questionnaire.annual_revenue || '',
          product_type: response.data.questionnaire.product_type || ''
        });
      }
    } catch (error: any) {
      console.error("Error fetching questionnaire data:", error);
      setError("Failed to load existing questionnaire data. You can proceed with creating a new one.");
    } finally {
      setFetchingData(false);
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation checks
    if (!formData.store_type) {
      setError('Store type is required');
      setLoading(false);
      return;
    }

    if (!formData.business_type) {
      setError('Business type is required');
      setLoading(false);
      return;
    }

    if (formData.business_type === 'existing') {
      // Validate year format
      if (!formData.year_started || !/^\d{4}$/.test(formData.year_started)) {
        setError('Year started must be in YYYY format');
        setLoading(false);
        return;
      }

      // Validate annual revenue is provided
      if (!formData.annual_revenue) {
        setError('Annual revenue is required for existing businesses');
        setLoading(false);
        return;
      }
    }

    if (!formData.product_type) {
      setError('Product type is required');
      setLoading(false);
      return;
    }

    if (!storeCode) {
      setError('Store code is missing');
      setLoading(false);
      return;
    }

    try {
      // Use different API endpoint based on whether we're updating or creating
      let response;
      
      if (questionnaireExists) {
        response = await UserApis.updateKycStoreQuestionaire(storeCode, formData);
      } else {
        response = await UserApis.submitKycStoreQuestionaire(storeCode, formData);
      }
      
      setSuccess(true);
      
      // Call onComplete callback if provided
      if (onComplete) {
        onComplete();
      }
      
      // If it's a modal, close it after submission
      if (isModal && onClose) {
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to submit questionnaire');
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <div className="flex justify-center items-center py-10">
        <LoadingSpinner />
        <span className="ml-2 text-gray-600">Loading questionnaire data...</span>
      </div>
    );
  }

  return (
    <div className={`${isModal ? '' : ''}`}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Questionnaire {questionnaireExists ? 'updated' : 'submitted'} successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Store Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Store Type <span className="text-red-500">*</span>
            </label>
            <select
              name="store_type"
              value={formData.store_type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">Select Store Type</option>
              <option value="online_store">Online Store</option>
              <option value="basic_website">Basic Website</option>
              <option value="portfolio">Portfolio</option>
              <option value="custom">Custom</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          {/* Business Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Type <span className="text-red-500">*</span>
            </label>
            <select
              name="business_type"
              value={formData.business_type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">Select Business Type</option>
              <option value="existing">Existing Business</option>
              <option value="new">New Business</option>
            </select>
          </div>
          
          {/* Conditional fields for existing business */}
          {formData.business_type === 'existing' && (
            <>
              {/* Year Started */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year Started <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="year_started"
                  value={formData.year_started}
                  onChange={handleChange}
                  placeholder="YYYY"
                  pattern="^\d{4}$"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Format: YYYY (e.g., 2025)</p>
              </div>
              
              {/* Annual Revenue */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Revenue <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="annual_revenue"
                  value={formData.annual_revenue}
                  onChange={handleChange}
                  placeholder="Enter annual revenue"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </>
          )}
          
          {/* Product Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Type <span className="text-red-500">*</span>
            </label>
            <select
              name="product_type"
              value={formData.product_type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">Select Product Type</option>
              <option value="physical">Physical Products</option>
              <option value="digital">Digital Products</option>
              <option value="service">Services</option>
              <option value="mixed">Mixed (Multiple Types)</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            {isModal && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
              style={{
                background: "linear-gradient(to bottom, #382B67, #7056CD)",
              }}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                `${questionnaireExists ? 'Update' : 'Submit'} Questionnaire`
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StoreQuestionnaire;