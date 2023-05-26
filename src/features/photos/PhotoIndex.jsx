import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { allPhotosSelector, getAllPhotosThunk } from './photosSlice';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const PhotoIndex = () => {

  const dispatch = useDispatch();
  const photos = useSelector(allPhotosSelector);

  useEffect(() => {
    dispatch(getAllPhotosThunk());
  }, []);
  
  if (photos) {
    return (
      <div className="grid grid-cols-4 gap-6">
        { photos.map((ph, idx) => {
          return <div key={idx}>
            <Link to={`/photos/${ ph.id }`} >
              <div className="">
                <div className="bg-rose-500 shadow-md rounded-lg max-w-fit dark:bg-rose-500 dark:border-gray-700">
                  <img className="rounded-t-lg mb-2" src={ ph.image_url } alt={ ph.filename } />
                    <div className="px-3 pb-5">
                      <strong className="inline text-gray-900 font-semibold text-lg tracking-tight dark:text-white">Author: </strong>
                      <span className="text-white">{ph.User.name}</span>
                      <div className="flex items-center justify-between">
                        <span className="text-3 font-bold text-gray-900 dark:text-white">
                        <FontAwesomeIcon className="h-4 w-4 mx-1 text-white" icon={icon({name: 'comment'})} />
                          { ph.Captions?.length || 0}
                        </span>
                      </div>
                    </div>
                </div>
              </div>
            </Link>
          </div>
        })}
      </div>
    );
  } else {
    return <h3>No photos found</h3>
  }
}

export default PhotoIndex;