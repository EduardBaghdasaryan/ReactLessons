import axios from "axios";
import { API_URL } from "../constants/index.ts";
import { SignIn, User } from "../types/index.ts";

export const signInApiCall = async (userData: SignIn) => {
  try {
    const { data } = await axios.get(`${API_URL}/users`);
    const user = data.find(
      (user: SignIn) =>
        user.email === userData.email && user.password === userData.password
    );
    if (!user) {
      return "Invalid email or password";
    }
    return user;
  } catch (error) {
    console.log(error);
    return "An error occurred while signing in";
  }
};

export const signUpApiCall = async (userData: User) => {
  try {
    const res = await axios.post(`${API_URL}/users`, userData);
    return res.data;
  } catch (error) {
    console.log(error);
    return "An error occurred while signing up";
  }
};

export const updateUserProfile = async (userData: User) => {
  try {
    const response = await axios.put(`${API_URL}/profile`, userData);
    return response.data;
  } catch (error) {
    return "An error occurred while updating the profile";
  }
};
