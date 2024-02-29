import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchMoviesThunk } from "../store/movies/movies-thunks";
import {
  allMoviesSelector,
  loadingSelector,
} from "../store/movies/movies-selector";

const useFetchMovies = () => {
  const dispatch: AppDispatch = useDispatch();
  const movies = useSelector((state: RootState) => allMoviesSelector(state));
  const loading = useSelector((state: RootState) => loadingSelector(state));

  useEffect(() => {
    dispatch(fetchMoviesThunk());
  }, [dispatch]);

  return { movies, loading };
};

export default useFetchMovies;
