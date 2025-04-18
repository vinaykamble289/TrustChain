import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="max-w-md mx-auto text-center py-12">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-gray-600 mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;