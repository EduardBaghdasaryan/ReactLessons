import { createAsyncThunk } from "@reduxjs/toolkit";
import { createProduct, getProducts } from "../../services";
import { Item } from "../../types/products.types";
import { ThunkApiConfig } from "../../types";

export const fetchProducts = createAsyncThunk<Item[], void, ThunkApiConfig>(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    const products = await getProducts();
    if (products.length) {
      return products;
    }
    return rejectWithValue("Cant fetch products");
  }
);

export const createProductThunk = createAsyncThunk<Item, Item>(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    const createdProduct = await createProduct(productData);
    if (createdProduct.length) {
      return createdProduct;
    }
    return rejectWithValue("Failed to create product");
  }
);
