import { useState } from 'react';
import { MdNavigateNext } from 'react-icons/md';
import { IoIosArrowBack } from "react-icons/io";
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
        { id: 'online_store', label: 'An online store', description: 'Where you can sell any product online' },
        { id: 'basic_website', label: 'Basic website', description: 'For your company/business/etc' },
        { id: 'portfolio', label: 'Portfolio page', description: 'A professional page for yourself' },
        { id: 'custom', label: 'Custom', description: 'Request for a custom application built with your specifications and niche' },
        { id: 'other', label: 'Other', description: '' }
      ],
      isMultiSelect: false
    },
    {
      title: "Tell us about your business",
      subtitle: "Help us understand your business better",
      options: [
        { id: 'yes', label: 'Is your business registered?', description: 'Yes', hasSubOptions: true, 
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
        { id: 'no', label: 'Is your business registered?', description: 'No (New business)' }
      ],
      isMultiSelect: false
    },
    {
      title: "What type of product are you selling?",
      subtitle: "This helps us customize your experience",
      options: [
        { id: 'physical', label: 'Physical products', description: 'e.g. electronics, clothes, etc' },
        { id: 'digital', label: 'Digital products', description: 'e.g. NFT, gift card' },
        { id: 'services', label: 'Services', description: 'e.g. shortlet, training' },
        { id: 'other', label: 'Other', description: '' }
      ],
      isMultiSelect: false
    }
  ];

  // Handle checkbox/radio selections
  const handleOptionSelect = (optionId:any, isMulti:any) => {
    if (currentStep === 0) {
      // First step now - business type (was previously the second step)
      setFormData({
        ...formData,
        businessType: optionId
      });
    } else if (currentStep === 1) {
      // Second step now - business registration (was previously the third step)
      setFormData({
        ...formData,
        isRegistered: optionId
      });
    } else if (currentStep === 2) {
      // Third step now - product type (was previously the fourth step)
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

  // Prepare the API payload
  const preparePayload = () => {
    const formDataPayload = new FormData();
    
    // Format: store_type - from step 0 selection
    formDataPayload.append('store_type', formData.businessType);
    
    // Format: business_type - "existing" if registered, "new" if not
    formDataPayload.append('business_type', formData.isRegistered === 'yes' ? 'existing' : 'new');
    
    // Format: year_started - only required if business_type = existing
    if (formData.isRegistered === 'yes') {
      formDataPayload.append('year_started', formData.businessYear);
      formDataPayload.append('annual_revenue', formData.annualRevenue);
    }
    
    // Format: product_type - from step 2 selection
    // Map 'services' to 'service' to match the API expected format
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
                response?.data?.message || "kyc questionaire created successfully!"
              );
      console.log("Form submitted successfully:", response);
      navigate("/auth/add-store"); // Navigate to the next page

      // Here you could redirect the user or show a success message
      // For example: navigate('/dashboard');
      } else {
        toast.error(
          response?.data?.message ||
            "Failed to create. Please try again."
        );
      }
    } catch (error:any) {
      console.error("Error submitting KYC form:", error);
      // setSubmitError('There was an error submitting your information. Please try again.');
           toast.error(
              error.response?.data?.message ||
                "Failed to create. Please try again."
            );
    } finally {
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
    // Implement your skip logic here
    // For example: navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-12 bg-gradient-to-b from-gray-900 to-black text-gray-100">
      <div className="w-full max-w-4xl mx-auto">
        {/* Card Stack */}
        <div className="relative h-screen">
          {slidesHistory.map((stepIndex:any, idx:any) => {
            const step = steps[stepIndex];
            const isActive = idx === slidesHistory.length - 1;
            const zIndex = 10 + idx;
            const offset = (slidesHistory.length - 1 - idx) * 12;
            
            return (
              <div 
                key={`${stepIndex}-${idx}`}
                className={`absolute w-full transition-all duration-500 ease-in-out bg-white rounded-xl shadow-2xl text-gray-800 mx-auto
                  ${isActive ? 'opacity-100' : 'opacity-90 pointer-events-none'}
                `}
                style={{ 
                  zIndex,
                  transform: `translateY(-${offset}px) scale(${1 - (offset * 0.0004)})`,
                  width: `calc(100% - ${offset * 2}px)`,
                  left: offset,
                }}
              >
                <div className="p-8">
                  {/* Step content */}
                  <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">{step.title}</h1>
                    <p className="text-gray-600">{step.subtitle}</p>
                  </div>

                  {/* Options */}
                  {isActive && 
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {stepIndex === 1 ? (
                      // Special layout for the registration question (now at index 1 instead of 2)
                      <>
                        <div className="relative">
                          <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                              type="radio"
                              name={`step-${stepIndex}`}
                              checked={formData.isRegistered === 'yes'}
                              onChange={() => handleOptionSelect('yes', false)}
                              className="mt-1 mr-3"
                            />
                            <div>
                              <div className="font-medium">Is your business registered?</div>
                              <div className="text-sm text-gray-500">Yes</div>
                            </div>
                          </label>
                          {formData.isRegistered === 'yes' && (
                            <div className="mt-4 ml-8 space-y-4">
                              {step.options[0].subOptions.map((subOption:any) => (
                                <div key={subOption.id} className="ml-2">
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                  ) : subOption.type === 'select' ? (
                                    <select
                                      value={formData.annualRevenue}
                                      onChange={(e) => handleSubOptionChange('yes', subOption.id, e.target.value)}
                                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                          )}
                        </div>
                        <div className="relative">
                          <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                              type="radio"
                              name={`step-${stepIndex}`}
                              checked={formData.isRegistered === 'no'}
                              onChange={() => handleOptionSelect('no', false)}
                              className="mt-1 mr-3"
                            />
                            <div>
                              <div className="font-medium">Is your business registered?</div>
                              <div className="text-sm text-gray-500">No (New business)</div>
                            </div>
                          </label>
                        </div>
                      </>
                    ) : (
                      // Regular options for other steps
                      step.options.map((option:any) => (
                        <div key={option.id} className="relative">
                          <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
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
                              className="mt-1 mr-3"
                            />
                            <div>
                              <div className="font-medium">{option.label}</div>
                              {option.description && <div className="text-sm text-gray-500">{option.description}</div>}
                            </div>
                          </label>
                        </div>
                      ))
                    )}
                  </div>
                  }

                  {/* Error message */}
                  {isActive && submitError && stepIndex === steps.length - 1 && (
                    <div className="text-red-500 text-sm mb-4">
                      {submitError}
                    </div>
                  )}

                  {/* Navigation buttons */}
                  {isActive && (
                    <div className="flex justify-between items-center">
                      <button
                        onClick={handleBack}
                        className={`px-2 py-1 hover:bg-gray-300 rounded-md flex items-center ${
                          stepIndex === 0 ? 'opacity-0 cursor-default' : ''
                        }`}
                        disabled={stepIndex === 0}
                      >
                        <IoIosArrowBack className='w-6 h-6'/>
                        Back
                      </button>
                      
                      <button
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className={`px-4 py-1 rounded-md flex items-center ${
                          isSubmitting 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                            : 'hover:bg-gray-200'
                        }`}
                      >
                        {stepIndex === steps.length - 1 ? (
                          isSubmitting ? (
                            <>
                              <span className="mr-2">Submitting</span>
                              <div className="animate-spin h-4 w-4 border-2 border-gray-500 border-t-transparent rounded-full"></div>
                            </>
                          ) : (
                            'Submit'
                          )
                        ) : (
                          'Next'
                        )}
                        {!isSubmitting && stepIndex !== steps.length - 1 && <MdNavigateNext className='w-6 h-6'/>}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Skip onboarding link */}
        <div className="text-center mt-4">
          <button 
            onClick={handleSkip}
            className="text-gray-400 hover:text-white flex items-center mx-auto"
          >
            I don't want help setting up 
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
    </div>
  );
};

export default KYCOnboardingForm;