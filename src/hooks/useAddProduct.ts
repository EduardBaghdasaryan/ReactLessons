import { useState } from "react";
import Product from "../components/products/Product";
import { createProductThunk } from "../store/products/products-thunks";
import { Item } from "../types/products.types";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";

const useCreateProduct = () => {
  const dispatch: AppDispatch = useDispatch();
  const [product, setProduct] = useState<Item>({
    id: "",
    title: "",
    description: "",
    imageUrl: "",
    count: 0,
    price: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createProductThunk(product));
    setProduct({
      id: "",
      title: "",
      description: "",
      imageUrl: "",
      count: 0,
      price: 0,
    });
  };

  return { product, handleChange, handleSubmit };
};

export default useCreateProduct;
