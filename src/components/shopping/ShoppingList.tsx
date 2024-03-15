import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import useShoppingCart from "../../hooks/useShoppingCart";
import { AppDispatch } from "../../store";
import { createOrderThunk } from "../../store/orders/orders-thunks";
import Card from "./Card";
import Modal from "./Modal";

const ShoppingList: FC = () => {
  const { cart, removeItemFromCart, updateItemQuantity, clearCartHandler } =
    useShoppingCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const handleQuantityChange = (
    productId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuantity = parseInt(e.target.value);
    updateItemQuantity(productId, newQuantity);
  };

  const handleCheckout = () => {
    const order = {
      date: new Date().toISOString(),
      items: cart,
    };
    dispatch(createOrderThunk(order));
    setIsModalOpen(true);
    clearCartHandler();
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <Card
              key={item.id}
              item={item}
              onQuantityChange={(e) => handleQuantityChange(item.id, e)}
              onRemove={() => removeItemFromCart(item.id)}
            />
          ))}
        </div>
      )}
      <button onClick={handleCheckout}>Checkout</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Order confirmed</h2>
      </Modal>
    </div>
  );
};

export default ShoppingList;
