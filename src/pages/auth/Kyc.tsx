import { useState } from 'react';
import { MdNavigateNext, MdDone } from 'react-icons/md';
import { IoIosArrowBack } from "react-icons/io";
import { 
  FaStore, 
  FaBuilding, 
  FaUser, 
  FaCogs, 
  FaFileAlt, 
  FaCheck, 
  FaStar, 
  FaBox, 
  FaDigitalTachograph, 
  FaTools, 
  FaQuestionCircle 
} from 'react-icons/fa';
import { UserApis } from '../../apis/userApi/userApi';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const KYCOnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState<any>(0);
  const [formData, setFormData] = useState<any>({
    businessType: '',
    isRegistered: '',
    businessYear: '',
    annualRevenue: '',
    productType: ''
  });
  const [slidesHistory, setSlidesHistory] = useState<any>([0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  // Define all steps/slides for the onboarding process
  const steps:any = [
    {
      title: "What do you want to create?",
      subtitle: "Choose the type of website or application you need",
      options: [
        { id: 'online_store', label: 'An online store', description: 'Where you can sell any product online', icon: <FaStore className="text-blue-600" size={22} /> },
        { id: 'basic_website', label: 'Basic website', description: 'For your company/business/etc', icon: <FaBuilding className="text-blue-600" size={22} /> },
        { id: 'portfolio', label: 'Portfolio page', description: 'A professional page for yourself', icon: <FaUser className="text-blue-600" size={22} /> },
        { id: 'custom', label: 'Custom', description: 'Request for a custom application built with your specifications and niche', icon: <FaCogs className="text-blue-600" size={22} /> },
        { id: 'other', label: 'Other', description: '', icon: <FaFileAlt className="text-blue-600" size={22} /> }
      ],
      isMultiSelect: false
    },
    {
      title: "Tell us about your business",
      subtitle: "Help us understand your business better",
      options: [
        { id: 'yes', label: 'Is your business registered?', description: 'Yes', hasSubOptions: true, 
          icon: <FaCheck className="text-green-600" size={22} />,
          subOptions: [
            { id: 'year', label: 'Year started', type: 'number', placeholder: 'e.g. 2020' },
            { id: 'revenue', label: 'Annual revenue', type: 'select', 
              choices: [
                'Less than $10,000',
                '$10,000 - $50,000',
                '$50,000 - $100,000',
                '$100,000 - $500,000',
                '$500,000 - $1,000,000',
                'More than $1,000,000'
              ] 
            }
          ]
        },
        { id: 'no', label: 'Is your business registered?', description: 'No (New business)', 
          icon: <FaStar className="text-orange-500" size={22} /> }
      ],
      isMultiSelect: false
    },
    {
      title: "What type of product are you selling?",
      subtitle: "This helps us customize your experience",
      options: [
        { id: 'physical', label: 'Physical products', description: 'e.g. electronics, clothes, etc', 
          icon: <FaBox className="text-blue-600" size={22} /> },
        { id: 'digital', label: 'Digital products', description: 'e.g. NFT, gift card', 
          icon: <FaDigitalTachograph className="text-purple-600" size={22} /> },
        { id: 'services', label: 'Services', description: 'e.g. shortlet, training', 
          icon: <FaTools className="text-green-600" size={22} /> },
        { id: 'other', label: 'Other', description: '', 
          icon: <FaQuestionCircle className="text-gray-600" size={22} /> }
      ],
      isMultiSelect: false
    }
  ];

  // Handle checkbox/radio selections
  const handleOptionSelect = (optionId:any, isMulti:any) => {
    if (currentStep === 0) {
      setFormData({
        ...formData,
        businessType: optionId
      });
    } else if (currentStep === 1) {
      setFormData({
        ...formData,
        isRegistered: optionId
      });
    } else if (currentStep === 2) {
      setFormData({
        ...formData,
        productType: optionId
      });
    }
  };

  // Handle sub-option inputs (text, select, etc.)
  const handleSubOptionChange = (parentOptionId:any, subOptionId:any, value:any) => {
    if (subOptionId === 'year') {
      setFormData({
        ...formData,
        businessYear: value
      });
    } else if (subOptionId === 'revenue') {
      setFormData({
        ...formData,
        annualRevenue: value
      });
    }
  };

  // Check if the form is valid for submission
  const isFormValid = () => {
    // Basic validation
    if (!formData.businessType) return false;
    if (!formData.isRegistered) return false;
    if (formData.isRegistered === 'yes') {
      if (!formData.businessYear || !formData.annualRevenue) return false;
      // Check if year is a valid 4-digit number
      if (!/^\d{4}$/.test(formData.businessYear)) return false;
    }
    if (!formData.productType) return false;
    
    return true;
  };

  // Check if the next button should be disabled for the current step
  const isNextDisabled = () => {
    if (currentStep === 0 && !formData.businessType) return true;
    if (currentStep === 1) {
      if (!formData.isRegistered) return true;
      if (formData.isRegistered === 'yes' && (!formData.businessYear || !formData.annualRevenue)) return true;
    }
    if (currentStep === 2 && !formData.productType) return true;
    return false;
  };

  // Prepare the API payload
  const preparePayload = () => {
    const formDataPayload = new FormData();
    
    formDataPayload.append('store_type', formData.businessType);
    formDataPayload.append('business_type', formData.isRegistered === 'yes' ? 'existing' : 'new');
    
    if (formData.isRegistered === 'yes') {
      formDataPayload.append('year_started', formData.businessYear);
      
      // Convert annual revenue string to a number
      let annualRevenueNumber = 0;
      
      if (formData.annualRevenue.includes('Less than $10,000')) {
        annualRevenueNumber = 5000; // Approximate midpoint
      } else if (formData.annualRevenue.includes('$10,000 - $50,000')) {
        annualRevenueNumber = 30000; // Approximate midpoint
      } else if (formData.annualRevenue.includes('$50,000 - $100,000')) {
        annualRevenueNumber = 75000; // Approximate midpoint
      } else if (formData.annualRevenue.includes('$100,000 - $500,000')) {
        annualRevenueNumber = 300000; // Approximate midpoint
      } else if (formData.annualRevenue.includes('$500,000 - $1,000,000')) {
        annualRevenueNumber = 750000; // Approximate midpoint
      } else if (formData.annualRevenue.includes('More than $1,000,000')) {
        annualRevenueNumber = 1500000; // Reasonable value above $1M
      }
      
      formDataPayload.append('annual_revenue', annualRevenueNumber.toString());
    }
    
    const productTypeMap :any = {
      'services': 'service',
      'physical': 'physical',
      'digital': 'digital',
      'other': 'other'
    };
    formDataPayload.append('product_type', productTypeMap[formData.productType] || formData.productType);
    
    return formDataPayload;
  };

  // Go to next step or submit if at the last step
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setSlidesHistory([...slidesHistory, nextStep]);
    } else {
      // Submit the form if at the last step
      handleSubmit();
    }
  };

  // Submit the form to the API
  const handleSubmit = async () => {
    if (!isFormValid()) {
      setSubmitError('Please complete all required fields correctly.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = preparePayload();
      console.log("Form submitted successfully:", payload);
      
      // Call the API endpoint
      const response:any = await UserApis.submitKycQuestionaire(payload); 
      // Handle successful submission
      if (response.data) {
        toast.success(
          response?.data?.message || "KYC questionnaire created successfully!"
        );
        console.log("Form submitted successfully:", response);
        navigate("/auth/add-store"); // Navigate to the next page
      } else {
        toast.error(
          response?.data?.message ||
          "Failed to create. Please try again."
        );
      }
      
      // Add additional error handling for the annual revenue field
    } catch (error:any) {
      console.error("Error submitting KYC form:", error);
      
      // Check for specific field errors
      if (error.response?.data?.message?.includes('annual revenue')) {
        toast.error("The annual revenue must be a number. Please try again.");
        setSubmitError("The annual revenue field must be a number. Please select a different option or try again.");
      } else {
        toast.error(
          error.response?.data?.message ||
          "Failed to create. Please try again."
        );
      }
    }  finally {
      setIsSubmitting(false);
    }
  };

  // Go to previous step
  const handleBack = () => {
    if (currentStep > 0) {
      const newHistory = [...slidesHistory];
      newHistory.pop(); // Remove the current step from history
      const prevStep = newHistory[newHistory.length - 1]; // Get the previous step
      setCurrentStep(prevStep);
      setSlidesHistory(newHistory);
    }
  };

  // Skip the onboarding process
  const handleSkip = () => {
    console.log("Onboarding skipped");
    navigate("/auth/add-store");
  };

  // Get progress percentage
  const getProgressPercentage = () => {
    return ((currentStep + 1) / steps.length) * 100;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Header with progress bar */}
      <div className="w-full bg-white shadow-sm fixed top-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* <div className="font-bold text-xl text-blue-600">Company Logo</div> */}
            <div className="flex justify-center">
              <a href="https://myappspace.net/" rel="noreferrer" target="_blank">
            <img
              src="/images/auth/MyAppspace (3).png"
              className="w-[170px] h-full"
              alt="Logo"
            />
            </a>
            </div> 
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1 bg-gray-200">
            <div 
              className="h-full bg-blue-600 transition-all duration-300 ease-out"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow flex items-center justify-center pt-20 pb-10 px-4">
        <div className="w-full max-w-3xl mx-auto">
          {/* Card Container */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {slidesHistory.map((stepIndex:any, idx:any) => {
              const step = steps[stepIndex];
              const isActive = idx === slidesHistory.length - 1;
              
              if (!isActive) return null; // Only render the active card
              
              return (
                <div 
                  key={`${stepIndex}-${idx}`}
                  className="transition-all duration-500 ease-in-out"
                >
                  <div className="p-4 lg:p-8">
                    {/* Step content */}
                    <div className="mb-8">
                      <h1 className="text-3xl font-bold mb-3 text-gray-800">{step.title}</h1>
                      <p className="text-gray-600">{step.subtitle}</p>
                    </div>

                    {/* Options */}
                    <div className="space-y-4 mb-8">
                      {stepIndex === 1 ? (
                        // Special layout for the registration question
                        <>
                          <div className="space-y-4">
                            <div className="relative">
                              <label className={`flex items-start p-5 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md
                                ${formData.isRegistered === 'yes' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                                <input
                                  type="radio"
                                  name={`step-${stepIndex}`}
                                  checked={formData.isRegistered === 'yes'}
                                  onChange={() => handleOptionSelect('yes', false)}
                                  className="mt-1 mr-4 h-5 w-5 text-blue-600"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center">
                                    <div className="mr-3 flex-shrink-0">
                                      {step.options[0].icon}
                                    </div>
                                    <span className="font-medium text-lg">Is your business registered?</span>
                                  </div>
                                  <div className="text-sm text-gray-600 mt-1">Yes</div>
                                </div>
                              </label>
                              {formData.isRegistered === 'yes' && (
                                <div className="mt-4 rounded-lg border-2 border-blue-100 bg-blue-50 p-6">
                                  <div className="space-y-4">
                                    {step.options[0].subOptions.map((subOption:any) => (
                                      <div key={subOption.id}>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                          {subOption.label}:
                                        </label>
                                        {subOption.type === 'number' ? (
                                          <input
                                            type="number"
                                            min="1900"
                                            max={new Date().getFullYear()}
                                            placeholder={subOption.placeholder}
                                            value={formData.businessYear}
                                            onChange={(e) => handleSubOptionChange('yes', subOption.id, e.target.value)}
                                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        ) : subOption.type === 'select' ? (
                                          <select
                                            value={formData.annualRevenue}
                                            onChange={(e) => handleSubOptionChange('yes', subOption.id, e.target.value)}
                                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                          >
                                            <option value="">Select {subOption.label}</option>
                                            {subOption.choices.map((choice:any, idx:any) => (
                                              <option key={idx} value={choice}>{choice}</option>
                                            ))}
                                          </select>
                                        ) : null}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="relative">
                              <label className={`flex items-start p-5 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md
                                ${formData.isRegistered === 'no' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                                <input
                                  type="radio"
                                  name={`step-${stepIndex}`}
                                  checked={formData.isRegistered === 'no'}
                                  onChange={() => handleOptionSelect('no', false)}
                                  className="mt-1 mr-4 h-5 w-5 text-blue-600"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center">
                                    <div className="mr-3 flex-shrink-0">
                                      {step.options[1].icon}
                                    </div>
                                    <span className="font-medium text-lg">Is your business registered?</span>
                                  </div>
                                  <div className="text-sm text-gray-600 mt-1">No (New business)</div>
                                </div>
                              </label>
                            </div>
                          </div>
                        </>
                      ) : (
                        // Regular options for other steps
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {step.options.map((option:any) => (
                            <div key={option.id} className="relative">
                              <label className={`flex items-start p-5 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md
                                ${(stepIndex === 0 && formData.businessType === option.id) || 
                                  (stepIndex === 2 && formData.productType === option.id) 
                                    ? 'border-blue-500 bg-blue-50' 
                                    : 'border-gray-200 hover:border-blue-300'}`}>
                                <input
                                  type={step.isMultiSelect ? "checkbox" : "radio"}
                                  name={`step-${stepIndex}`}
                                  checked={
                                    stepIndex === 0
                                      ? formData.businessType === option.id
                                      : stepIndex === 2
                                      ? formData.productType === option.id
                                      : false
                                  }
                                  onChange={() => handleOptionSelect(option.id, step.isMultiSelect)}
                                  className="mt-1 mr-4 h-5 w-5 text-blue-600"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center">
                                    <div className="mr-3 flex-shrink-0">
                                      {option.icon}
                                    </div>
                                    <span className="font-medium text-lg">{option.label}</span>
                                  </div>
                                  {option.description && <div className="text-sm text-gray-600 mt-1">{option.description}</div>}
                                </div>
                                {(stepIndex === 0 && formData.businessType === option.id) || 
                                  (stepIndex === 2 && formData.productType === option.id) ? (
                                  <div className="absolute top-2 right-2">
                                    <div className="bg-blue-500 text-white rounded-full p-1">
                                      <MdDone size={16} />
                                    </div>
                                  </div>
                                ) : null}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Error message */}
                    {submitError && stepIndex === steps.length - 1 && (
                      <div className="text-red-500 text-sm mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-center">
                          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {submitError}
                        </div>
                      </div>
                    )}

                    {/* Navigation buttons */}
                    <div className="flex justify-between items-center">
                      <button
                        onClick={handleBack}
                        className={`px-5 py-2 rounded-lg flex items-center transition-colors ${
                          stepIndex === 0 
                            ? 'opacity-0 cursor-default' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        disabled={stepIndex === 0}
                      >
                        <IoIosArrowBack className='w-5 h-5 mr-1'/>
                        Back
                      </button>
                      
                      <button
                        onClick={handleNext}
                        disabled={isSubmitting || isNextDisabled()}
                        className={`px-5 py-2 rounded-lg flex items-center transition-colors ${
                          isSubmitting || isNextDisabled()
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {stepIndex === steps.length - 1 ? (
                          isSubmitting ? (
                            <>
                              <span className="mr-2">Submitting</span>
                              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                            </>
                          ) : (
                            'Complete'
                          )
                        ) : (
                          <>
                            Next
                            <MdNavigateNext className='w-5 h-5 ml-1'/>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Skip onboarding link */}
          <div className="text-center mt-6">
            <button 
              onClick={handleSkip}
              className="text-gray-500 hover:text-gray-700 flex items-center mx-auto transition-colors"
            >
              Skip this setup
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-1" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default KYCOnboardingForm;