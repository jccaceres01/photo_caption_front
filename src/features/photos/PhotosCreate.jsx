import React from 'react';
import Axios from '../../utils/fetch';
import { useSelector, useDispatch } from 'react-redux';
import { credentialsSelector } from '../auths/authsSlice';
import { createPhotoThunk } from './photosSlice';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const PhotosCreate = () => {
  
  const user = useSelector(credentialsSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    formData.append('user_id', user.id);

    dispatch(createPhotoThunk(formData)).then(res => {
      console.log(res);
      if (res.type === 'photos/createPhoto/fulfilled') {
        navigate(`/photos/${res.payload.id}`);
      }
    });
  }

  return (
    <>
      <div className="flex items-center mb-5">
        <FontAwesomeIcon className="inline h-7 w-7 p-2 rounded-full bg-rose-500 text-white" icon={icon({name: 'square-plus'})} />
        <h1 className=" inline text-3xl text-rose-500">Add new photo</h1>
      </div>
      
      <form onSubmit={(e) => handleSubmit(e) } className="m-4 flex">
        <input className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" type="file" name="photo" id="photo" required placeholder="Select Picture" accept="images/*"  />
        <button type="submit" className="px-8 rounded-r-lg bg-rose-500  text-gray-800 font-bold p-4 uppercase border-rose-600 border-t border-b border-r">Place Photo</button>
      </form>
    </>
  )
}

export default PhotosCreate;