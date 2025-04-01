import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Sample testimonial data - replace with your actual testimonials
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    role: 'Verified Buyer',
    rating: 5,
    content: "The quality of the products exceeded my expectations. Fast shipping and excellent customer service. I'll definitely be shopping here again!",
    product: 'Wireless Earbuds'
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    role: 'Verified Buyer',
    rating: 5,
    content: "I've purchased from many electronics stores, but the attention to detail and packaging here is unmatched. The product works flawlessly.",
    product: 'Smart Watch'
  },
  {
    id: 3,
    name: 'Jessica Williams',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'Verified Buyer',
    rating: 4,
    content: 'Great selection of products at competitive prices. The website was easy to navigate, and my order arrived ahead of schedule.',
    product: 'Bluetooth Speaker'
  },
  {
    id: 4,
    name: 'David Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    role: 'Verified Buyer',
    rating: 5,
    content: 'Outstanding support when I had questions about my purchase. The team went above and beyond to make sure I was satisfied.',
    product: 'Ultra HD Monitor'
  }
];

const CustomerTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Get second testimonial index (ensuring it wraps around the array)
  const getSecondIndex = (firstIndex) => (firstIndex + 1) % testimonials.length;

  // Function to render stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar 
        key={i} 
        className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 2) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => {
      // Calculate previous pair's starting index
      const newIndex = prevIndex - 2;
      // Handle wraparound
      return newIndex < 0 ? testimonials.length + newIndex : newIndex;
    });
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 7000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0
    })
  };

  // Render a single testimonial card
  const renderTestimonialCard = (testimonial) => (
    <div className="bg-white rounded-xl p-5 md:p-6 shadow-lg h-full flex flex-col">
      <FaQuoteLeft className="text-teal-200 text-3xl mb-3" />
      
      <blockquote className="text-gray-700 text-base md:text-lg mb-4 flex-grow">
        "{testimonial.content}"
      </blockquote>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name} 
            className="w-10 h-10 rounded-full object-cover mr-3" 
          />
          <div>
            <h4 className="font-semibold text-gray-900 text-sm md:text-base">{testimonial.name}</h4>
            <p className="text-gray-500 text-xs">{testimonial.role}</p>
            <div className="flex mt-1">
              {renderStars(testimonial.rating)}
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <span className="inline-block px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs">
            {testimonial.product}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <section 
      className="py-16 bg-teal-50 overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="text-gray-600 mt-2">Real experiences from satisfied shoppers</p>
        </div>
        
        <div className="relative py-10">
          {/* Desktop Navigation Buttons (on sides) */}
          <div className="hidden md:block">
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors focus:outline-none shadow-md"
              aria-label="Previous testimonials"
            >
              <FaChevronLeft className="text-gray-500" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors focus:outline-none shadow-md"
              aria-label="Next testimonials"
            >
              <FaChevronRight className="text-gray-500" />
            </button>
          </div>
          
          <div className="relative h-[470px] md:h-[350px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 }
                }}
                className="absolute w-full grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* First testimonial */}
                {renderTestimonialCard(testimonials[currentIndex])}
                
                {/* Second testimonial */}
                {renderTestimonialCard(testimonials[getSecondIndex(currentIndex)])}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Mobile Navigation Buttons (bottom center) */}
          <div className="flex md:hidden justify-center mt-8 space-x-3">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors focus:outline-none shadow-sm"
              aria-label="Previous testimonials"
            >
              <FaChevronLeft className="text-gray-500" />
            </button>
            
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors focus:outline-none shadow-sm"
              aria-label="Next testimonials"
            >
              <FaChevronRight className="text-gray-500" />
            </button>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {/* We'll show indicators for each pair of testimonials */}
            {Array.from({ length: Math.ceil(testimonials.length / 2) }, (_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i * 2 > currentIndex ? 1 : -1);
                  setCurrentIndex(i * 2);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / 2) === i 
                    ? "bg-teal-600 scale-125" 
                    : "bg-teal-200 hover:bg-teal-300"
                }`}
                aria-label={`Go to testimonial pair ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;