import React, { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const banners = [
  {
    title: "Shop your Electronics here",
    description: "Premium tech products with exclusive deals and fast shipping",
    buttonText: "Order now",
    image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=3540&auto=format&fit=crop",
  },
  {
    title: "Get the Best Deals on Gadgets",
    description: "Find top-quality electronics at unbeatable prices. Limited-time offers!",
    buttonText: "Shop Now",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=3540&auto=format&fit=crop",
  },
  {
    title: "Latest Tech Arrivals",
    description: "Stay ahead with the newest gadgets in the market. Shop now!",
    buttonText: "Explore Now",
    image: "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?q=80&w=3540&auto=format&fit=crop",
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovering, setIsHovering] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  }, []);

  useEffect(() => {
    if (isHovering) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [nextSlide, isHovering]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div 
      className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] lg:h-[550px] overflow-hidden rounded-2xl shadow-lg"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
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
            opacity: { duration: 0.4 },
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image Wrapper */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${banners[currentIndex].image})`,
            }}
          ></div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

          {/* Content */}
          <div className="relative h-full z-10 flex flex-col justify-center text-white max-w-screen-xl mx-auto px-8 md:px-12 lg:px-16">
            <div className="max-w-xl">
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {banners[currentIndex].title}
              </motion.h2>
              
              <motion.p 
                className="mt-4 text-sm sm:text-base md:text-lg text-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {banners[currentIndex].description}
              </motion.p>
              
              <motion.button 
                className="mt-6 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-lg transition-all transform hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {banners[currentIndex].buttonText}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors focus:outline-none group"
        >
          <FaChevronLeft className="group-hover:scale-125 transition-transform" />
        </button>
        
        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors focus:outline-none group"
        >
          <FaChevronRight className="group-hover:scale-125 transition-transform" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "bg-white w-8" 
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;