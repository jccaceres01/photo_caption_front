/**
 * handle thunk validation errors
 */
const handleThunkValidationErrors = (state, action) => {
  if (action.payload.status === 422) {
    state.errors = [];
    action.payload.data.errors.forEach(err => {
      state.errors.push(err);
    });
  } else {
    state.status.code = action.payload.status;
    state.status.msg = action.payload.data;
  }
}

/**
 * Average votes function
 */
const avgVotes = (votes) => {
  if (votes instanceof Array && votes.length > 0) {
    return Math.round(votes
      .map(vote => vote.vote)
      .reduce(
        (ac, it) => parseFloat(ac)
        + parseFloat(it) )
        / parseFloat(votes.length)
    );
  };

  return 0;
}

export {
  avgVotes,
  handleThunkValidationErrors
};