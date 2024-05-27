const Footer = () => {
  return(
    <footer className="bg-gray-800 text-white flex flex-col items-center xl:flex-row p-4 justify-around ">
    <p>&copy; 2024 Mess Portal - NIT Srinagar. All rights reserved.</p>
    <div className="mt-2">
      <a href="#contact" className="px-2">Contact</a>
      <a href="#privacy" className="px-2">Privacy Policy</a>
      <a href="#terms" className="px-2">Terms of Service</a>
    </div>
  </footer>
  )
}

export default Footer;