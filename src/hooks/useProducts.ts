import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../store/products/products-selector";
import { fetchProducts } from "../store/products/products-thunks";
import { AppDispatch } from "../store";

const useProducts = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return products;
};

export default useProducts;
