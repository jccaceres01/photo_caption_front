import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auths/authsSlice';
import Navs from './Navs';
import logo from '../../assets/logo.png';

const Navbar = ({ credentials }) => {
  const dispatch = useDispatch();

  return (
    <nav className="bg-rose-500 m-0 p-0 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" />
          <span className="self-center text-white font-bold text-2xl whitespace-nowra">PhCaptions</span>
        </Link>
      <div className="flex md:order-2">
          {
            credentials
              ? <span className="flex gap-3 m-0 p-0 h-fit text-white">{ credentials.email } <a className="m-0 px-4 rounded-md bg-white text-black border-2 hover:border-rose-400 hover:text-red-400" href="#" onClick={() => dispatch(logout()) }>LogOut</a></span>
              : <span className="flex gap-3 m-0 p-0 h-fit text-white hover:text-black"><Link to="/login">Login</Link></span>
          }
          <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
      </div>
      <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <Navs />
      </div>
      </div>
    </nav>
  );
}

export default Navbar;