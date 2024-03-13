export type SigninInitialState = {
  id: string | null;
  isAuth: boolean;
  isLoading: boolean;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  email: string;
  phone: string;
};
