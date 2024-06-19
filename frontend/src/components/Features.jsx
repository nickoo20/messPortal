import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserGraduate, FaUserTie, FaUserCog } from 'react-icons/fa';

const Features = () => {
  return (
    <section id="how-it-works" className="mt-20 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-center">
        <div className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform">
          <Link to={'/register-student'} className="flex flex-col items-center">
            <FaUserGraduate className="text-5xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">For Students</h3>
          </Link>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform">
          <Link to={'/register-admin'} className="flex flex-col items-center">
            <FaUserTie className="text-5xl text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">For Wardens</h3>

          </Link>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform">
          <Link to={'/register-admin'} className="flex flex-col items-center">
            <FaUserCog className="text-5xl text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">For Accountants</h3>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Features;
