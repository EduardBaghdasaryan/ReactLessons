import { AxiosError } from "axios";

type User = {
  id: number;
  firstName: string;
  secondName: string;
  age: number;
};

type initialUserState = {
  isLoading?: boolean;
  error?: AxiosError | null;
  users: User[];
};

export { User, initialUserState };
