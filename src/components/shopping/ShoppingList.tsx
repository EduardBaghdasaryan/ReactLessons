import React, { FC } from "react";
import useShoppingCart from "../../hooks/useShoppingCart";

const ShoppingList: FC = () => {
  const { cart, removeItemFromCart, updateItemQuantity, clearCartHandler } =
    useShoppingCart();

  const handleQuantityChange = (
    productId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuantity = parseInt(e.target.value);
    updateItemQuantity(productId, newQuantity);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <div>
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                <input
                  type="number"
                  id={`quantity-${item.id}`}
                  value={item.count}
                  onChange={(e) => handleQuantityChange(item.id, e)}
                />
                <button onClick={() => removeItemFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={clearCartHandler}>Clear Cart</button>
    </div>
  );
};

export default ShoppingList;
