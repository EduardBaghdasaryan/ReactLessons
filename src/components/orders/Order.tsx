// Order.tsx
import React, { FC } from "react";
import { OrderProps } from "../../types/orders.types";

const OrderComponent: FC<OrderProps> = ({ order }) => {
  return (
    <div>
      <h3>Order ID: {order.id}</h3>
      <p>Date: {order.date}</p>
      <ul>
        {order.items.map((item) => (
          <li key={item.id}>
            {item.title} - Quantity: {item.count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderComponent;
