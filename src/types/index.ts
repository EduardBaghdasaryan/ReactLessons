export type SigninInitialState = {
  isAuth: boolean;
  isLoading: boolean;
  userData: User;
};

export type SignIn = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  email: string;
  phone: string;
};
