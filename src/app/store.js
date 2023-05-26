import { configureStore } from '@reduxjs/toolkit';
import authsReducer from '../features/auths/authsSlice';
import photosReducer from '../features/photos/photosSlice';
import captionsReduder from '../features/captions/captionsSlice';
import votesReduder from '../features/votes/votesSlice';

const store = configureStore({
  reducer: {
    auths: authsReducer,
    photos: photosReducer,
    captions: captionsReduder,
    votes: votesReduder
  }
});

export default store;
