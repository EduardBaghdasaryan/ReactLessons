import { createSlice } from "@reduxjs/toolkit";
import { MovieDTO } from "../../types";
import {
  addMovieThunk,
  fetchMoviesThunk,
  getMovieByIdThunk,
} from "./movies-thunks";

const initialState: { movies: MovieDTO[]; loading: boolean } = {
  movies: [],
  loading: false,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMoviesThunk.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.loading = false;
      })
      .addCase(fetchMoviesThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addMovieThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMovieThunk.fulfilled, (state, action) => {
        state.movies.push(action.payload);
        state.loading = false;
      })
      .addCase(addMovieThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getMovieByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovieByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getMovieByIdThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
