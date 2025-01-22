import React from 'react'
import DashboardLayout from '../../../components/DashboardLayout'
type Plan = {
  name: string;
  price: string;
  buttonLabel: string;
  buttonColor: string | React.CSSProperties; // Updated type
  features: string[];
  note: string;
};

const Subscription = () => {
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
        background: "linear-gradient(to bottom, #382B67, #7056CD)", // Gradient style
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
        background: "linear-gradient(to bottom, #382B67, #7056CD)", // Gradient style
        color: "white",
      },
      // buttonColor: "bg-purple-600 text-white",
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
  <div className=" min-h-screen flex flex-col items-center py-10">
      {/* Toggle for Monthly/Annually */}
      <div className="mb-8 bg-white rounded-full flex items-center p-1">
        <button className="px-4 py-2 bg-[#796BEB1A]/[10%] rounded-full text-[#8F75EF] text-[13px] font-[500]">
          Monthly
        </button>
        <button className="px-4 py-2 text-[#686868] text-[13px] font-[500] rounded-md">
          Annually
        </button>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3  px-4 md:px-16">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {plan.name}
            </h3>
            <p className="text-4xl font-bold bg-[#796BEB1A]/[10%] rounded-[28px] px-6 py-3 text-gray-800 mb-2">
              {plan.price} <span className="text-lg font-normal">NGN/mo.</span>
            </p>
            <button
                className={`px-4 py-2 rounded-lg font-medium mb-2 ${
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
                  <li key={idx} className="flex items-center gap-3">
                                              <img src="/images/sub/subcheck.svg" className="text-center" alt="myappspace Logo" />

                                              <span className='text-[#000000] underline decoration-[#9D9D9D] decoration-dotted underline-offset-4 text-[12px] font-[500]'>{feature}</span>

                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
   </DashboardLayout>
  )
}

export default Subscription