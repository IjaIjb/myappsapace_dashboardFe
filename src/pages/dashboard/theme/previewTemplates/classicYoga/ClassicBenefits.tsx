import React from 'react';

const ClassicBenefits = () => {


  return (
    <div className="py-16 px-4 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-light text-gray-700 mb-2">
          RELAX IN THE SOUL BLISS
          <span className="inline-block ml-2">
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.633 10.0001C6.633 8.15008 8.1501 6.6333 10 6.6333C11.8499 6.6333 13.367 8.15008 13.367 10.0001C13.367 11.8499 11.8499 13.3667 10 13.3667C8.1501 13.3667 6.633 11.8499 6.633 10.0001Z" />
            </svg>
          </span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm mb-10">
          Yoga for a space where you can find balance, tranquility and reconnect deeply to
          yourself by giving you better breath, movement and health.
        </p>

        <div className="relative">
          <div className=" rounded-full  flex items-center justify-center">
            <img 
              src="/images/theme/preview/classicHero2.png" 
              alt="Yoga meditation pose" 
              className=" rounded-full object-cover"
              onError={(e:any) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150?text=Yoga";
              }}
            />
          </div>

          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {benefits.map((benefit) => (
              <div key={benefit.id} className="text-center">
                <div className={`w-12 h-12 ${benefit.color} rounded-full flex items-center justify-center text-white mx-auto mb-3`}>
                  <span className="text-xl">{benefit.icon}</span>
                </div>
                <h3 className="text-gray-700 font-medium mb-2">{benefit.title}</h3>
                <p className="text-gray-500 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ClassicBenefits;