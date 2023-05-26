import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { login, loadCredentialsSelector, credentialErrorsSelector, statusSelector } from './authsSlice';
import { useNavigate, Link } from 'react-router-dom';
import ValidationErrors from '../../components/notifications/ValidationErrors';

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

  const showLoading = () => {
    if (loading) {
      return (
        <>
          <p>loading...</p>
        </>
      )
    }
  }

  return (
    <>
      <div className="container mx-auto my-8 ">
        <h1 className="text-3xl">
          Login
          { showLoading() }
        </h1>
      </div>
      { (errors.length > 0) && <ValidationErrors errors={errors} /> }
      { status.code !== 0 && <p>{ status.msg }</p> }
      <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col gap-3">
            <label htmlFor="email">Email</label>
            <input type="email" className="border border-2 border-black rounded p-2" required placeholder="Email" name="email" onChange={(e) => handleChange(e) } />
            <label htmlFor="password">Password</label>
            <input type="password" className="border border-2 border-black rounded p-2" required name="password" placeholder="Password" onChange={(e) => handleChange(e) } />
            <button type="submit" className="bg-blue-200 rounded-lg p-3 text-white hover:bg-blue-400">Login</button>
          </div>
      </form>
      <Link to="/register">Register</Link>
    </>
  );
}

export default Login;