import React from 'react';

const Testimonials = () => {
  const testimonial = {
    name: 'Sarah L.',
    image: '/images/testimonial-woman.jpg',
    placeholder: 'https://via.placeholder.com/100x100?text=Sarah',
    quote: 'The classes are super personalized and the teachers make sure to adjust poses to your level. I\'ve seen incredible improvement in my back pain and flexibility. Highly recommend!',
    rating: 5
  };

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-light text-gray-700 mb-2">
          HEAR THE STUDENTS
          <span className="inline-block ml-2">
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.633 10.0001C6.633 8.15008 8.1501 6.6333 10 6.6333C11.8499 6.6333 13.367 8.15008 13.367 10.0001C13.367 11.8499 11.8499 13.3667 10 13.3667C8.1501 13.3667 6.633 11.8499 6.633 10.0001Z" />
            </svg>
          </span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm mb-12">
          Learn what clients have to say about their experience with our yoga studio, teachers, and the
          changes they've seen in their practice and life.
        </p>

        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-white shadow-md">
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = testimonial.placeholder;
                }}
              />
            </div>
            <h3 className="text-gray-800 font-medium">{testimonial.name}</h3>
            <div className="flex text-yellow-400 my-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 italic max-w-xl mt-4">
              "{testimonial.quote}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;