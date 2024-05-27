import React from 'react';

const Hero = () => {
  return (
    <section id="features" className="p-10 text-center text-white">
      <h2 className="text-4xl font-bold mb-8 text-gray-800">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white text-blue-800 border rounded-lg shadow-lg transform hover:scale-105 transition-transform">
          <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m-3-3V8m0 8v4" />
            </svg>
            Create/View Complaints
          </h3>
          <p className="text-gray-600">Easily create and track complaints related to the mess facilities.</p>
        </div>
        <div className="p-6 bg-white text-blue-800 border rounded-lg shadow-lg transform hover:scale-105 transition-transform">
          <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18" />
            </svg>
            Monthly Bills
          </h3>
          <p className="text-gray-600">View and manage your monthly mess bills with ease.</p>
        </div>
        <div className="p-6 bg-white text-blue-800 border rounded-lg shadow-lg transform hover:scale-105 transition-transform">
          <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Menu
          </h3>
          <p className="text-gray-600">Check out the daily menu and plan your meals accordingly.</p>
        </div>
        <div className="p-6 bg-white text-blue-800 border rounded-lg shadow-lg transform hover:scale-105 transition-transform">
          <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-6l-4 4M15 7v6l4-4" />
            </svg>
            Warden Functions
          </h3>
          <p className="text-gray-600">Wardens can resolve or escalate complaints and mark leaves.</p>
        </div>
        <div className="p-6 bg-white text-blue-800 border rounded-lg shadow-lg transform hover:scale-105 transition-transform">
          <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m-3-3V8m0 8v4" />
            </svg>
            Accountant Functions
          </h3>
          <p className="text-gray-600">Accountants can add and manage monthly bills.</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
