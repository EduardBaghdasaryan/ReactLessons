type UserCredentials = {
  id: number;
  email: string;
  password: string;
};

type SigninInitialState = {
  isAuth: boolean;
  userId: number | null;
};

export { SigninInitialState, UserCredentials };
