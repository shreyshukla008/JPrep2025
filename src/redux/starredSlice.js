// src/redux/starredSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;


export const fetchStarred = createAsyncThunk(
  "starred/fetchStarred",
  async (userId, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/starred/user/${userId}`);
      return res.data.starredSubjects;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error fetching starred");
    }
  }
);

export const addStarred = createAsyncThunk(
  "starred/addStarred",
  async ({ subjectId, userId }, thunkAPI) => {
    try {
      await axios.post(`${BASE_URL}/api/starred/add`, { subjectId, userId });
      return subjectId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error adding starred");
    }
  }
);

export const removeStarred = createAsyncThunk(
  "starred/removeStarred",
  async ({ subjectId, userId }, thunkAPI) => {
    try {
      await axios.post(`${BASE_URL}/api/starred/remove`, { subjectId, userId });
      return subjectId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error removing starred");
    }
  }
);

// 👉 Slice
const starredSlice = createSlice({
  name: "starred",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStarred.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStarred.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchStarred.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addStarred.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(removeStarred.fulfilled, (state, action) => {
        state.list = state.list.filter((id) => id !== action.payload);
      });
  },
});


//export { fetchStarred, addStarred, removeStarred };
export default starredSlice.reducer;
