import React from 'react';
import { clearErrors } from '../../features/auths/authsSlice';
import { useDispatch } from 'react-redux';

const ValidationErrors = ({ errors }) => {
  const dispatch = useDispatch();

  if (errors.length > 0) {
    return (
      <div className="message">
        <button onClick={() => dispatch(clearErrors())}>X</button>
        <h4>Validation Errors: </h4>
        { errors.map((err, index) => <p style={{color: 'crimson'}} key={index}>{`${err.path}: ${err.msg}`}</p>)}
      </div>
    );
  }
}

export default ValidationErrors;