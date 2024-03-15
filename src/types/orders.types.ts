import { Common } from ".";
import { Item } from "./products.types";

export type Order = {
  id?: string;
  date: string;
  items: Item[];
};

export interface OrdersInitialState extends Common {
  orders: Order[];
}

export type OrderProps = {
  order: Order;
};
