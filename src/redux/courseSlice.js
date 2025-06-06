// src/redux/courseSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Optional: You can still keep this for real fetches later
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, thunkAPI) => {
    try {
      const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
      console.log("fetching the data.....");
      const res = await axios.get(`${BASE_URL}/api/subject/getCourses`);
      console.log("receives in redux-store: ", res.data);
      return res.data.subjects;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || "Error fetching courses");
    }
  }
);

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    list: [], 
    loading: false,
    error: null,
  },
  reducers: {
    clearCourses: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch courses';
      });
  },
});

export const { clearCourses } = courseSlice.actions;
export default courseSlice.reducer;
