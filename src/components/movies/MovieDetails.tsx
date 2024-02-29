import React, { FC } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { movieByIdSelector } from "../../store/movies/movies-selector";

const MovieDetails: FC = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const movie = useSelector((state: RootState) =>
    movieByIdSelector(movieId!)(state)
  );

  return (
    <div>
      <h2>Movie Details</h2>
      {movie && (
        <>
          <img src={movie.imageUrl} alt={movie.title} />
          <h3>{movie.title}</h3>
          <p>Description: {movie.description}</p>
          <p>Year: {movie.year}</p>
          <p>Country: {movie.country}</p>
          <p>Rating: {movie.rating}</p>
          <p>Genres: {movie.genres.join(", ")}</p>
          <p>Actors: {movie.actors.join(", ")}</p>
          {movie.videoUrl && (
            <video controls>
              <source src={movie.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </>
      )}
    </div>
  );
};

export default MovieDetails;
