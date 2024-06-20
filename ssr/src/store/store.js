import { configureStore } from '@reduxjs/toolkit';
import { hotelsReducer } from './hotelsReducer';

const createStore = (preloadedState) => {
  return configureStore({
    reducer: hotelsReducer,
    preloadedState
  });
};

export default createStore;
