import React, { useState } from 'react';
import { register, credentialErrorsSelector } from './authsSlice';
import { useDispatch, useSelector} from 'react-redux';
import ValidationErrors from '../../components/notifications/ValidationErrors';
import { useNavigate } from 'react-router-dom';

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
      <h3>New User</h3>
      <ValidationErrors errors={errors} />
      <form onSubmit={(e) => handleSubmit(e) }>
        {/* Name */}
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" required placeholder="Name: " onChange={(e) => handleChange(e) } />

        {/* Email */}
        <label htmlFor="email">Email: </label>
        <input type="email" name="email"required placeholder="Email: " onChange={(e) => handleChange(e) } />
        
        {/* Password */}
        <label htmlFor="email">Password: </label>
        <input type="password" name="password"required placeholder="Password: " onChange={(e) => handleChange(e) } />
        
        {/* Confirm */}
        <label htmlFor="email">Confirm password: </label>
        <input type="password" name="confirm"required placeholder="Confirm Password: " onChange={(e) => handleChange(e) } />
        
        {/* Confirm */}
        <label htmlFor=""></label>
        <button type="reset">Clear</button>
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default Register;