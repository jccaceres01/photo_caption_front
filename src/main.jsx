import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import { Provider } from 'react-redux';
import store from './app/store';
import 'flowbite';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}>
    </RouterProvider>
  </Provider>
);
