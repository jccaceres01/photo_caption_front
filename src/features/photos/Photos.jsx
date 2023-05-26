import React, { useEffect } from 'react';
import PhotoIndex from './PhotoIndex';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPhotosThunk, allPhotosSelector, loadingPhotosSelector } from './photosSlice';
import { Outlet, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import Loading from '../../components/Loading';

const Photos = () => {

  const allPhotos = useSelector(allPhotosSelector);
  const dispatch = useDispatch();
  const loading = useSelector(loadingPhotosSelector);

  useEffect(() => {
    dispatch(getAllPhotosThunk());
  }, []);

  return (
    <>
      <div className="rounded-xl border p-5 shadow-md w-min-fit bg-white">
        <div className="flex w-full items-center justify-between border-b pb-3">
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon className="h-7 w-7 p-2 rounded-full bg-slate-400 text-white" icon={icon({name: 'camera'})} />
            <div className="text-lg font-bold text-slate-700">Photos</div>
          </div>
          <div className="flex items-center space-x-8">
            <Link to="/photos" className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">All Photos</Link>
            <Link to="/photos/create" className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">New Photo</Link>
            <Loading show={loading} size={24} />
          </div>
        </div>

        <div className="mt-4 mb-6">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Photos;