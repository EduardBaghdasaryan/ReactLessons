import axios from "axios";
import { API_URL } from "../constants/index";
import { Order } from "../types/orders.types";
import { Item } from "../types/products.types";
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
    ("serviiice");
    const response = await axios.get(`${API_URL}/products`);

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};

export const createProduct = async (productData: Item) => {
  try {
    const response = await axios.post(`${API_URL}/products`, productData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create product");
  }
};

export const createOrder = async (orderData: Order) => {
  try {
    const response = await axios.post(`${API_URL}/orders`, orderData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create order");
  }
};

export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch orders");
  }
};
