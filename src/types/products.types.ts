import { Common } from ".";

export type Product = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  count: number;
  price: number;
};
export interface ProductsInitialState extends Common {
  products: Product[];
}
