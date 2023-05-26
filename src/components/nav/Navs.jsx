import React from 'react';
import { Link } from 'react-router-dom';

const Navs = () => {
  return (
    <div className="">
      <ul className="flex justify-items-center gap-3 p-0 m-0">
        <li className="text-white hover:text-black"><Link to="/">Home</Link></li>
        <li className="text-white hover:text-black"><Link to="/photos">Photos</Link></li>
        <li className="text-white hover:text-black"><Link to="/about">About</Link></li>
      </ul>
    </div>
  );
}

export default Navs;