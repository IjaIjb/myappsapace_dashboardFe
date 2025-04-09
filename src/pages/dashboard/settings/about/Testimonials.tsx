import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserApis } from "../../../../apis/userApi/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Testimonial {
  customer: string;
  feedback: string;
  rating: number;
}

// Section type interface
interface AccordionSection {
  id: string;
  title: string;
  isOpen: boolean;
}

const TestimonialsSettings = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );

  const sectionName = "testimonials";
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<Testimonial[]>([]);

  // New testimonial form state
  const [newTestimonial, setNewTestimonial] = useState<Testimonial>({
    customer: '',
    feedback: '',
    rating: 5
  });

  // Editing state
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Accordion state - all sections closed initially
  const [sections, setSections] = useState<AccordionSection[]>([
    { id: "add", title: "Add New Testimonial", isOpen: false },
    { id: "current", title: "Current Testimonials", isOpen: false }
  ]);

  // Toggle section visibility
  const toggleSection = (sectionId: string) => {
    setSections(prevSections => 
      prevSections.map(section => 
        section.id === sectionId 
          ? { ...section, isOpen: !section.isOpen } 
          : section
      )
    );
  };

  // Get section open state
  const isSectionOpen = (sectionId: string): boolean => {
    return sections.find(section => section.id === sectionId)?.isOpen || false;
  };

  // Fetch settings from the API
  useEffect(() => {
    if (!selectedStore) return;

    setLoading(true);
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
        if (response?.data) {
          const settings = response.data?.[sectionName].aboutSettings;
          setReviews(settings.reviews || [
            {
              customer: 'Emily Johnson',
              feedback: 'Great experience! Fast shipping and amazing products.',
              rating: 5
            },
            {
              customer: 'Michael Brown',
              feedback: 'I love the quality of the products. Will buy again!',
              rating: 4.5
            }
          ]);
        }
      })
      .catch(() => {
        // Silent error handling
      })
      .finally(() => setLoading(false));
  }, [selectedStore]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Testimonial
  ) => {
    const value = field === 'rating' 
      ? parseFloat(e.target.value) 
      : e.target.value;
    
    setNewTestimonial({
      ...newTestimonial,
      [field]: value
    });
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    field: keyof Testimonial
  ) => {
    const updatedReviews = [...reviews];
    const value = field === 'rating' 
      ? parseFloat(e.target.value) 
      : e.target.value;
    
    updatedReviews[index] = {
      ...updatedReviews[index],
      [field]: value
    };
    
    setReviews(updatedReviews);
  };

  const handleAddTestimonial = () => {
    if (!newTestimonial.customer.trim()) {
      toast.error("Customer name is required");
      return;
    }
    
    if (!newTestimonial.feedback.trim()) {
      toast.error("Feedback is required");
      return;
    }
    
    if (newTestimonial.rating < 1 || newTestimonial.rating > 5) {
      toast.error("Rating must be between 1 and 5");
      return;
    }
    
    setReviews([...reviews, newTestimonial]);
    setNewTestimonial({
      customer: '',
      feedback: '',
      rating: 5
    });
    
    // Open the current testimonials section after adding a new one
    setSections(prev => prev.map(section => 
      section.id === "current" 
        ? { ...section, isOpen: true } 
        : section
    ));
    
    toast.success("Testimonial added!");
  };

  const handleRemoveTestimonial = (index: number) => {
    const updatedReviews = [...reviews];
    updatedReviews.splice(index, 1);
    setReviews(updatedReviews);
    
    if (editIndex === index) {
      setEditIndex(null);
    }
    
    toast.info("Testimonial removed");
  };

  const handleEditToggle = (index: number) => {
    setEditIndex(editIndex === index ? null : index);
  };

  const handleMoveTestimonial = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === reviews.length - 1)
    ) {
      return;
    }

    const updatedReviews = [...reviews];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap elements
    [updatedReviews[index], updatedReviews[newIndex]] = 
    [updatedReviews[newIndex], updatedReviews[index]];
    
    setReviews(updatedReviews);
    
    // Update edit index if needed
    if (editIndex === index) {
      setEditIndex(newIndex);
    } else if (editIndex === newIndex) {
      setEditIndex(index);
    }
  };

  const handleSubmit = async () => {
    if (reviews.length === 0) {
      toast.error("Please add at least one testimonial");
      return;
    }

    setLoading(true);
    try {
      const response = await UserApis.updateSettings(
        selectedStore,
        sectionName,
        {
          aboutSettings: {
            reviews: reviews,
          },
        }
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success("Testimonials updated successfully!");
      }
    } catch (error) {
      toast.error("Error updating testimonials. Please try again.");
    }
    setLoading(false);
  };

  // Helper function to render star rating
  const renderStarRating = (rating: number) => {
    return "★".repeat(Math.floor(rating)) + (rating % 1 ? "½" : "") + "☆".repeat(Math.floor(5 - rating));
  };

  // Section header component
  const SectionHeader = ({ id, title }: { id: string; title: string }) => (
    <div 
      className="flex justify-between items-center py-3 px-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
      onClick={() => toggleSection(id)}
    >
      <h5 className="font-semibold">{title}</h5>
      <div className="text-gray-600">
        {isSectionOpen(id) ? <FaChevronUp /> : <FaChevronDown />}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-[14px] p-6 shadow-lg">
      <h4 className="text-[#000000] text-[18px] font-bold pb-6">
        Testimonials Settings
      </h4>

      <div className="space-y-5">
        <p className="text-sm text-gray-600 mb-4">
          Showcase customer testimonials to build trust and credibility with your visitors.
        </p>

        {/* Add new testimonial */}
        <div className="border rounded-lg overflow-hidden">
          <SectionHeader id="add" title="Add New Testimonial" />
          
          {isSectionOpen("add") && (
            <div className="p-4 space-y-4 transition-all duration-300 ease-in-out bg-gray-50">
              <div>
                <label className="block text-sm font-medium mb-1">Customer Name:</label>
                <input
                  type="text"
                  value={newTestimonial.customer}
                  onChange={(e) => handleInputChange(e, 'customer')}
                  className="w-full h-10 border rounded-md p-2"
                  placeholder="Enter customer name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Feedback:</label>
                <textarea
                  value={newTestimonial.feedback}
                  onChange={(e) => handleInputChange(e, 'feedback')}
                  className="w-full h-20 border rounded-md p-2"
                  placeholder="Enter customer feedback"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Rating: {renderStarRating(newTestimonial.rating)}
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={newTestimonial.rating}
                  onChange={(e) => handleInputChange(e, 'rating')}
                  className="w-full h-6"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                </div>
              </div>
              
              <button
                type="button"
                onClick={handleAddTestimonial}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Add Testimonial
              </button>
            </div>
          )}
        </div>

        {/* List of testimonials */}
        <div className="border rounded-lg overflow-hidden">
          <SectionHeader id="current" title="Current Testimonials" />
          
          {isSectionOpen("current") && (
            <div className="p-4 space-y-4 transition-all duration-300 ease-in-out">
              {reviews.length === 0 ? (
                <p className="text-gray-500 italic">No testimonials added yet.</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review, index) => (
                    <div key={index} className="border rounded-md overflow-hidden">
                      <div className="bg-gray-100 p-3 flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="font-medium mr-2">{review.customer}</span>
                          <span className="text-yellow-500">{renderStarRating(review.rating)}</span>
                        </div>
                        <div className="flex space-x-1">
                          <button
                            type="button"
                            onClick={() => handleEditToggle(index)}
                            className="text-blue-500 hover:bg-blue-50 px-2 py-1 rounded"
                          >
                            {editIndex === index ? "Done" : "Edit"}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveTestimonial(index, 'up')}
                            disabled={index === 0}
                            className={`px-2 py-1 rounded ${index === 0 ? 'text-gray-300' : 'text-blue-500 hover:bg-blue-50'}`}
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveTestimonial(index, 'down')}
                            disabled={index === reviews.length - 1}
                            className={`px-2 py-1 rounded ${index === reviews.length - 1 ? 'text-gray-300' : 'text-blue-500 hover:bg-blue-50'}`}
                          >
                            ↓
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveTestimonial(index)}
                            className="text-red-500 hover:bg-red-50 px-2 py-1 rounded"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                      
                      {editIndex === index ? (
                        <div className="p-3 space-y-3 bg-blue-50">
                          <div>
                            <label className="block text-sm font-medium mb-1">Customer Name:</label>
                            <input
                              type="text"
                              value={review.customer}
                              onChange={(e) => handleEditInputChange(e, index, 'customer')}
                              className="w-full h-10 border rounded-md p-2"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Feedback:</label>
                            <textarea
                              value={review.feedback}
                              onChange={(e) => handleEditInputChange(e, index, 'feedback')}
                              className="w-full h-20 border rounded-md p-2"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Rating: {renderStarRating(review.rating)}
                            </label>
                            <input
                              type="range"
                              min="1"
                              max="5"
                              step="0.5"
                              value={review.rating}
                              onChange={(e) => handleEditInputChange(e, index, 'rating')}
                              className="w-full h-6"
                            />
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>1</span>
                              <span>2</span>
                              <span>3</span>
                              <span>4</span>
                              <span>5</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-3">
                          <p className="text-gray-700">{review.feedback}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`text-white py-2 px-6 rounded-md mt-6 w-full ${
            loading ? "bg-green-400" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Saving..." : "Save Testimonials"}
        </button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default TestimonialsSettings;