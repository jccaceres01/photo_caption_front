import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../utils/fetch';

/**
 * handle thunk validation errors
 */
const handleThunkValidationErrors = (state, action) => {
  if (action.payload.status === 422) {
    state.credentialsErrors = [];
    action.payload.data.errors.forEach(err => {
      state.credentialsErrors.push(err);
    });
  } else {
    state.status.code = action.payload.status;
    state.status.msg = action.payload.data;
  }
}

export const login = createAsyncThunk (
  'auths/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await Axios.post('/auths/login', credentials);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const register = createAsyncThunk(
  'auths/register',
  async (newUser, { rejectWithValue }) => {
    try {
      const res = await Axios.post('/auths/register', newUser);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const initialState = {
  credentials: (localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user')) : null,
  loadCredentials: false,
  credentialsErrors: [],
  status: {
    code: 0,
    msg: ''
  }
};

const authsSlice = createSlice({
  name: 'auths',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.credentialsErrors = [];
    },
    // Logout user
    logout: (state) => {
      state.credentials = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    /**
     * Login async thunk reducers
     */
    builder.addCase(login.pending, (state, action) => {
      state.loadCredentials = true;
      state.credentialsErrors = [];
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loadCredentials = false;

      state.credentials = action.payload.user;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    })
    .addCase(login.rejected, (state, action) => {
      state.loadCredentials = false;
      handleThunkValidationErrors(state, action);
    });
    /**
     * Register async thunks reducers
     */
    builder.addCase(register.pending, (state, ) => {
      state.loadCredentials = true;
    })
    .addCase(register.fulfilled, (state) => {
      state.loadCredentials = false;
    })
    .addCase(register.rejected, (state, action) => {
      state.loadCredentials = false;
      handleThunkValidationErrors(state, action);
    });
  }
});

export const {
  clearErrors,
  logout
} = authsSlice.actions;

export const credentialsSelector = state => state.auths.credentials;
export const loadCredentialsSelector = state => state.auths.loadCredentials;
export const credentialErrorsSelector = state => state.auths.credentialsErrors;
export const statusSelector = state => state.auths.status;

export default authsSlice.reducer