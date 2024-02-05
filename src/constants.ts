import { UserCredentials } from "./interfaces/signin.types";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

const initialUserCredentials: UserCredentials = {
  id: 1,
  email: "test@email.com",
  password: "testpassword",
};

enum ROUTES {
  SIGN_IN = "/signin",
  TODOS = "/todos",
}

export { API_URL, initialUserCredentials, ROUTES };
