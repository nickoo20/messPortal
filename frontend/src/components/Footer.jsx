const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 xl:py-2 flex flex-col items-center xl:flex-row justify-center xl:justify-between">
      <p className="mb-2 xl:mb-0">&copy; 2024 Mess Portal - NIT Srinagar. All rights reserved.</p>
      <div className="mt-2 xl:mt-0 flex flex-wrap justify-center xl:justify-end">
        <a href="#contact" className="px-2 py-1 text-sm">Contact</a>
        <a href="#privacy" className="px-2 py-1 text-sm">Privacy Policy</a>
        <a href="#terms" className="px-2 py-1 text-sm">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
