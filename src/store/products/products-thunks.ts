import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "../../services";
import { Product } from "../../types/products.types";
import { ThunkApiConfig } from "../../types";

export const fetchProducts = createAsyncThunk<Product[], void, ThunkApiConfig>(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    const products = await getProducts();
    if (products.length) {
      return products;
    }
    return rejectWithValue("Cant fetch products");
  }
);
