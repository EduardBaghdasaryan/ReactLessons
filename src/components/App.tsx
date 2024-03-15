import React, { FC } from "react";
import SignIn from "./signin/Signin";

import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ROUTES } from "../constants/index";
import { isAuthSelector } from "../store/signin/signin-selector";
import Signup from "./signin/Signup";
import Home from "./home/Home";
import MyProfile from "./profile/MyProfile";
import ProductsList from "./products/ProductsList";
import ProductDetails from "./products/ProductDetails";
import ShoppingList from "./shopping/ShoppingList";
import OrdersList from "./orders/OrdersList";

const App: FC = () => {
  const isAuth = useSelector(isAuthSelector);
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
        <Route path={ROUTES.SIGN_UP} element={<Signup />} />
        {isAuth && <Route path={ROUTES.HOME} element={<Home />} />}
        {isAuth && <Route path={ROUTES.MY_PROFILE} element={<MyProfile />} />}
        {isAuth && (
          <Route path={ROUTES.PRODUCT_LIST} element={<ProductsList />} />
        )}
        {isAuth && (
          <Route path={ROUTES.PRODUCT_DETAILS} element={<ProductDetails />} />
        )}
        {isAuth && (
          <Route path={ROUTES.SHOPPING_CART} element={<ShoppingList />} />
        )}
        {isAuth && <Route path={ROUTES.ORDERS} element={<OrdersList />} />}
        <Route path="*" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default App;
