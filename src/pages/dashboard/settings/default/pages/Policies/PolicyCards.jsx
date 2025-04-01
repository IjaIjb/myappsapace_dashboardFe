import imageConfig from '../../../../../config/imageConfig';
import SinglePolicyCard from './SinglePolicyCard';

function PolicyCards() {
  const features = [
    { icon: imageConfig.best, title: "Best prices & offers", subtitle: "Orders $50 or more" },
    { icon: imageConfig.delivery, title: "Fast & secure delivery", subtitle: "Free on orders over $100" },
    { icon: imageConfig.cash, title: "Easy returns & refunds", subtitle: "Hassle-free process" },
    { icon: imageConfig.wide, title: "24/7 customer support", subtitle: "Always here to help" },
    { icon: imageConfig.free, title: "Secure payments", subtitle: "100% protected transactions" },
  ];

  return (
    <div className="w-full py-4">
      {/* Responsive Grid Layout */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {features.map((feature, index) => (
          <SinglePolicyCard key={index} policyData={feature} />
        ))}
      </div>

      {/* Scrollable on Small Screens */}
      <div className="flex md:hidden gap-4 overflow-x-auto py-4 scrollbar-hide">
        {features.map((feature, index) => (
          <div key={index} className="min-w-[250px]">
            <SinglePolicyCard policyData={feature} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PolicyCards;
