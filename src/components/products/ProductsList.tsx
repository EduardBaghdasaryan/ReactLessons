import React, { FC } from "react";
import { SORT_TYPES } from "../../constants";
import useProductFilterAndSort from "../../hooks/useProductFilterAndSort";
import useProducts from "../../hooks/useProducts";
import { Item, SortOption } from "../../types/products.types";
import Product from "./Product";
import useShoppingCart from "../../hooks/useShoppingCart";

const ProductsList: FC = () => {
  const allProducts = useProducts();
  const { addToCart } = useShoppingCart();

  const { handleSearchChange, handleSortChange, sortedProducts } =
    useProductFilterAndSort<Item>(allProducts, null, "ascending");

  const handleAddToCart = (productId: string) => {
    const productToAdd = sortedProducts.find(
      (product) => product.id === productId
    );
    if (productToAdd) {
      addToCart(productToAdd);
    }
  };

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
          onAddToCart={() => handleAddToCart(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductsList;
