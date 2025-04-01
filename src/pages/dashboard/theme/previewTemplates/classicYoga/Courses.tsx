import React from 'react';

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: 'YOGA IN TRINITY',
      description: 'Unlock a perfect harmony between body, mind, and spirit through our specialized Trinity yoga approach.',
      image: '/images/theme/preview/course1.png',
      placeholder: '/images/theme/preview/course12.png'
    },
    {
      id: 2,
      title: 'YOGA COID',
      description: 'Experience our signature Coordinated Internal Development yoga designed to align your chakras and energy flow.',
      image: '/images/theme/preview/course2.png',
      placeholder: '/images/theme/preview/course21.png'
    },
    {
      id: 3,
      title: 'WHEEL YOGA',
      description: 'Master advanced wheel poses that improve flexibility, strengthen your spine, and open up your chest and shoulders.',
      image: '/images/theme/preview/course3.png',
      placeholder: '/images/theme/preview/course31.png'
    }
  ];

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-light text-gray-700 mb-10">
          OUR COURSES
          <span className="inline-block ml-2">
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.633 10.0001C6.633 8.15008 8.1501 6.6333 10 6.6333C11.8499 6.6333 13.367 8.15008 13.367 10.0001C13.367 11.8499 11.8499 13.3667 10 13.3667C8.1501 13.3667 6.633 11.8499 6.633 10.0001Z" />
            </svg>
          </span>
        </h2>

        <div
        className="flex items-center justify-center overflow-hidden overflow-x-auto  scroll-smooth overscroll-x-contain scrollbar-hide space-x-4 cursor-grab"

        // style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {courses
      .map((course, index) => (
          <div 
          key={index} 
          className={` bg-white shadow-lg rounded-lg overflow-hidden font-outfit  transition-all duration-200 cursor-pointer`}
          // className=""
          >
            <img src={course.image} alt={course.title} className="w-full h-56 object-cover" />
            <div className="p-6 text-center">
              <div className="flex items-center justify-center -mt-12">
                <img
                  src={course.placeholder}
                  alt={course.title}
                  className="w-20 h-20 border-4 border-white rounded-full shadow-md"
                />
              </div>
              <h4 className="text-[#E791B7] mt-3 text-[15px]">{course?.title}</h4>
              <h3 className="text-[25px] text-[#333333] mt-3">{course?.title}</h3>
              <p className="text-[#666666] mt-5 text-[15px] max-w-[307px]">
                {course?.description}
              </p>
            </div>
          </div>
        ))}
        </div>

   
      </div>
    </div>
  );
};

export default Courses;