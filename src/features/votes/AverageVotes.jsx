import React from "react";
import { avgVotes } from '../../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const AverageVotes = ({votes, handleToggleVotes}) => {

  return (
    <div className="flex justify-end items-center space-x-1 m-2">
      <FontAwesomeIcon className="h-4 w-4 text-yellow-300" icon={icon({name: 'star'})} onMouseOver={handleToggleVotes} />
      <span className="w-5 h-5 text-white bg-black bg-opacity-10 shadow-md text-center rounded"> { avgVotes(votes)}</span>
    </div>
  );
}

export default AverageVotes;