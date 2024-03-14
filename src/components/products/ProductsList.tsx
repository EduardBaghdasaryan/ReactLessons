import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import { selectProducts } from "../../store/products/products-selector";
import { Item, SortOption } from "../../types/products.types";
import { AppDispatch } from "../../store";
import { fetchProducts } from "../../store/products/products-thunks";
import useProductFilterAndSort from "../../hooks/useProductFilterAndSort";
import { SORT_TYPES } from "../../constants";
import useProducts from "../../hooks/useProducts";

const ProductsList: FC = () => {
  const allProducts = useProducts();

  const { handleSearchChange, handleSortChange, sortedProducts } =
    useProductFilterAndSort<Item>(allProducts, null, "ascending");

  return (
    <div>
      <h2>Products</h2>
      <input
        type="text"
        placeholder="Search products"
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      <select
        onChange={(e) =>
          handleSortChange(e.target.value as keyof Item, "ascending")
        }
      >
        <option value="">Sort by</option>
        <option value="title">Title</option>
        <option value="imageUrl">Image URL</option>
        <option value="price">Price</option>
      </select>
      <select
        onChange={(e) =>
          handleSortChange(
            e.target.value as keyof Item,
            e.target.value as SortOption
          )
        }
      >
        <option value={SORT_TYPES.ASC}>Ascending</option>
        <option value={SORT_TYPES.DESC}>Descending</option>
        <option value={SORT_TYPES.NONE}>None</option>
      </select>
      {sortedProducts?.map((product: Item) => (
        <Product
          key={product.id}
          id={product.id}
          name={product.title}
          image={product.imageUrl}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default ProductsList;
