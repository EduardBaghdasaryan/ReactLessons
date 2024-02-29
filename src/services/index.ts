import axios from "axios";
import { API_URL } from "../constants/index.ts";
import { MovieDTO, User } from "../types/index.ts";

export const signInApiCall = async (userData: User) => {
  try {
    const res = await axios.post(`${API_URL}/users`, userData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovies = async (): Promise<MovieDTO[]> => {
  try {
    const res = await axios.get<MovieDTO[]>(`${API_URL}/movies`);
    return res.data;
  } catch (error) {
    console.log("Failed to fetch movies:", error);
    throw new Error("Failed to fetch movies");
  }
};

export const addMovieApiCall = async (
  movieData: MovieDTO
): Promise<MovieDTO> => {
  try {
    const res = await axios.post(`${API_URL}/movies`, movieData);
    return res.data;
  } catch (error) {
    console.error("Failed to add video:", error);
    throw new Error("Failed to add video");
  }
};

export const getMovieByIdService = async (
  movieId: string
): Promise<MovieDTO> => {
  try {
    const response = await axios.get<MovieDTO>(`${API_URL}/movies/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch movie:", error);
    throw new Error("Failed to fetch movie");
  }
};
