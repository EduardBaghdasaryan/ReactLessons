import axios from "axios";
import { API_URL } from "../constants/index.ts";
import { SignIn, User } from "../types/index.ts";

export const signInApiCall = async (userData: SignIn) => {
  try {
    const { data } = await axios.get(`${API_URL}/users`);
    return data.find(
      (user: SignIn) =>
        user.email === userData.email && user.password === userData.password
    );
  } catch (error) {
    console.log(error);
  }
};

export const singUpApiCall = async (userData: User) => {
  try {
    const res = await axios.post(`${API_URL}/users`, userData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
