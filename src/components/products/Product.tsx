import React, { FC } from "react";
import { ProductProps } from "../../types/products.types";

const Product: FC<ProductProps> = ({
  name,
  image,
  price,
  count,
  description,
}) => {
  return (
    <div>
      <h3>{name}</h3>
      <img src={image} alt={name} />
      <p>Price: ${price}</p>
      {count && <p>Count: {count}</p>}
      {description && <p>Description: {description}</p>}
    </div>
  );
};

export default Product;
