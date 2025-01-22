import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const features = [
  {
    id: 1,
    title: "Effortless Online Store Setup",
    description:
      "Launch your store with ready-made templates designed for various industries.",
    icon: "/images/auth/useEffort.svg", // Replace with actual icons/images if available
    color: "bg-green-100",
  },
  {
    id: 2,
    title: "Customisation at Your Fingertips",
    description:
      "Tailor your store to reflect your brand identity without needing coding expertise.",
    icon: "/images/auth/useCustom.svg",
    color: "bg-blue-100",
  },
  {
    id: 3,
    title: "Seamless Scaling",
    description:
      "Start small and scale your store with advanced features as your business grows.",
    icon: "/images/auth/useSeam.svg",
    color: "bg-purple-100",
  },
  {
    id: 4,
    title: "Multi-Currency and Payment Gateways",
    description:
      "Accept payments globally with integrated systems like PayPal, Stripe, and Flutterwave.",
    icon: "/images/auth/useMulti.svg",
    color: "bg-yellow-100",
  },
  {
    id: 5,
    title: "Analytics and Insights",
    description:
      "Track sales, customer data, and performance to optimise your business strategy.",
    icon: "/images/auth/useAna.svg",
    color: "bg-red-100",
  },
  {
    id: 6,
    title: "Marketing Tools",
    description:
      "Built-in tools to promote your store through social media, email campaigns, and SEO-friendly design.",
    icon: "/images/auth/useMarket.svg",
    color: "bg-pink-100",
  },
];

const Usage = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);

  const handleSelect = (id: number) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter((feature) => feature !== id));
    } else if (selectedFeatures.length < 3) {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  return (
    <div>
 <div>
  <div className="my-10">
    <div className="flex justify-center">
      <img
        src="/images/logo2.svg"
        className="text-center"
        alt="myappspace Logo"
      />
    </div>
    <div className="mt-[60px]">
      <div className="max-w-[600px] mx-auto p-4">
        <h1 className="text-[20px] font-[600] mb-2">
          What do you mostly want to use{" "}
          <span className="text-secondary">MyAppSpace</span> for?
        </h1>
        <p className="text-[#686868] text-[14px] font-[400] mb-6">
          Please Select a Maximum of 3
        </p>
        <div className="space-y-3">
          {features.map((feature) => (
            <div
              key={feature.id}
              onClick={() => handleSelect(feature.id)}
              className={`flex gap-3 items-center p-4 border-b rounded-md cursor-pointer ${
                selectedFeatures.includes(feature.id) ? "border-secondary" : ""
              }`}
            >
              <div className="ml-auto">
                <input
                  type="checkbox"
                  checked={selectedFeatures.includes(feature.id)}
                  readOnly
                  className="form-checkbox h-5 w-5 text-blue-500"
                />
              </div>
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-md `}
              >
                {/* Fix: Use <img> tag to render images */}
                <img src={feature.icon} className="" alt={`${feature.title} Icon`} />
              </div>
              <div className="ml-4">
                <h2 className="text-[14px] font-[600] text-[#000000]">
                  {feature.title}
                </h2>
                <p className="text-[12px] font-[400] text-[#686868]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="flex justify-center mt-10">
      <Link
        to="/auth/waiting"
        className={`disabled:bg-gray-500 flex gap-2 items-center py-2 w-fit px-6 bg-secondary text-white rounded-full hover:bg-secondary/[70%]`}
      >
        Proceed
        <FaArrowRight />
      </Link>
    </div>
  </div>
</div>

    </div>
  );
};

export default Usage;
