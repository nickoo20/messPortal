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
      <div className="flex flex-col justify-center flex-1 items-center">
        <div>
          <div className="flex flex-col gap-4 xl:flex-row flex-wrap xl:gap-0 justify-evenly items-center pt-4">
            <img
              className="h-[300px] md:h-[500px] sm:h-[400px] bg-fixed bg-cover bg-no-repeat object-cover object-center rounded-md border-blue-700 shadow-lg"
              src="https://www.scrolldroll.com/wp-content/uploads/2015/11/NIT-Srinagar-2.jpg"
              alt="background"
            />
            <div className="flex flex-col justify-center items-center gap-10 p-6 xl:p-0">
              <TypeAnimation
                sequence={[
                  "Well Hello There",
                  1000,
                  "Welcome To The Mess Portal",
                  1000,
                  "Let's Dive Into It!",
                  1200,
                ]}
                wrapper="span"
                speed={50}
                style={{
                  fontSize: "1.5em",
                  display: "inline-block",
                  color: "#615EFC",
                }}
                repeat={Infinity}
                className="text-2xl font-semibold"
              />
              <p className="sm:text-xl text-sm font-semibold font-inter border-b-4 border-blue-700 text-[#01204E] text-center">
                Your one-stop solution for all mess-related issues!
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Hero />
            <Features />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
