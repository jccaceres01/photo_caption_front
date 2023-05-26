import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../utils/fetch';
import { handleThunkValidationErrors } from '../../utils/helpers';

/**
 * Async thunks
 */
// Get all photos thunk
export const getAllPhotosThunk = createAsyncThunk (
  'photos/getAllPhotos',
  async ( _ , { rejectWithValue }) => {
    try {
      const res = await Axios.get('/photos');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// Get all photos thunk
export const getLastestPhotosThunk = createAsyncThunk (
  'photos/getLastestPhotosThunk',
  async ( _ , { rejectWithValue }) => {
    try {
      const res = await Axios.get('/photos/lastest');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
// Get all photos thunk
export const getPhotoByIdThunk = createAsyncThunk (
  'photos/getPhotoById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await Axios.get(`/photos/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
// create photo thunk
export const createPhotoThunk = createAsyncThunk (
  'photos/createPhoto',
  async (photo, { rejectWithValue }) => {
    // Add multipart/form-data to axios instance
    Axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
    try {
      const res = await Axios.post('/photos', photo);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
// delete photo thunk
export const deletePhotoThunk = createAsyncThunk (
  'photos/deletePhoto',
  async (id, { rejectWithValue }) => {
    try {
      const res = await Axios.delete(`/photos/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
// get selected photo votes thunk
export const getSelectePhotoVotes = createAsyncThunk (
  'photos/getSelectePhotoVotes',
  async (id, { rejectWithValue, state }) => {
    if (Object.keys(state.selectedPhoto).length > 0) {
      try {
        const res = await Axios.delete(`/photos/${id}`);
        return res.data;
      } catch (err) {
        return rejectWithValue(err.response);
      }
    }
  }
);

// Create caption
export const createCaptionThunk = createAsyncThunk (
  'photos/createCaption',
  async (caption, { rejectWithValue, state }) => {
    try {
      const res = await Axios.post(`/captions`, caption);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// create or update captions votes
export const updateCaptionVote = createAsyncThunk (
  'photos/updateCaptionVote',
  async ( { captionId, vote }, { rejectWithValue, state }) => {
    return true;
  }
);

/**
 * Initial State
 */
const initialState = {
  allPhotos: [],
  lastestPhotos: [],
  selectedPhoto: {},
  selectedPhotoCaptions: [],
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
const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // getAllPhotosThunk extra reducers
    builder.addCase(getAllPhotosThunk.pending, (state) => {
      state.loading = true;
      state.status.code = 0; state.status.msg = 'Requesting photos...';
    })
    .addCase(getAllPhotosThunk.fulfilled, (state, action) => {
      state.loading = false;
      handleThunkValidationErrors(state, action);
      state.allPhotos = action.payload;
    })
    .addCase(getAllPhotosThunk.rejected, (state, action) => {
      state.loading = false;
      handleThunkValidationErrors(state, action);
    });
    // getLastestPhotosThunk extra reducers
    builder.addCase(getLastestPhotosThunk.pending, (state) => {
      state.loading = true;
      state.status.code = 0; state.status.msg = 'Requesting photos...';
    })
    .addCase(getLastestPhotosThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.lastestPhotos = action.payload;
      handleThunkValidationErrors(state, action);
    })
    .addCase(getLastestPhotosThunk.rejected, (state, action) => {
      state.loading = false;
      handleThunkValidationErrors(state, action);
    });

    // getPhotoByIdThunk extra reducers
    builder.addCase(getPhotoByIdThunk.pending, (state) => {
      state.loading = true;
      state.status.code = 0; state.status.msg = 'Requesting photo...';
    })
    .addCase(getPhotoByIdThunk.fulfilled, (state, action) => {
      state.loading = false;
      handleThunkValidationErrors(state, action);
      state.selectedPhoto = action.payload;
    })
    .addCase(getPhotoByIdThunk.rejected, (state, action) => {
      state.loading = false;
      handleThunkValidationErrors(state, action);
    });

    // createPhotoThunk extra reducers
    builder.addCase(createPhotoThunk.pending, (state) => {
      state.loading = true;
      state.status.code = 0; state.status.msg = 'Creating photo...';
    })
    .addCase(createPhotoThunk.fulfilled, (state, action) => {
      state.loading = false;
      handleThunkValidationErrors(state, action);
      state.allPhotos.push(action.payload);
    })
    .addCase(createPhotoThunk.rejected, (state, action) => {
      state.loading = false;
      handleThunkValidationErrors(state, action);
    });

    // deletePhotoThunk extra reducers
    builder.addCase(deletePhotoThunk.pending, (state) => {
      state.loading = true;
      state.status.code = 0; state.status.msg = 'Creating photo...';
    })
    .addCase(deletePhotoThunk.fulfilled, (state, action) => {
      state.loading = false;
      const id = action.meta.arg;
      const foundIndex = state.allPhotos.findIndex(pos =>
        pos.id === id);
      if (foundIndex) state.allPhotos.slice(foundIndex, 1);
      handleThunkValidationErrors(state, action);
    })
    .addCase(deletePhotoThunk.rejected, (state, action) => {
      state.loading = false;
      handleThunkValidationErrors(state, action);
    });

    // updateCaptionVote extra reducers
    builder.addCase(updateCaptionVote.pending, (state) => {
      state.loading = true;
      state.status.code = 0; state.status.msg = 'Updating caption vote...';
    })
    .addCase(updateCaptionVote.fulfilled, (state, action) => {
      state.loading = false;
      handleThunkValidationErrors(state, action);
    })
    .addCase(updateCaptionVote.rejected, (state, action) => {
      state.loading = false;
      handleThunkValidationErrors(state, action);
    });

    // updateCaptionVote extra reducers
    builder.addCase(createCaptionThunk.pending, (state) => {
      state.loading = true;
      state.status.code = 0; state.status.msg = 'Creating caption...';
    })
    .addCase(createCaptionThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedPhotoCaptions.push(action.payload);
      handleThunkValidationErrors(state, action);
    })
    .addCase(createCaptionThunk.rejected, (state, action) => {
      state.loading = false;
      handleThunkValidationErrors(state, action);
    });
  }
});

/**
 * export actions
 */
export const {
} = photosSlice.actions;

/**
 * Export selectors
 */
export const allPhotosSelector = state => state.photos.allPhotos;
export const lastestPhotosSelector = state => state.photos.lastestPhotos;
export const selectedPhotoSelector = state => state.photos.selectedPhoto;
export const selectedPhotoCaptionsSelector
  = state => state.photos.selectedPhotoCaptions;
export const loadingPhotosSelector = state => state.photos.loading;
export const photosErrorsSelector = state => state.photos.errors;
export const photosStatusSelector = state => state.photos.status;

/**
 * Export slice reducer
 */
export default photosSlice.reducer