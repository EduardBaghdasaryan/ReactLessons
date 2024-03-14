import React, { FC } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useShoppingCart from "../../hooks/useShoppingCart";
import { selectProductById } from "../../store/products/products-selector";
import Product from "./Product";

const ProductDetails: FC = () => {
  const { id } = useParams();
  const product = useSelector((state) => selectProductById(state, id));
  const { addToCart } = useShoppingCart();

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  const { title, imageUrl, price, count, description } = product;

  return (
    <div>
      <Product
        id={id || ""}
        name={title}
        image={imageUrl}
        price={price}
        count={count}
        description={description}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductDetails;
