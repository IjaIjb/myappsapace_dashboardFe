import React from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { FiSettings, FiCreditCard, FiInfo, FiHelpCircle, FiShield, FiFileText } from "react-icons/fi";

const settingsSections = [
  {
    id: "site",
    title: "Site Settings",
    icon: <FiSettings className="text-blue-500" size={20} />,
    items: [
      {
        title: "General Information",
        description: "Manage your store name, logo, contact details, and basic settings",
        path: "/dashboard/settings/general-information"
      }
    ]
  },
  {
    id: "payment",
    title: "Payment Preferences",
    icon: <FiCreditCard className="text-green-500" size={20} />,
    items: [
      {
        title: "Payment Methods",
        description: "Configure payment gateways, currencies, and checkout options",
        path: "/dashboard/settings/payment-preference"
      }
    ]
  },
  {
    id: "about",
    title: "About Settings",
    icon: <FiInfo className="text-purple-500" size={20} />,
    items: [
      {
        title: "Company Information",
        description: "Update your mission, vision, and company story for the About Us page",
        path: "/dashboard/settings/about-preference"
      }
    ]
  },
  {
    id: "faq",
    title: "FAQ Settings",
    icon: <FiHelpCircle className="text-yellow-500" size={20} />,
    items: [
      {
        title: "Frequently Asked Questions",
        description: "Manage common questions and answers to help your customers",
        path: "/dashboard/settings/faq-preference"
      }
    ]
  },
  {
    id: "policy",
    title: "Policy Settings",
    icon: <FiShield className="text-red-500" size={20} />,
    items: [
      {
        title: "Store Policies",
        description: "Define your privacy, shipping, returns, and payment policies",
        path: "/dashboard/settings/policy-preference"
      }
    ]
  },
  {
    id: "seo and analytics",
    title: "Analytics Settings",
    icon: <FiShield className="text-red-500" size={20} />,
    items: [
      {
        title: "analytics",
        description: "State you preference analytics",
        path: "/dashboard/settings/analytics"
      }
    ]
  },
  {
    id: "terms",
    title: "Terms And Conditions",
    icon: <FiFileText className="text-gray-700" size={20} />,
    items: [
      {
        title: "Legal Terms",
        description: "Set the legal terms and conditions for using your store",
        path: "/dashboard/settings/terms-and-condition"
      }
    ]
  }
];

const SettingCard = ({ item }:any) => {
  return (
    <Link 
      to={item.path} 
      className="border-[0.5px] rounded-[8px] bg-[#FBFBFF] pl-4 pr-4 py-3 border-[#D8D8E2] hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 shadow-sm hover:shadow"
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h5 className="text-[#000000] text-[14px] font-[500]">
            {item.title}
          </h5>
          <h6 className="text-gray-600 text-[12px] font-[300] max-w-md">
            {item.description}
          </h6>
        </div>
        <MdChevronRight className="text-gray-400 group-hover:text-blue-500" size={22} />
      </div>
    </Link>
  );
};

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="px-1 pb-4">
        {/* <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
          <p className="text-gray-600 text-sm">Manage your store settings and preferences</p>
        </div> */}
        
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            {settingsSections.map((section) => (
              <div key={section.id} className="bg-white rounded-[14px] p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  {section.icon}
                  <h4 className="text-[#000000] text-[16px] font-[600]">
                    {section.title}
                  </h4>
                </div>
                
                <div className="flex flex-col gap-3">
                  {section.items.map((item, index) => (
                    <SettingCard key={index} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white rounded-[14px] p-5 shadow-sm h-auto sticky top-20">
              <h4 className="text-[#000000] text-[16px] font-[600] mb-4">
                Need Help?
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                If you need assistance with setting up your store, check out our documentation or contact our support team.
              </p>
              <div className="flex flex-col gap-3">
                <div
                  className="text-blue-500 flex items-center gap-2 hover:text-blue-700 transition-colors duration-200"
                >
                  <FiHelpCircle /> View Documentation
                </div>
                <div 
                  className="text-blue-500 flex items-center gap-2 hover:text-blue-700 transition-colors duration-200"
                >
                  <FiInfo /> Contact Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;