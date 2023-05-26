import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../utils/fetch';
import { handleThunkValidationErrors } from '../../utils/helpers';

/**
 * Get all captions' votes
 */
export const getCaptionVotes = createAsyncThunk(
  'votes/getCaptionVotes',
  async (captionId, { rejectWithValue }) => {
    try {
      const res = await Axios.get(`/captions/${captionId}/votes`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

/**
 * Initial State
 */
const initialState = {
  allVotes: [],
  status: {
    code: 0,
    msg: '',
  },
  errors: [],
  loading: false
};

/**
 * Slice definition
 */
const votesSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    /**
     * Captions' votes extra reducer
     */
    builder.addCase(getCaptionVotes.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(getCaptionVotes.fulfilled, (state, action) => {
      state.loading = false;
      state.captionVotes = action.payload;
      handleThunkValidationErrors(state, action);
    })
    .addCase(getCaptionVotes.rejected, (state, action) => {
      state.loading = false;
      handleThunkValidationErrors(state, action);
    });
  }
});

/**
 * export actions
 */
export const {
} = votesSlice.actions;

/**
 * Export selectors
 */
export const captionVotesSelector = state => state.captions.allVotes;
/**
 * Export slice reducer
 */
export default votesSlice.reducer