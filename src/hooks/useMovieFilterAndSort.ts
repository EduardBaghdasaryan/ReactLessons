import { useState, useCallback, useMemo } from "react";
import { MovieDTO } from "../types";

type SortOption =
  | "none"
  | "yearNewest"
  | "yearOldest"
  | "ratingHighest"
  | "ratingLowest";

const useMovieFilterAndSort = (movies: MovieDTO[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("none");

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const handleSortChange = useCallback((option: SortOption) => {
    setSortOption(option);
  }, []);

  const filteredAndSortedMovies = useMemo(() => {
    let filteredAndSorted = [...movies];

    if (searchTerm) {
      filteredAndSorted = filteredAndSorted.filter((movie) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
          movie.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          movie.country.toLowerCase().includes(lowerCaseSearchTerm) ||
          movie.genres.some((genre) =>
            genre.toLowerCase().includes(lowerCaseSearchTerm)
          ) ||
          movie.actors.some((actor) =>
            actor.toLowerCase().includes(lowerCaseSearchTerm)
          )
        );
      });
    }

    if (sortOption === "yearNewest") {
      filteredAndSorted = filteredAndSorted.sort((a, b) => b.year - a.year);
    } else if (sortOption === "yearOldest") {
      filteredAndSorted = filteredAndSorted.sort((a, b) => a.year - b.year);
    } else if (sortOption === "ratingHighest") {
      filteredAndSorted = filteredAndSorted.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "ratingLowest") {
      filteredAndSorted = filteredAndSorted.sort((a, b) => a.rating - b.rating);
    }

    return filteredAndSorted;
  }, [movies, searchTerm, sortOption]);

  return {
    searchTerm,
    handleSearchChange,
    sortOption,
    handleSortChange,
    filteredAndSortedMovies,
  };
};

export default useMovieFilterAndSort;
