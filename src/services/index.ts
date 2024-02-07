import axios from "axios";
import { API_URL } from "../constants";
import { User } from "../types/user.types";

export const getUsersApiCall = async () => {
  const res = await axios.get(`${API_URL}/users`);
  return res.data;
};

export const updateUserDataApiCall = async (id: number, data: User) => {
  const res = await axios.put(`${API_URL}/users/${id}`, data);
  return res.data;
};

export const deleteUserDataApiCall = async (id: number) => {
  const res = await axios.delete(`${API_URL}/users/${id}`);
  return res.data;
};

export const createUserDataApiCall = async (data: User) => {
  const res = await axios.post(`${API_URL}/users`, data);
  return res.data;
};
