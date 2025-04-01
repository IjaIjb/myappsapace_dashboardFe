import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-900 to-blue-600 text-white text-center">
      <h1 className="text-9xl font-extrabold">404</h1>
      <p className="text-2xl mt-4">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md transition duration-300 hover:bg-gray-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Error404;
