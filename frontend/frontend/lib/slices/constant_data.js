/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const IDLE = 'idle';
export const LOADING = 'loading';

export const loadCities = createAsyncThunk(
  'cities/getall',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/data/city/');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);

export const loadSupplementaryInsurance = createAsyncThunk(
  'insurance/getall',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/data/insurance/');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);

const internalInitialState = {
  cities: null,
  supplementaryInsuranceList: null,
  error: null,
  loading: IDLE,
};

export const constantDataSlice = createSlice({
  name: 'constant_data',
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    // Load cities
    builder.addCase(loadCities.fulfilled, (state, action) => {
      state.cities = action.payload;
      state.loading = IDLE;
    });
    builder.addCase(loadCities.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = IDLE;
    });
    builder.addCase(loadCities.pending, (state, action) => {
      state.loading = LOADING;
    });
    // Load loadSupplementaryInsurance
    builder.addCase(loadSupplementaryInsurance.fulfilled, (state, action) => {
      state.supplementaryInsuranceList = action.payload;
      state.loading = IDLE;
    });
    builder.addCase(loadSupplementaryInsurance.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = IDLE;
    });
    builder.addCase(loadSupplementaryInsurance.pending, (state, action) => {
      state.loading = LOADING;
    });
  },
});

export const { reset } = constantDataSlice.actions;