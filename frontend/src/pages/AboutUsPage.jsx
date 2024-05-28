import { Link } from 'react-router-dom'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutUsPage = () => {
  return (
    <div className="flex flex-col bg-gradient-to-r from-gray-50 to-gray-200 min-h-screen">
    <Header />
    <main className="flex flex-col items-center p-6">
      <section className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-10 my-12">
        <div className='flex items-end justify-end font-poetsen'>
        <h1 className='text-[75px] text-gray-800'>A</h1>
        <h1 className="text-4xl text-gray-800 mb-7">bout Us</h1>
        </div>
        <p className="text-lg text-gray-700 mb-10 leading-relaxed">
          Welcome to the Mess Management Portal. Our mission is to provide a seamless and efficient way for students and staff to manage all mess-related activities and issues. From lodging complaints to viewing menus and bills, our platform aims to streamline the entire process and enhance the overall experience.
        </p>
        <h2 className="text-3xl font-poetsen text-gray-800 mb-6">Our Mission</h2>
        <p className="text-lg text-gray-700 mb-10 leading-relaxed font-roboto">
          Our mission is to simplify the mess management process and ensure that students and staff have access to timely and efficient services. We are committed to transparency, efficiency, and user satisfaction.
        </p>
        <h2 className="text-3xl font-poetsen text-gray-800 mb-6">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 font-roboto">
          <div className="flex flex-col items-center text-center bg-gray-50 p-8 rounded-lg shadow-md">
            <img src="https://via.placeholder.com/150" alt="Team Member" className="w-24 h-24 rounded-full mb-4 shadow-md" />
            <h3 className="text-xl font-semibold text-blue-700">Niyati Gupta</h3>
            <p className="text-gray-600">Full Stack Developer</p>
          </div>
          <div className="flex flex-col items-center text-center bg-gray-50 p-8 rounded-lg shadow-md">
            <img src="https://via.placeholder.com/150" alt="Team Member" className="w-24 h-24 rounded-full mb-4 shadow-md" />
            <h3 className="text-xl font-semibold text-green-700">Richa Shrivastava</h3>
            <p className="text-gray-600">Backend Developer</p>
          </div>
          <div className="flex flex-col items-center text-center bg-gray-50 p-8 rounded-lg shadow-md">
            <img src="https://via.placeholder.com/150" alt="Team Member" className="w-24 h-24 rounded-full mb-4 shadow-md" />
            <h3 className="text-xl font-semibold text-orange-700">Muskan Chaudhary</h3>
            <p className="text-gray-600">UI/UX Designer</p>
          </div>
          {/* Add more team members as needed */}
        </div>
        <h2 className="text-3xl font-poetsen text-gray-800 mt-12 mb-6">Contact Us</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          If you have any questions or need assistance, feel free to contact us at <a href="mailto:support@messportal.com" className="text-blue-600 hover:underline">support@messportal.com</a>.
        </p>
      </section>
    </main>
    <Footer />
  </div>
  );
};

export default AboutUsPage;
