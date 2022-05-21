import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const IDLE = 'idle';
export const LOADING = 'loading';

export const M_PHONE_NUMBER = 'phone_number';
export const M_EMAIL = 'email';


export const requestMobileOTP = createAsyncThunk(
  'auth/mobileotp',
  async (phoneNumber, thunkAPI) => {
    try {
      const response = await axios.post('/api/auth/mobile/', {
        phone_number: phoneNumber,
      });

      // localStorage.setItem(METHOD_KEY, M_PHONE_NUMBER);
      // localStorage.setItem(USERNAME_KEY, phoneNumber);

      return {
        method: M_PHONE_NUMBER,
        username: phoneNumber,
        ...response.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);

export const requestEmailOTP = createAsyncThunk(
  'auth/emailotp',
  async (email, thunkAPI) => {
    try {
      const response = await axios.post('/api/auth/email/', { email });

      // localStorage.setItem(METHOD_KEY, M_EMAIL);
      // localStorage.setItem(USERNAME_KEY, email);

      return { method: M_EMAIL, username: email, ...response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);

const internalInitialState = {

  method: null,
  username:null,
  loading:IDLE,//false ,not busy
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: internalInitialState,
  reducers: {
   
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    // Mobile OTP
    builder.addCase(requestMobileOTP.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.method = action.payload.method;
      state.loading = IDLE;

      return state;
    });
    builder.addCase(requestMobileOTP.rejected, (state, action) => ({ ...state, loading: IDLE, error: action.payload.error }),
      // throw new Error(action.error);
    );
    builder.addCase(requestMobileOTP.pending, (state) => {
      state.loading = LOADING;
      return state;
    });

    // Email OTP
    builder.addCase(requestEmailOTP.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.method = action.payload.method;
      state.loading = IDLE;

      return state;
    });
    builder.addCase(requestEmailOTP.rejected, (state, action) => ({ ...state, loading: IDLE, error: action.payload.error }),
      // throw new Error(action.error);
    );
    builder.addCase(requestEmailOTP.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));

    

    
  },
});

export const { reset } = authSlice.actions;