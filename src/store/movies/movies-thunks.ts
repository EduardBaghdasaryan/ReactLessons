import { createAsyncThunk } from "@reduxjs/toolkit";
import { MovieDTO } from "../../types";
import {
  addMovieApiCall,
  fetchMovies,
  getMovieByIdService,
} from "../../services";

export const fetchMoviesThunk = createAsyncThunk<MovieDTO[]>(
  "movies/fetchMovies",
  async () => {
    try {
      return await fetchMovies();
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch movies");
    }
  }
);

export const addMovieThunk = createAsyncThunk<MovieDTO, MovieDTO>(
  "movies/addMovie",
  async (movieData) => {
    try {
      const response = await addMovieApiCall(movieData);
      return response;
    } catch (error) {
      console.error("Failed to add movie:", error);
      throw new Error("Failed to add movie");
    }
  }
);

export const getMovieByIdThunk = createAsyncThunk<MovieDTO, string>(
  "movies/getMovieById",
  async (movieId: string) => {
    try {
      return await getMovieByIdService(movieId);
    } catch (error) {
      console.error("Failed to fetch movie:", error);
      throw new Error("Failed to fetch movie");
    }
  }
);
