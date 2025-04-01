import { FaStar, FaRegStar, FaStarHalfAlt, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useModal } from "../../../../../features/context/ModalService";
import AddReviewModal from "../../../../modals/AddReviewModal";
import { truncateString } from "../../../../../helpers/helpers";
 
function Reviews() {
    const totalReviews = 17065;
  const ratings = [
    { stars: 5, count: 12957 },
    { stars: 4, count: 1476 },
    { stars: 3, count: 525 },
    { stars: 2, count: 341 },
    { stars: 1, count: 1766 },
  ];

  const totalRating = ratings.reduce((acc, { count }) => acc + count, 0);

  const { openModal } = useModal();

  const handleOpenReviewModal = () => {
    openModal(<AddReviewModal />, {
        modalSize: "max-w-2xl"
    });
  }

  return (
    <div className="w-full mt-6">
        <div className="ReviewSection">
            <div className="title">
                <h2 className="text-2xl font-bold">Customer Ratings & Reviews</h2>
            </div>

            <div className="mainReview flex flex-col gap-5">

                <div className="headerSection w-full flex flex-col sm:flex-row justify-between items-center gap-6">
                    {/* Left Section - Smaller */}
                    <div className="leftHeaderSection w-full sm:w-1/3 py-4 text-center sm:text-left">
                        <h2 className="ttt font-quicksand text-4xl font-extrabold">4.4 out of 5</h2>

                        <div className="flex-col flex gap-4 mb-4">
                            {/* Star Ratings */}
                            <div className="flex items-center justify-center sm:justify-start gap-2">
                                <div className="flex text-xs text-yellow-500">
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStarHalfAlt />
                                </div>
                                <span className="text-gray-600 text-sm font-lato">({totalReviews} reviews)</span>
                            </div>

                            {/* Write Review Button */}
                            <button onClick={() => handleOpenReviewModal()} className="bg-blue-600 text-white px-4 py-1 text-sm rounded-lg font-semibold hover:bg-blue-700">
                                Write a review
                            </button>
                        </div>
                    </div>

                    {/* Right Section - Larger */}
                    <div className="rightHeaderSection w-full sm:w-2/3 p-6 bg-white rounded-lg">
                        {/* Rating Breakdown */}
                        <div>
                            {ratings.map(({ stars, count }) => (
                                <div key={stars} className="flex items-center space-x-2 text-sm mb-2">
                                    <span className="w-12 text-gray-700 font-medium">{stars} stars</span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-500 h-2 rounded-full"
                                            style={{ width: `${(count / totalRating) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-gray-600">{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                {/* Reviews Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Single Review */}
                    <div className="border p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                            <p className="text-green-600 font-quicksand font-semibold">Verified Purchase</p>
                            <span className="text-sm text-gray-500 font-lato">10/31/2023</span>
                        </div>
                        <h3 className="text-lg font-bold font-quicksand mt-2">Great purchase!</h3>
                        <p className="text-gray-700 mt-2 font-lato text-sm">
                            Our big family room TV stopped working. We didn’t want to spend a lot. This was a great deal and the perfect size...
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                            <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500">
                            <FaThumbsUp size={13} /> 10
                            </button>
                            <button className="flex items-center gap-1 text-gray-600 hover:text-red-500">
                            <FaThumbsDown size={13} /> 0
                            </button>
                        </div>
                        <div className="border-t mt-3 pt-2 text-sm font-lato text-gray-600">
                            <strong>Customer Care:</strong> Hello Renee. Thanks for reviewing your new TV...
                        </div>
                    </div>

                    {/* Another Review */}
                    <div className="border p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                            <p className="text-green-600 font-semibold font-quicksand">Verified Purchase</p>
                            <span className="text-sm text-gray-500 font-lato">11/05/2023</span>
                        </div>
                        <h3 className="text-lg font-bold mt-2 font-quicksand">Excellent quality TV</h3>
                        <p className="text-gray-700 font-lato text-sm mt-2">
                            I originally had been using Roku devices for years (love their products) but decided to cut the cable cord...
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                            <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500">
                            <FaThumbsUp size={13} /> 7
                            </button>
                            <button className="flex items-center gap-1 text-gray-600 hover:text-red-500">
                            <FaThumbsDown size={13} /> 1
                            </button>
                        </div>
                        <div className="border-t mt-3 pt-2 text-sm font-lato text-gray-600">
                            <strong>Customer Care:</strong> Hi there, Connie. WOW, what kind words! Thank you...
                        </div>
                    </div>
                </div>

            </div>
            
        </div>
    </div>
  );
}

export default Reviews;