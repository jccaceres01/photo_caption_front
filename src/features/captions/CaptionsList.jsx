import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCaptionsByPhoId, captionsSelector } from './captionsSlice';
import Votes from '../votes/Votes';
import { Link } from 'react-router-dom';

const CaptionsList = ({photo}) => {

  const dispatch = useDispatch();
  const photoCaptions = useSelector(captionsSelector);
  const loading = useSelector(state => state.captions.loading);

  useEffect(() => {
    if (Object.keys(photo).length > 0) {
      dispatch(getCaptionsByPhoId(photo.id));
    }
  }, [photo]);

  const renderCaptions = () => {
    if (loading) return <p>Loading...</p>
    if (photoCaptions.length > 0) {
      return (
        <div className="grid gap-3 grid-cols-2">
          { photoCaptions.map((cap, idx) => {
            return <div key={idx} className="mx-4">
              <div className="relative">
                <img className="rounded-lg my-3 w-full" src={photo.image_url} />
                <h1 className="absolute bottom-2 left-1/2 -translate-x-1/2 -translate-y-1/4 bg-black bg-opacity-40 p-4 m-0 rounded-lg text-center">
                  <span className={cap.style}>{cap.caption}</span>
                </h1>
                <div className="absolute right-2 top-2">
                  <Votes caption={cap} />
                </div>
              </div>
            </div>
          })}
        </div>
      )
    } else {
      return <div className="flex justify-center pb-4">
        <h3 className="text-3xl font-bold text-rose-500">No Captions Yet</h3>
      </div>
    }
  }

  return (
    <div>
      { renderCaptions() }
    </div>
  );
}

export default CaptionsList;