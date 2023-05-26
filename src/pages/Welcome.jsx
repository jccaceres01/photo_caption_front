import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { getLastestPhotosThunk, lastestPhotosSelector, loadingPhotosSelector } from '../features/photos/photosSlice';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

const Welcome = () => {

  const dispatch = useDispatch();
  const lastestPhotos = useSelector(lastestPhotosSelector);
  const loading = useSelector(loadingPhotosSelector);

  useEffect(() => {
    dispatch(getLastestPhotosThunk());
  }, []);

  return (
    <div className="rounded-xl border p-5 shadow-md w-min-fit bg-white">
      <div className="flex w-full items-center justify-between border-b pb-3">
        <div className="flex items-center space-x-3">
          <FontAwesomeIcon className="h-7 w-7 p-2 rounded-full bg-slate-400 text-white" icon={icon({name: 'house', style: 'solid'})} />
          <div className="text-lg font-bold text-slate-700">Home</div>
        </div>
        <div className="flex items-center space-x-8">
          <Loading size={24} show={loading} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-4 mb-6">
        <h1 className="text-3xl font-bold mb-12">Lastest Photos</h1>
        <div className="flex flex-nowrap gap-11 w-5/6 rounded-sm shadow-lg ">
          {
            lastestPhotos.map((photo, idx) => {
              return (
                <Link className="border-2 border-rose-500 shrink transition duration-500 ease-in-out hover:shrink-0 max-w-lg w-full rounded-lg " style={{height: 600}} to={`/photos/${photo.id}`} key={idx}>
                  <img className="w-full h-full rounded-lg " src={photo.image_url} alt={photo.filename} />
                </Link>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Welcome;