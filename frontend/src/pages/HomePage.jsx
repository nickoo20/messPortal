import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TypeAnimation } from 'react-type-animation';
import Hero from '../components/Hero';
import Features from '../components/Features';

const HomePage = () => {
  return (
    <div className="flex flex-col bg-gradient-to-r from-gray-50 to-gray-200 min-h-screen">
      <Header />
      <div className="relative flex flex-1">
        <img
          className="h-full w-full bg-center bg-cover bg-no-repeat"
          src="https://www.scrolldroll.com/wp-content/uploads/2015/11/NIT-Srinagar-2.jpg"
          alt="background"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Black overlay with opacity */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-10">
          <h1 className="text-3xl font-jakarta shadow-md sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white -mt-36 mb-20">
            Office of the Mess Chairman Committee
          </h1>
          <div className="flex flex-col items-center gap-4 mb-20">
            <TypeAnimation
              sequence={[
                "Well Hello There",
                1000,
                "Welcome To The Mess Complaint Portal",
                1000,
                "Let's Dive In!",
                1200,
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: "2em", display: "inline-block" }}
              repeat={Infinity}
              className="mb-4 font-roboto text-green-300 shadow-lg sm:text-3xl md:text-4xl lg:text-5xl"
            />
            <p className="sm:text-xl text-md mt-10 border bg-green-600 font-bold font-roboto px-4 py-2 text-white">
              Your one-stop solution for all mess-related issues!
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-10 px-6">
        <Features />
        <Hero />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
