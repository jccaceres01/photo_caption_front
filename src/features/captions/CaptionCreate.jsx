import React, { useState } from 'react';
import CaptionBigPreview from './CaptionBigPreview';
import { useDispatch, useSelector } from 'react-redux';
import { createCaptionThunk } from '../photos/photosSlice';
import { credentialsSelector } from '../auths/authsSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const CaptionCreate = ({photo, toggleAddCaption}) => {
  const [caption, setCaption] = useState({
    caption: '',
    style: 'style1'
  });

  const user = useSelector(credentialsSelector);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const styles = ['style1', 'style2', 'style3'];
  
  const handleChange = (event) => {
    setCaption({
      ...caption,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (caption.caption.trim() !== '') {

      const newCaption = {
        ...caption,
        user_id: user.id,
        photo_id: photo.id
      };

      dispatch(createCaptionThunk(newCaption)).then(action => {
        if (action.type === 'photos/createCaption/fulfilled') {
          toggleAddCaption();
        }
      })
    } else {
      alert('Need write a caption');
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center py-4 px-4 border-b">
        <h1 className="text-lg font-bold text-slate-700">Add Caption</h1>
        <button className="btn-primary" onClick={toggleAddCaption}><FontAwesomeIcon className="me-2" icon={icon({name: 'cancel'})} />Cancel</button>
      </div>
      
      <div className="flex-col gap-4 mx-12 py-4 mb-4">
        <form onSubmit={handleSubmit} className="flex-col gap-4 space-y-4 w-full border-b py-4 my-4">
          <div className="form-group">
            <label htmlFor="caption">Caption: </label>
            <textarea className="form-control" type="text" name="caption" placeholder="Caption" required value={caption.caption} onChange={e => handleChange(e) } />
          </div>
          
          <div className="form-group">
            <label htmlFor="style">Caption Style: </label>
            <select className="form-control" name="style" id="style" placeholder="style" value={caption.style} onChange={e => handleChange(e) }>
              {styles.map((st, idx) => <option value={st} key={idx}>{ st }</option>)}
            </select>
          </div>
          
          <button className="btn-primary" type="submit">
          <FontAwesomeIcon className="me-2" icon={icon({name: 'add'})} />
            Add Caption
          </button>
        </form>
        <h1>Caption Preview</h1>
        <CaptionBigPreview photo={photo} caption={caption.caption} style={caption.style} />
      </div>
    </div>
  );
}

export default CaptionCreate;