import React from "react";
import { MovieProps } from "../../types";

const Movie: React.FC<MovieProps> = ({ movie }) => {
  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <p>Year: {movie.year}</p>
      <p>Country: {movie.country}</p>
      <p>Rating: {movie.rating}</p>
      <p>Genres: {movie.genres.join(", ")}</p>
      <p>Actors: {movie.actors.join(", ")}</p>
      <img src={movie.imageUrl} alt={movie.title} />
      <video controls>
        <source src={movie.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Movie;
