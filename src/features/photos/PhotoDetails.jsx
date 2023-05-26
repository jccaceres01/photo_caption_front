import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getPhotoByIdThunk, selectedPhotoSelector, loadingPhotosSelector } from './photosSlice';
import { credentialsSelector } from '../auths/authsSlice';
import { useParams } from 'react-router-dom';
import CaptionsList from '../captions/CaptionsList';
import CaptionCreate from '../captions/CaptionCreate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';

const PhotoDetails = () => {
  
  const [addCaption, setAddCaption] = useState(false);
  const { photoId } = useParams();
  const dispatch = useDispatch();
  const photo = useSelector(selectedPhotoSelector);
  const loading = useSelector(loadingPhotosSelector);
  const user = useSelector(credentialsSelector);

  useEffect(() => {
    if (photoId) dispatch(getPhotoByIdThunk(photoId));
  }, [photoId]);

  const renderPhotoInfo = () => {
    if (loading) return <p>Loading...</p>;

    return (
      <div>
        <img className="rounded-lg rounded-b-none w-min-fit w-full mb-10" src={photo.image_url} alt={photo.filename} />
        <div className="flex justify-between px-4 border-b mx-4 mb-4">
          <span className="text-3xl"><strong><FontAwesomeIcon icon={icon({name: 'user'})} /></strong> {photo.User?.name}</span>
          <span className="text-3xl"><strong><FontAwesomeIcon icon={icon({name: 'envelope'})} /></strong> {photo.User?.email}</span>
        </div>
      </div>
    );
  };

  const toggleAddCaption = () => {
    setAddCaption(!addCaption);
  }

  return (
    <div className="rounded-xl border shadow-md w-min-fit bg-white">
      {
        (!addCaption)
          ?
            <div>
              { renderPhotoInfo() }
              
              <div className="flex justify-between px-4 border-b mx-4 mb-5 pb-2 items-center">
                <strong className="text-3xl">Captions: </strong>
                {
                  (user)
                    ?
                      <button className="btn-primary" type="button" onClick={toggleAddCaption}>
                        <FontAwesomeIcon className="me-2" icon={icon({name: 'circle-plus'})} />
                        Add Caption
                      </button>
                    :
                      <Link className="btn-primary" to="/login">
                        <FontAwesomeIcon className="me-2" icon={icon({name: 'sign-in'})} />
                        Login to add Caption
                      </Link>
                }
                
              </div>
              <CaptionsList photo={photo} />
              
            </div>
          :
            <div>
              <CaptionCreate photo={photo} toggleAddCaption={toggleAddCaption} />
            </div>
      }
    </div>
  );
}

export default PhotoDetails;