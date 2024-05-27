import { Link } from "react-router-dom";
import { NitPhoto } from "../assets/NitSrinagar_photo";

const Header = () => {
  return(
    <div>
         <header className='bg-[#F6F5F2] shadow-md pt-2'>
            <div className='flex items-center justify-between p-2 sm:pl-12 gap-3'>
            <Link to='/' className='flex items-center'>
               <NitPhoto/>
                    <h1 className='text-sm xl:text-xl flex border-none rounded-full p-2 tracking-wider font-montserrat'>MESS PORTAL - NIT SRINAGAR
                    </h1>
            </Link>
            <div className="flex justify-end">
            <div className='flex justify-end items-center'>
                <ul className='flex items-center text-[#003C43] font-semibold md:ml-20 '>
                    <Link to='/'><li className='hidden md:inline  hover:transition duration-900 rounded-xl bg-gray-100 px-9 py-3  hover:bg-gray-300'>Home</li></Link>
                    <Link to='/about-us'><li className='hidden md:inline hover:transition duration-900 rounded-xl bg-gray-100 px-9 py-3  hover:bg-gray-300'>About us</li></Link>
                    {/* <Link to='/profile'> */}
                        {/* {
                            currentUser ? (
                                <img className='rounded-full h-7 c-7 object-cover' src={currentUser.avatar} alt='profile' />
                            ) : (
                                <li className='hover:bg-[#FEFDED] rounded-full p-2'>Sign</li>
                            )} */}
                    {/* </Link> */}
                </ul>
                <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn m-1">Register/Login</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link to={'/register'}>Student</Link></li>
                    <li><a>Warden</a></li>
                    <li><a>Accountant</a></li>
                </ul>
                </div>
                </div>
            </div>
            </div>
        </header>
    </div>
  )
}

export default Header;