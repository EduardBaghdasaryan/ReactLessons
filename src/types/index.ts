export type SigninInitialState = {
  id: number | null;
  isAuth: boolean;
  isLoading: boolean;
};

export type MoviesInitialState = {
  movies: MovieDTO[];
  isLoading: boolean;
};

export type User = {
  id?: number;
  email: string;
  password: string;
};

export type MovieDTO = {
  id: string;
  title: string;
  description: string;
  year: number;
  country: string;
  rating: number;
  genres: string[];
  actors: string[];
  imageUrl: string;
  videoUrl: string;
};

export type MovieProps = {
  movie: MovieDTO;
};

export type SortOption =
  | "none"
  | "yearNewest"
  | "yearOldest"
  | "ratingHighest"
  | "ratingLowest";

export type MovieFormProps = {
  onSubmit: (movie: MovieDTO) => void;
};
