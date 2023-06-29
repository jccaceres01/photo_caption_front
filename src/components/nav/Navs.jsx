import React from 'react';
import { Link } from 'react-router-dom';

const Navs = () => {
  return (
    <div className="">
      <ul className="flex gap-3 m-0 flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
        <li className="text-white hover:text-black"><Link to="/">Home</Link></li>
        <li className="text-white hover:text-black"><Link to="/photos">Photos</Link></li>
        <li className="text-white hover:text-black"><Link to="/about">About</Link></li>
      </ul>
      {/* 
        <li>
          <a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
        </li>
      */}
    </div>
  );
}

export default Navs;