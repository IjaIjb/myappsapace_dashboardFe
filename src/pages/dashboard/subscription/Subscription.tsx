import React, { useState } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';

type Plan = {
  name: string;
  tagline: string;
  price: string | number;
  currency: string;
  period: string;
  buttonLabel: string;
  buttonColor: string;
  popular?: boolean;
  features: string[];
  transactionFee: string;
  bestFor: string;
  support: string;
};

const Subscription = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');
  
  const plans: Plan[] = [
    {
      name: "Starter Plan",
      tagline: "Free",
      price: 0,
      currency: "₦",
      period: "/month",
      buttonLabel: "Get Started",
      buttonColor: "bg-gray-600 hover:bg-gray-700",
      features: [
        "Basic store setup (default theme, limited customization)",
        "10 product listings (physical or digital)",
        "Free subdomain (yourstore.myappspace.site)",
        "Basic analytics (visitor count, orders, revenue)",
        "Single payment option",
        "Multi Currency Support",
        "1 staff account (Admin access only)",
        "Customer chat integration (WhatsApp, Messenger)",
        "Community support (limited email support)"
      ],
      transactionFee: "5% per sale",
      bestFor: "Beginners & small businesses testing e-commerce",
      support: "Community support"
    },
    {
      name: "Growth Plan",
      tagline: "Most Popular",
      price: 6000,
      currency: "₦",
      period: "/month",
      buttonLabel: "Start Free Trial",
      buttonColor: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700",
      popular: true,
      features: [
        "Everything in Starter Plan, plus:",
        "Up to 100 products",
        "Custom domain support (e.g., yourstore.com)",
        "Integrated payment gateways (Flutterwave, Paystack, Stripe)",
        "Basic marketing tools (SEO optimization, social media integration)",
        "Product reviews & ratings",
        "3 staff accounts (Roles: Admin, Manager, Sales Rep)",
        "Discount & promo codes",
        "Abandoned cart email reminders"
      ],
      transactionFee: "3% per sale",
      bestFor: "Small businesses ready to scale",
      support: "Standard email & chat"
    },
    {
      name: "Scale Plan",
      tagline: "Advanced",
      price: 15000,
      currency: "₦",
      period: "/month",
      buttonLabel: "Start Free Trial",
      buttonColor: "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700",
      features: [
        "Everything in Growth Plan, plus:",
        "Unlimited product listings",
        "Advanced store customization (custom themes, branding)",
        "Multi-channel selling (Instagram, Facebook, WhatsApp, TikTok)",
        "Automated inventory management",
        "Advanced analytics & reporting (customer insights, sales trends)",
        "5 staff accounts (Admin, Finance, Operations, Marketing, Sales)",
        "Automated abandoned cart recovery",
        "Affiliate marketing & referral program",
        "Customer loyalty program"
      ],
      transactionFee: "1.5% per sale",
      bestFor: "Growing businesses needing automation & multi-channel selling",
      support: "Priority support (email, chat, phone)"
    },
    {
      name: "Enterprise",
      tagline: "Custom Plan",
      price: "Custom",
      currency: "",
      period: "",
      buttonLabel: "Contact Sales",
      buttonColor: "bg-gray-800 hover:bg-gray-900",
      features: [
        "Everything in Scale Plan, plus:",
        "API access for custom integrations (ERP, CRM, accounting software)",
        "Multi-store management (operate multiple stores from one dashboard)",
        "AI-powered product recommendations",
        "Advanced order fulfillment automation",
        "Custom payment gateways (crypto, bank transfers, etc.)",
        "Unlimited staff accounts (assign custom roles & permissions)",
        "Dedicated account manager",
        "White-label branding (remove MyAppSpace branding)"
      ],
      transactionFee: "No transaction fees (flat subscription pricing)",
      bestFor: "Large businesses & enterprises with custom needs",
      support: "24/7 premium support (dedicated success manager)"
    }
  ];

  const handleBillingCycleChange = () => {
    setBillingCycle(billingCycle === 'monthly' ? 'annually' : 'monthly');
  };
  
  return (
    <DashboardLayout>
      <div className="py-6 px-4 md:px-6 md:py-10 flex flex-col items-center bg-gray-50">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan for your business needs and scale as you grow
          </p>
          
          {/* Toggle for Monthly/Annually */}
          <div className="mt-6 inline-flex items-center bg-white p-1 rounded-lg shadow-sm">
            <button
              onClick={handleBillingCycleChange}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === 'monthly' 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={handleBillingCycleChange}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === 'annually' 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annually <span className="text-xs text-green-600 font-normal">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="w-full max-w-7xl">
          {/* Scrollable container for small screens */}
          <div className="overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 min-w-[300px] sm:min-w-0">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col w-full min-w-[300px] sm:min-w-0 border ${
                    plan.popular ? 'border-indigo-500 relative' : 'border-transparent'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-indigo-500 text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                        POPULAR
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {plan.name}
                        </h3>
                        <p className="text-sm text-indigo-600 font-medium">
                          {plan.tagline}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-baseline">
                        {typeof plan.price === 'number' ? (
                          <>
                            <span className="text-3xl font-bold text-gray-900">{plan.currency}{plan.price.toLocaleString()}</span>
                            <span className="text-gray-500 ml-1">{plan.period}</span>
                          </>
                        ) : (
                          <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-500">Transaction fees: {plan.transactionFee}</p>
                    </div>
                    
                    <div className="mt-6">
                      <p className="text-sm text-gray-700 mb-2">
                        <span className="font-medium">Best for:</span> {plan.bestFor}
                      </p>
                    </div>
                    
                    <button
                      className={`mt-4 w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${plan.buttonColor}`}
                    >
                      {plan.buttonLabel}
                    </button>
                  </div>
                  
                  <div className="flex-grow p-6">
                    <h4 className="font-medium text-sm text-gray-900 mb-4">Features:</h4>
                    <ul className="space-y-3 text-sm">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-gray-700 leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Support:</span> {plan.support}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>All plans include secure hosting, 99.9% uptime guarantee, and automatic updates.</p>
            <p className="mt-2">Questions? <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800">Contact our sales team</a></p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Subscription;