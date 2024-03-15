import React, { FC } from "react";
import useCreateProduct from "../../hooks/useAddProduct";
import { useSelector } from "react-redux";
import { selectProductsError } from "../../store/products/products-selector";

const CreateProduct: FC = () => {
  const { product, handleChange, handleSubmit } = useCreateProduct();
  const error = useSelector(selectProductsError);

  return (
    <div>
      <h2>Create Product</h2>
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="count">Count:</label>
          <input
            type="number"
            id="count"
            name="count"
            value={product.count}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
