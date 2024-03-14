import { useDispatch, useSelector } from "react-redux";
import { Item } from "../types/products.types";
import { AppDispatch, RootState } from "../store";
import {
  addToCart as addToCartAction,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../store/card/card-slice";
import { selectCard } from "../store/card/card-selector";

const useShoppingCart = () => {
  const cart = useSelector(selectCard);
  const dispatch: AppDispatch = useDispatch();

  const addToCart = (item: Item) => {
    dispatch(addToCartAction(item)); // Renamed to avoid conflict
  };

  const removeItemFromCart = (itemId: string) => {
    dispatch(removeFromCart(itemId)); // Renamed to avoid conflict
  };

  const updateItemQuantity = (itemId: string, newQuantity: number) => {
    dispatch(updateQuantity({ itemId, newQuantity })); // Renamed to avoid conflict
  };

  const clearCartHandler = () => {
    dispatch(clearCart()); // Renamed to avoid conflict
  };

  return {
    cart,
    addToCart,
    removeItemFromCart,
    updateItemQuantity,
    clearCartHandler,
  };
};

export default useShoppingCart;
