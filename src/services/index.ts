import axios from "axios";
import { API_URL } from "../constants/index";
import { SignIn } from "../types/signin.types";
import { User } from "../types/user.types";

export const signInApiCall = async (userData: SignIn) => {
  try {
    const { data } = await axios.get(`${API_URL}/users`);
    return data.find(
      (user: SignIn) =>
        user.email === userData.email && user.password === userData.password
    );
  } catch (error) {
    throw new Error("An error occurred while signing in");
  }
};

export const signUpApiCall = async (userData: User) => {
  try {
    const res = await axios.post(`${API_URL}/users`, userData);
    return res.data;
  } catch (error) {
    throw new Error("An error occurred while signing up");
  }
};

export const updateUserProfile = async (userData: User) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/${userData.id}`,
      userData
    );
    return response.data;
  } catch (error) {
    throw new Error("An error occurred while updating the profile");
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get("/api/products");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};
