import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const Welcome = () => {
  return (
    <div className="rounded-xl border p-5 shadow-md w-min-fit bg-white">
      <div className="flex w-full items-center justify-between border-b pb-3">
        <div className="flex items-center space-x-3">
          <FontAwesomeIcon className="h-7 w-7 p-2 rounded-full bg-slate-400 text-white" icon={icon({name: 'house', style: 'solid'})} />
          <div className="text-lg font-bold text-slate-700">Home</div>
        </div>
        <div className="flex items-center space-x-8">
        </div>
      </div>

      <div className="mt-4 mb-6">
        <h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure magnam consequuntur libero officiis vitae eum, cumque ullam aspernatur a beatae!</h1>
      </div>
    </div>
  );
}

export default Welcome;