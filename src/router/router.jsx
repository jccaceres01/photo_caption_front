import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import App from '../App';
import Auth from '../components/security/Auth';
import Login from '../features/auths/Login';
import Register from '../features/auths/Register';
import Photos from '../features/photos/Photos';
import About from '../pages/About';
import Welcome from '../pages/Welcome';

/**
 * Photos components
 */
import PhotoIndex  from '../features/photos/PhotoIndex';
import PhotoDetails from '../features/photos/PhotoDetails';
import PhotosCreate from '../features/photos/PhotosCreate';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Welcome />
      },
      {
        path: '/photos',
        element: <Photos />,
        children: [
          {
            element: <PhotoIndex />,
            index: true
          },
          {
            path: 'create',
            element: <Auth><PhotosCreate /></Auth>
          },
          {
            path: ':photoId',
            element: <PhotoDetails />,
          }
        ]
      },
      {
        path: '/about',
        element: <About />
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
]);

export default router;