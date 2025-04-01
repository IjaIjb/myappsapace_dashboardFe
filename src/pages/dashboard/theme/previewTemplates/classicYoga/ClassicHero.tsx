import React from 'react';

const ClassicHero = () => {
  return (
    <div className="relative bg-gray-50 py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center">
          {/* <div className="flex w-full justify-between text-gray-500 uppercase tracking-widest text-sm mb-4">
            <div className="text-left">
              Yoga for flexibility and health
            </div>
            <div className="text-right">
              Yoga as meditation
            </div>
          </div>
          
          <div className="flex w-full justify-between font-light text-gray-600 tracking-wider text-xl mb-6">
            <div className="text-left">
              CONFIDENT <br />WITH SCENT
            </div>
            <div className="text-right">
              SPACE IS<br />MEDITATIVE
            </div>
          </div>
           */}
          <div className="">
            <img 
              src="/images/theme/preview/classicHero.png" 
              alt="Woman doing yoga" 
              className="rounded-md"
              onError={(e:any) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/500x300?text=Yoga+Pose";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassicHero;