import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const About = () => {
  return (
    <div className="rounded-xl border p-5 shadow-md w-min-fit bg-white">
      <div className="flex w-full items-center justify-between border-b pb-3">
        <div className="flex items-center space-x-3">
          <FontAwesomeIcon className="h-7 w-7 p-2 rounded-full bg-slate-400 text-white" icon={icon({name: 'question', style: 'solid'})} />
          <div className="text-lg font-bold text-slate-700">About</div>
        </div>
        <div className="flex items-center space-x-8">
        </div>
      </div>

      <div className="mt-4 mb-6">
        <p className="text-lg text-start text-gray-400">Ignite your creativity with our Photo Caption Contest Web App! Join a community of witty minds and craft captivating captions for captivating images. Compete, connect, and win exciting prizes. Unleash your imagination and be crowned the ultimate caption master. Join now and let the words do the talking!</p>
      </div>
    </div>
  );
}

export default About;