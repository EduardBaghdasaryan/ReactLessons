import React, { FC } from "react";
import { ProductProps } from "../../types/products.types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";

const Product: FC<ProductProps> = ({
  id,
  name,
  image,
  price,
  count,
  description,
  onAddToCart,
}) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`${ROUTES.PRODUCT_LIST}/${id}`);
  };

  return (
    <div onClick={handleOnClick}>
      <h3>{name}</h3>
      <img src={image} alt={name} />
      <p>Price: ${price}</p>
      {count && <p>Count: {count}</p>}
      {description && <p>Description: {description}</p>}
      <button onClick={onAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
