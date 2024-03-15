import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderComponent from "./Order";
import {
  selectOrders,
  selectOrdersLoading,
  selectOrdersError,
} from "../../store/orders/orders-selector";
import { fetchOrdersThunk } from "../../store/orders/orders-thunks";
import { AppDispatch } from "../../store";

const OrdersList: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const isLoading = useSelector(selectOrdersLoading);
  const error = useSelector(selectOrdersError);

  useEffect(() => {
    dispatch(fetchOrdersThunk());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Orders List</h2>
      {orders.map((order) => (
        <OrderComponent key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrdersList;
