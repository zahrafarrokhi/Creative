import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import moment from 'moment-jalaali';
import axios from '../axios';

export const IDLE = 'idle';
export const LOADING = 'loading';

export const loadPatients = createAsyncThunk(
  'patients/getall',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/patients/patient/');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);

export const addPatient = createAsyncThunk(
  'patients/new',
  async ({ nationalId, dateOfBirth }, thunkAPI) => {
    try {
      dateOfBirth = moment(dateOfBirth, 'YYYY-MM-DD');
      const dateOfBirthJalali = dateOfBirth.format('jYYYY-jMM-jDD');
      dateOfBirth = dateOfBirth.format('YYYY-MM-DD');
      const response = await axios.post('/api/patients/patient', {
        national_id: nationalId,
        date_of_birth: dateOfBirth,
        date_of_birth_jalali: dateOfBirthJalali,
      });
      return response.data;
    } catch (error) {
      console.log('Main error object: ', error, error.response.data);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);

const internalInitialState = {
  patients: null,
  patient: null,
  error: null,
  loading: IDLE,
};

export const patientsSlice = createSlice({
  name: 'patients',
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
    loginAsPatient: (state, action) => {
      state.patient = state.patients.filter((patient)=>(patient.id == action.payload))[0]
      return state
    }
  },
  extraReducers: (builder) => {
    // Load patients
    builder.addCase(loadPatients.fulfilled, (state, action) => {
      state.patients = action.payload;
      state.loading = IDLE;
    });
    builder.addCase(loadPatients.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = IDLE;
    });
    builder.addCase(loadPatients.pending, (state, action) => {
      state.loading = LOADING;
    });
    // New patient
    builder.addCase(addPatient.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = IDLE;
    });
    builder.addCase(addPatient.fulfilled, (state, action) => {
      state.patient = action.payload;
      state.patients.push(state.patient);
      state.loading = IDLE;
    });
    builder.addCase(addPatient.pending, (state, action) => {
      state.loading = LOADING;
    });

  },
});

export const { reset, loginAsPatient } = patientsSlice.actions;