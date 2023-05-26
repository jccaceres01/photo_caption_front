import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auths/authsSlice';
import Navs from './Navs';
import logo from '../../assets/logo.png';

const Navbar = ({ credentials }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full m-0 p-0 bg-rose-500 mb-10">
      <div className="flex justify-between px-16 py-0 items-center">
        <Link to="/" className="flex justify-center items-center">
          <img className="m-0 p-0 w-12 h-12" src={logo} alt="" />
          <span className="text-white font-bold text-2xl">PhCaptions</span>
        </Link>
        
        <Navs />
        {
          credentials
            ? <span className="flex gap-3 m-0 p-0 h-fit text-white">{ credentials.email } <a className="m-0 px-4 rounded-md bg-white text-black border-2 hover:border-rose-400 hover:text-red-400" href="#" onClick={() => dispatch(logout()) }>LogOut</a></span>
            : <span className="flex gap-3 m-0 p-0 h-fit text-white hover:text-black"><Link to="/login">Login</Link></span>
        }
      </div>
    </div>
  );
}

export default Navbar;