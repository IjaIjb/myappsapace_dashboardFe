import React from 'react';

const Appointment = () => {
  return (
    <div className="bg-gray-200">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative">
            <img 
              src="/images/yoga-video.jpg" 
              alt="Yoga instructor" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/600x400?text=Yoga+Instructor";
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-16 h-16 bg-white bg-opacity-75 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="bg-pink-500 text-white p-8 md:p-12">
            <h2 className="text-2xl font-light mb-6 flex items-center">
              MAKE AN APPOINTMENT
              <span className="inline-block ml-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.633 10.0001C6.633 8.15008 8.1501 6.6333 10 6.6333C11.8499 6.6333 13.367 8.15008 13.367 10.0001C13.367 11.8499 11.8499 13.3667 10 13.3667C8.1501 13.3667 6.633 11.8499 6.633 10.0001Z" />
                </svg>
              </span>
            </h2>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="p-2 rounded w-full text-gray-800"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="p-2 rounded w-full text-gray-800"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder="Phone"
                  className="p-2 rounded w-full text-gray-800"
                />
                <input
                  type="text"
                  placeholder="Select Date"
                  className="p-2 rounded w-full text-gray-800"
                />
              </div>
              
              <textarea
                placeholder="Message"
                rows="4"
                className="p-2 rounded w-full text-gray-800"
              ></textarea>
              
              <button
                type="submit"
                className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-6 rounded"
              >
                SUBMIT NOW
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;