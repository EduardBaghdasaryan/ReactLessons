import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../index";

const moviesState = (state: RootState) => state.movies;

export const allMoviesSelector = createSelector(
  moviesState,
  (movies) => movies.movies
);

export const movieByIdSelector = (movieId: string) =>
  createSelector(allMoviesSelector, (movies) =>
    movies.find((movie) => movie.id === movieId)
  );

export const loadingSelector = createSelector(
  moviesState,
  (movies) => movies.loading
);
