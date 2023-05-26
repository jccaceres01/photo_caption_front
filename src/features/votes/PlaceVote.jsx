import React, { useState } from "react";
import { useSelector } from "react-redux";
import { credentialsSelector } from '../auths/authsSlice';
import Axios from '../../utils/fetch';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from "react-router-dom";

const PlaceVote = ({caption, placeOrUpdateVote, handleToggleVotes}) => {

  const user = useSelector(credentialsSelector);
  const [rate, setRate] = useState(0);
  const placeVote = async (newVote) => {
    try {
      const res = await Axios.post('/votes/place', newVote);
      if (res.status === 200 || res.status === 201) {
        return res.data;
      }

      return null;
    } catch (err) {
      alert(err.message);
    }
  }

  const putVote = async () => {
    const voteToPlace = {
      user_id: user.id,
      caption_id: caption.id,
      vote: rate
    };

    const newVote = await placeVote(voteToPlace);
    if (newVote) {
      placeOrUpdateVote(newVote);
    }
  }

  if (user) {
    return (
      <div onMouseLeave={handleToggleVotes} className="flex justify-end items-center space-x-1 m-2">
        <Rating
          emptySymbol={<FontAwesomeIcon className="h-4 w-4 text-yellow-300" icon={icon({name: 'star', style: 'regular'})} />}
          fullSymbol={<FontAwesomeIcon className="h-4 w-4 text-yellow-300" icon={icon({name: 'star'})} />}
          start={0}
          stop={5}
          step={1} 
          value={rate} 
          onHover={(val) => setRate(val)} onClick={putVote}  
        />
      </div>
    );
  } else {
    return <div className="flex justify-end items-center space-x-1 m-2" onMouseLeave={handleToggleVotes}>
      <Link className="text-white underline" to="/login">Login to vote</Link>
    </div>
  }
}

export default PlaceVote;