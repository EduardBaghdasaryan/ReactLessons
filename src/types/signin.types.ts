import { Common } from ".";

export interface SigninInitialState extends Common {
  isAuth: boolean;
}

export type SignIn = {
  email: string;
  password: string;
};
