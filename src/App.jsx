import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/nav/Navbar';
import { useSelector } from 'react-redux';
import { credentialsSelector } from './features/auths/authsSlice';

const App = () => {
  const credentials = useSelector(credentialsSelector);

  return (
    <div>
      <header>
        <Navbar credentials={credentials} />
      </header>

      <main className="container mx-auto px-7">
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default App;
