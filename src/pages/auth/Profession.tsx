import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Profession = () => {
  const professions = [
    {
      id: 1,
      title: "Student",
      description: "Discount the total order amount.",
      icon: "/images/auth/profstudent.svg", // Correct image path for Student
      color: "bg-green-100",
    },
    {
      id: 2,
      title: "Business Person",
      description: "Discount the total order amount.",
      icon: "/images/auth/profbus.svg", // Use an image path for Business Person
      color: "bg-red-100",
    },
    {
      id: 3,
      title: "Entrepreneur",
      description: "Discount the total order amount.",
      icon: "/images/auth/profent.svg", // Use an image path for Entrepreneur
      color: "bg-purple-100",
    },
  ];

  const [selectedProfession, setSelectedProfession] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelectedProfession(id);
  };

  return (
    <div>
      <div className=''>
        <div className='mt-10'>
          <div className='flex justify-center'>
            <img src="/images/logo2.svg" className="text-center" alt="myappspace Logo" />
          </div>
          <div className='mt-[60px]'>
            <div className="max-w-[600px] mx-auto p-4">
              <h1 className="text-[20px] font-[600] mb-2">Which of these best describes you?</h1>
              <p className="text-[#686868] text-[14px] font-[400] mb-6">Choose Profession</p>
              <div className="space-y-4">
                {professions.map((profession) => (
                  <div
                    key={profession.id}
                    onClick={() => handleSelect(profession.id)}
                    className={`flex items-center p-4 border-b rounded-md cursor-pointer ${
                      selectedProfession === profession.id
                        ? "border-secondary"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-md ${profession.color}`}
                    >
                      <img src={profession.icon} alt={profession.title} className="w-8 h-8 object-contain" />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-[14px] font-[600]">{profession.title}</h2>
                      <p className="text-[12px] font-[400] text-[#686868]">{profession.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <Link
              to="/auth/usage"
              className={`disabled:bg-gray-500  flex gap-2 items-center py-2 w-fit px-6 bg-secondary text-white rounded-full  hover:bg-secondary/[70%]`}
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

export default Profession;
