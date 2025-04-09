import React, { useState } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';

type Plan = {
  name: string;
  price: string;
  buttonLabel: string;
  buttonColor: string | React.CSSProperties;
  features: string[];
  note: string;
};

const Subscription = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');
  
  const plans: Plan[] = [
    {
      name: "Name of Plan",
      price: "0",
      buttonLabel: "Use MyAppSpace for Free",
      buttonColor: "bg-gray-200 text-gray-800",
      features: [
        "Unlimited Vibes and chills",
        "Something",
        "You know what",
        "But wait",
        "Unlimited Vibes and chills",
        "Unlimited Vibes and chills",
      ],
      note: "(No Credit card required)",
    },
    {
      name: "Name of Plan",
      price: "0",
      buttonLabel: "Start my Free Trial",
      buttonColor: {
        background: "linear-gradient(to bottom, #382B67, #7056CD)",
        color: "white",
      },
      features: [
        "Unlimited Vibes and chills",
        "Something",
        "You know what",
        "But wait",
        "Unlimited Vibes and chills",
        "Unlimited Vibes and chills",
      ],
      note: "(No Credit card required)",
    },
    {
      name: "Name of Plan",
      price: "0", 
      buttonLabel: "Start my Free Trial",
      buttonColor: {
        background: "linear-gradient(to bottom, #382B67, #7056CD)",
        color: "white",
      },
      features: [
        "Unlimited Vibes and chills",
        "Something",
        "You know what",
        "But wait",
        "Unlimited Vibes and chills",
        "Unlimited Vibes and chills",
      ],
      note: "(No Credit card required)",
    },
  ];
  
  return (
    <DashboardLayout>
      <div className="py-6 px-4 md:py-10 flex flex-col items-center">
        {/* Toggle for Monthly/Annually */}
        <div className="mb-8 bg-white rounded-full flex items-center p-1 shadow-sm">
          <button 
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-full text-[13px] font-[500] transition-colors ${
              billingCycle === 'monthly' 
                ? 'bg-[#796BEB1A]/[10%] text-[#8F75EF]' 
                : 'text-[#686868]'
            }`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setBillingCycle('annually')}
            className={`px-4 py-2 rounded-full text-[13px] font-[500] transition-colors ${
              billingCycle === 'annually' 
                ? 'bg-[#796BEB1A]/[10%] text-[#8F75EF]' 
                : 'text-[#686868]'
            }`}
          >
            Annually
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="w-full max-w-6xl grid gap-6 sm:gap-8">
          {/* Scrollable container for small screens */}
          <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 min-w-[280px] sm:min-w-0">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center w-full min-w-[280px] sm:min-w-0"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {plan.name}
                  </h3>
                  <p className="text-4xl font-bold bg-[#796BEB1A]/[10%] rounded-[28px] px-6 py-3 text-gray-800 mb-2">
                    {plan.price} <span className="text-lg font-normal">NGN/mo.</span>
                  </p>
                  <button
                    className={`px-4 py-2 rounded-lg font-medium mb-2 w-full max-w-[220px] text-center ${
                      typeof plan.buttonColor === "string" ? plan.buttonColor : ""
                    }`}
                    style={
                      typeof plan.buttonColor === "object"
                        ? plan.buttonColor
                        : undefined
                    }
                  >
                    {plan.buttonLabel}
                  </button>
                  <p className="text-[10px] font-[500] text-[#9D9D9D] mb-4">{plan.note}</p>
                  <hr className="w-full border-gray-200 mb-4" />
                  <div className="text-gray-800 w-full">
                    <h4 className="text-[12px] text-[#9D9D9D] font-[500] text-center mb-4">What's included:</h4>
                    <ul className="space-y-4">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <img 
                            src="/images/sub/subcheck.svg" 
                            className="flex-shrink-0 mt-1" 
                            alt="check" 
                          />
                          <span className='text-[#000000] underline decoration-[#9D9D9D] decoration-dotted underline-offset-4 text-[12px] font-[500]'>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Subscription;