import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../utils/fetch";
import { handleThunkValidationErrors } from '../../utils/helpers';

export const getCaptionsByPhoId = createAsyncThunk(
  'captions/getCaptionsByPhoId',
  async (id, { rejectWithValue }) => {
    try {
      const res = await Axios.get(`/photos/${id}/captions`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
)

const initialState = {
  photoCaptions: [],
  status: {
    code: 0,
    msg: '',
  },
  errors: [],
  loading: false
};

const captionsSlice = createSlice({
  name: 'captions',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    /**
     * Captions extra reducers
     */
    builder.addCase(getCaptionsByPhoId.pending, (state) => {
      state.loading = true;
      state.status.code = 0; state.status.msg = 'Requesting photos\'s captions...';
    })
    .addCase(getCaptionsByPhoId.fulfilled, (state, action) => {
      state.loading = false;
      state.photoCaptions = action.payload;
      handleThunkValidationErrors(state, action);
    })
    .addCase(getCaptionsByPhoId.rejected, (state, action) => {
      state.loading = false;
      handleThunkValidationErrors(state, action);
    });
  }
});

export const captionsSelector = state => state.captions.photoCaptions;

export default captionsSlice.reducer;