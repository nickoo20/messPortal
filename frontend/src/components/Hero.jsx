import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Hero = () => {
  return (
    <section id="features" className="p-10 text-center text-white max-w-3xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">Features</h2>
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={3000}
        transitionTime={500}
        className="text-center"
      >
        <div className="p-6 bg-white text-blue-800 border rounded-lg">
          <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center flex-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m-3-3V8m0 8v4" />
            </svg>
            Create/View Complaints
          </h3>
          <p className="text-gray-600">Easily create and track complaints related to the mess facilities.</p>
        </div>
        <div className="p-6 bg-white text-blue-800 border rounded-lg">
          <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18" />
            </svg>
            Monthly Bills
          </h3>
          <p className="text-gray-600">View and manage your monthly mess bills with ease.</p>
        </div>
        <div className="p-6 bg-white text-blue-800 border rounded-lg">
          <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Menu
          </h3>
          <p className="text-gray-600">Check out the daily menu and plan your meals accordingly.</p>
        </div>
        <div className="p-6 bg-white text-blue-800 border rounded-lg">
          <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-6l-4 4M15 7v6l4-4" />
            </svg>
            Warden Functions
          </h3>
          <p className="text-gray-600">Wardens can resolve or escalate complaints and mark leaves.</p>
        </div>
        <div className="p-6 bg-white text-blue-800 border rounded-lg">
          <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m-3-3V8m0 8v4" />
            </svg>
            Accountant Functions
          </h3>
          <p className="text-gray-600">Accountants can add and manage monthly bills.</p>
        </div>
      </Carousel>
    </section>
  );
}

export default Hero;
