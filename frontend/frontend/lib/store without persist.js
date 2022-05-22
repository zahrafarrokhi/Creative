import {
  configureStore,
  combineReducers,
  createStore,
  applyMiddleware,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { compose } from 'redux';
import { createWrapper, MakeStore, HYDRATE } from 'next-redux-wrapper';
import { authSlice } from './slices/auth';

const makeStore = (initialState) => {
  let store;
  const combinedReducers = combineReducers({
    authReducer: authSlice.reducer,
    
  });

  const rootReducer = (state, action) => {
    if (action.type === HYDRATE) {
      const nextState = {
        ...state,
        ...action.payload,
      };
      return nextState;
    }
    return combinedReducers(state, action);
  };
  store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  // store = ConfigureStore({ reducer: rootReducer });
  return store;
}
export const wrapper = createWrapper(makeStore, { storeKey: 'key' });
