import React from 'react';
import ClassicHero from './ClassicHero';
import ClassicBenefits from './ClassicBenefits';
import Courses from './Courses';
import Products from './Products';
import Appointment from './Appointment';
import FeaturedProducts from './FeaturedProducts';
import Testimonials from './Testimonial';
import Header from './Header';
// import Benefits from './components/Benefits';
// import Courses from './components/Courses';
// import Products from './components/Products';
// import Appointment from './components/Appointment';
// import FeaturedProducts from './components/FeaturedProducts';
// import Testimonials from './components/Testimonials';
// import Instagram from './components/Instagram';
// import Footer from './components/Footer';

function ClassicYoga() {
  return (
    <div className="font-sans">
        <Header />
      <ClassicHero />
      <ClassicBenefits />
      <Courses />
      <Products />
      <Appointment />
      <FeaturedProducts />
      <Testimonials />
      {/* <Benefits />
      <Courses />
      <Products />
      
    
     
      <Instagram />
      <Footer /> */}
    </div>
  );
}

export default ClassicYoga;