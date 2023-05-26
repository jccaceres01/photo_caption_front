import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { login, loadCredentialsSelector, credentialErrorsSelector, statusSelector } from './authsSlice';
import { useNavigate, Link } from 'react-router-dom';
import ValidationErrors from '../../components/notifications/ValidationErrors';
import logo from '../../assets/logo.png';
import Loading from '../../components/Loading';

const Login = () => {

  const [credentials, setCredentials ] = useState({email: '', password: ''});
  const dispatch = useDispatch();
  const loading = useSelector(loadCredentialsSelector);
  const status = useSelector(statusSelector);
  const errors = useSelector(credentialErrorsSelector);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.email.trim() !== '' && credentials.password.trim() !== '' ) {
      dispatch(login(credentials)).then((res) => {
        if (res.type === 'auths/login/fulfilled') navigate('/');
      });
    } else {
      alert('Email and Password are required');
    }
  };

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style={{backgroundImage: `url('https://images.unsplash.com/photo-1661107564492-365f8f0270d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80')`}}>
      <div className="rounded-xl bg-slate-700 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
          { (errors.length > 0) && <ValidationErrors errors={errors} /> }
          { status.code !== 0 && <p>{ status.msg }</p> }
            <Loading show={loading} size={24} />
            <img src={logo} width="110" alt="" />
            <h1 className="mb-2 text-2xl">PhCaption</h1>
            <span className="text-gray-300">Enter Login Details</span>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-4 text-lg">
              <input className="rounded-3xl border-none bg-rose-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="email" required name="email" placeholder="Email" onChange={(e) => handleChange(e) } />
            </div>

            <div className="mb-4 text-lg">
              <input className="rounded-3xl border-none bg-rose-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="Password" required name="password" placeholder="Password" onChange={(e) => handleChange(e) } />
            </div>
            <div className="mt-8 flex justify-center text-lg text-black">
              <button type="submit" className="rounded-3xl bg-rose-500 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-rose-600">Login</button>
            </div>
          </form>
          <div className="mb-8 flex flex-col items-center">
            <Link className="underline my-2" to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;