import React, { useEffect, useState } from "react";
import AverageVotes from './AverageVotes';
import PlaceVote from './PlaceVote';
import Axios from "../../utils/fetch";

const Votes = ({caption}) => {
  const [votes, setVotes] = useState([]);
  const [toggleVotes, setToggleVotes] = useState(false);

  const getVotes = async (captionId) => {
    const res = await Axios.get(`/captions/${captionId}/votes`);
    if (res.status === 200) return res.data;
    return [];
  }

  const placeOrUpdateVote = (placedVote) => {
    const voteFound = votes.find(vote => vote.id == placedVote.id);

    if (voteFound) {
      const newVotesState = votes.map(vote => {
        if (vote.id == voteFound.id) {
          return {
            ...vote,
            vote: placedVote.vote
          }
        }
        return vote;
      });

      setVotes(newVotesState);
    } else {
      const newVotesState = [...votes, placedVote];
      setVotes(newVotesState);
    }
  }

  const handleToggleVotes = () => {
    setToggleVotes(!toggleVotes);
  }

  useEffect(() => {
    if (caption) {
      getVotes(caption.id).then(res => setVotes(res));
    }
  }, [caption]);

  return (
    <div>
      {
        (toggleVotes)
          ? <PlaceVote caption={caption} placeOrUpdateVote={placeOrUpdateVote} handleToggleVotes={handleToggleVotes}  />
          : <AverageVotes votes={votes} handleToggleVotes={handleToggleVotes} />
      }
    </div>
  );
}

export default Votes;