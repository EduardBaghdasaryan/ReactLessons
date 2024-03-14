import { Common } from ".";

export type Item = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  count: number;
  price: number;
};
export interface ProductsInitialState extends Common {
  products: Item[];
}

export type ProductProps = {
  name: string;
  image: string;
  price: number;
  id: string | number;
  count?: number;
  description?: string;
  onAddToCart: () => void;
};

export type FilterAndSortOptions<T> = {
  searchTerm: string;
  sortProperty: keyof T | null;
  sortOption: SortOption;
};

export type SortOption = "none" | "ascending" | "descending";
