import axios from 'axios';

const Axios = axios.create({
  baseURL: import.meta.env.VITE_APP_API
});

Axios.defaults.headers.common['_token']
  = `${localStorage.getItem('token')}` || null

Axios.interceptors.request.use(config => {
  config.headers['_token']
    = `${localStorage.getItem('token')}` || null

  return config;
});

Axios.interceptors.response.use(res => {
  return res;
}, (err) => {
  if (err.response.status === 401 && window.location.pathname !== '/login') {
    window.location = '/login';
    console.log('access denied');
  }

  return Promise.reject(err);
});

export default Axios;
