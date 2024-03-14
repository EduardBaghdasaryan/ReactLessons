import React, { FC } from "react";
import { Item } from "../../types/products.types";

interface CardProps {
  item: Item;
  onQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

const Card: FC<CardProps> = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div>
      <h3>{item.title}</h3>
      <p>Price: ${item.price}</p>
      <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
      <input
        type="number"
        id={`quantity-${item.id}`}
        value={item.count}
        onChange={onQuantityChange}
      />
      <button onClick={onRemove}>Remove</button>
    </div>
  );
};

export default Card;
