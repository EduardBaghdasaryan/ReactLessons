import React, { FC, useState } from "react";
import useFetchMovies from "../../hooks/useFetchMovies";
import Movie from "./Movie";
import useMovieFilterAndSort from "../../hooks/useMovieFilterAndSort";
import { SortOption, MovieDTO } from "../../types";
import MovieDetails from "./MovieDetails";
import { useNavigate } from "react-router";
import { ROUTES } from "../../constants";

const MovieList: FC = () => {
  const { movies, loading } = useFetchMovies();
  const {
    searchTerm,
    handleSearchChange,
    sortOption,
    handleSortChange,
    filteredAndSortedMovies,
  } = useMovieFilterAndSort(movies);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleMovieClick = (movieId: string) => {
    setSelectedMovieId(movieId);
    navigate(`${ROUTES.MOVIES}/${movieId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>List of Movies</h1>
      <div>
        <label>
          Search:
          <input type="text" value={searchTerm} onChange={handleSearchChange} />
        </label>
      </div>
      <div>
        <label>
          Sort By:
          <select
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
          >
            <option value="none">None</option>
            <optgroup label="Year">
              <option value="yearNewest">Year: Newest to Oldest</option>
              <option value="yearOldest">Year: Oldest to Newest</option>
            </optgroup>
            <optgroup label="Rating">
              <option value="ratingHighest">Rating: Highest to Lowest</option>
              <option value="ratingLowest">Rating: Lowest to Highest</option>
            </optgroup>
          </select>
        </label>
      </div>
      <div>
        {filteredAndSortedMovies.map((movie) => (
          <div key={movie.id} onClick={() => handleMovieClick(movie.id)}>
            <img src={movie.imageUrl} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>Year: {movie.year}</p>
            <p>Rating: {movie.rating}</p>
          </div>
        ))}
      </div>
      {selectedMovieId && <MovieDetails />}
    </div>
  );
};

export default MovieList;
