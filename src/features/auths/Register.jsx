import React, { useState } from 'react';
import { register, credentialErrorsSelector, loadCredentialsSelector, statusSelector } from './authsSlice';
import { useDispatch, useSelector} from 'react-redux';
import ValidationErrors from '../../components/notifications/ValidationErrors';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });

  const dispatch = useDispatch();
  const errors = useSelector(credentialErrorsSelector);
  const navigate = useNavigate();
  const loading = useSelector(loadCredentialsSelector);
  const status = useSelector(statusSelector);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      user.name.trim() !== '' &&
      user.email.trim() !== '' &&
      user.password.trim() !== '' &&
      user.password.length >= 3 &&
      user.password.length <= 15 &&
      user.password === user.confirm 
    ) {
      dispatch(register(user)).then(action => {
        if (action.type === 'auths/register/fulfilled') {
          e.target.reset();
          navigate('/login');
        }
      });
    } else {
      alert('Invalid inputs');
    }
    
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {/*  */}
      <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style={{backgroundImage: `url('https://images.unsplash.com/photo-1661107564492-365f8f0270d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80')`}}>
        <div className="rounded-xl bg-slate-700 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
            { (errors.length > 0) && <ValidationErrors errors={errors} /> }
            { status.code !== 0 && <p>{ status.msg }</p> }
              <Loading show={loading} size={24} />
              <img src={logo} width="110" alt="" />
              <h1 className="mb-2 text-2xl">PhCaption</h1>
              <span className="text-gray-300">Registering New User</span>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-4 text-lg">
                <input className="rounded-3xl border-none bg-rose-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="text" required name="name" placeholder="Full Name" onChange={(e) => handleChange(e) } />
              </div>

              <div className="mb-4 text-lg">
                <input className="rounded-3xl border-none bg-rose-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="email" required name="email" placeholder="Email" onChange={(e) => handleChange(e) } />
              </div>

              <div className="mb-4 text-lg">
                <input className="rounded-3xl border-none bg-rose-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="Password" required name="password" placeholder="Password" onChange={(e) => handleChange(e) } />
              </div>

              <div className="mb-4 text-lg">
                <input className="rounded-3xl border-none bg-rose-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="Password" required name="confirm" placeholder="Confirm Password" onChange={(e) => handleChange(e) } />
              </div>

              <div className="mt-8 flex justify-center text-lg text-black">
                <button type="submit" className="rounded-3xl bg-rose-500 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-rose-600">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/*  */}
    </>
  );
}

export default Register;