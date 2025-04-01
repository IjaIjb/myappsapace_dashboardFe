import React from 'react';

function SinglePolicyCard({ policyData }) {
  return (
    <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-4 shadow-sm min-w-[220px] md:w-full">
      {/* Dynamic Icon */}
      <div className="w-12 h-12 flex justify-center items-center">
        <img src={policyData.icon} alt={policyData.title} className="w-full object-cover" />
      </div>
      
      {/* Text */}
      <div className='flex flex-col w-full'>
        <h3 className="text-black font-quicksand text-sm font-semibold">{policyData.title}</h3>
        <p className="text-gray-500 font-lato font-light text-xs">{policyData.subtitle}</p>
      </div>
    </div>
  );
}

export default SinglePolicyCard;
