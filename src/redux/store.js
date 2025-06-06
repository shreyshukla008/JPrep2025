import { configureStore } from '@reduxjs/toolkit';
import courseReducer from './courseSlice';
import starredReducer from './starredSlice';

const store = configureStore({
  reducer: {
    courses: courseReducer,
    starred: starredReducer,
  },
});

export default store;
