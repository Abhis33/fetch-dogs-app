import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// Fetch breeds
export const getBreeds = createAsyncThunk("dogs/getBreeds", async () => {
  const response = await axiosInstance.get("/dogs/breeds");
  return response.data;
});

// Fetch dogs based on filters
export const searchDogs = createAsyncThunk("dogs/search", async (filters) => {
  const response = await axiosInstance.get("/dogs/search", { params: filters });
  const dogsData = await axiosInstance.post("/dogs", response.data.resultIds);
  return dogsData.data;
});

// Match a favorite dog
export const matchDog = createAsyncThunk("dogs/match", async (favoriteIds) => {
  const response = await axiosInstance.post("/dogs/match", favoriteIds);
  return response.data.match;
});

const dogsSlice = createSlice({
  name: "dogs",
  initialState: { breeds: [], dogs: [], favorites: [], match: null },
  reducers: {
    addFavorite: (state, action) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBreeds.fulfilled, (state, action) => {
      state.breeds = action.payload;
    });
    builder.addCase(searchDogs.fulfilled, (state, action) => {
      state.dogs = action.payload;
    });
    builder.addCase(matchDog.fulfilled, (state, action) => {
      state.match = action.payload;
    });
  },
});

export const { addFavorite } = dogsSlice.actions;
export default dogsSlice.reducer;
