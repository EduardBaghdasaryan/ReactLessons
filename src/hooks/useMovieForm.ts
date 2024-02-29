import React from "react";
import { addMovieThunk } from "../store/movies/movies-thunks";
import { MovieDTO } from "../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useNavigate } from "react-router";
import { ROUTES } from "../constants";

const useMovieForm = () => {
  const [formData, setFormData] = React.useState<MovieDTO>({
    id: "",
    title: "",
    description: "",
    year: 0,
    country: "",
    rating: 0,
    genres: [],
    actors: [],
    imageUrl: "",
    videoUrl: "",
  });

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "genres" || name === "actors") {
      const itemsArray = value.split(",").map((item) => item.trim());
      setFormData((prevState) => ({
        ...prevState,
        [name]: itemsArray,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addMovieThunk(formData));
    navigate(ROUTES.MOVIES);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};

export default useMovieForm;
