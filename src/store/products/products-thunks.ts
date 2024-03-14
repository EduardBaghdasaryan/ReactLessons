import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "../../services";
import { Item } from "../../types/products.types";
import { ThunkApiConfig } from "../../types";

export const fetchProducts = createAsyncThunk<Item[], void, ThunkApiConfig>(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    console.log("thuuunk");

    const products = await getProducts();
    if (products.length) {
      return products;
    }
    return rejectWithValue("Cant fetch products");
  }
);
