import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ROUTES } from "../constants/index";
import { isAuthSelector } from "../store/signin/signin-selector";
import SignIn from "./signin/Signin";
import Signup from "./signin/Signup";
import Home from "./home/Home";
import MyProfile from "./profile/MyProfile";
import ProductsList from "./products/ProductsList";
import ProductDetails from "./products/ProductDetails";
import ShoppingList from "./shopping/ShoppingList";
import OrdersList from "./orders/OrdersList";
import CreateProduct from "./admin/AddProduct";

const App: FC = () => {
  const isAuth = useSelector(isAuthSelector);

  return (
    <Router>
      <Routes>
        <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
        <Route path={ROUTES.SIGN_UP} element={<Signup />} />
        {isAuth && (
          <>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.MY_PROFILE} element={<MyProfile />} />
            <Route path={ROUTES.PRODUCT_LIST} element={<ProductsList />} />
            <Route path={ROUTES.PRODUCT_DETAILS} element={<ProductDetails />} />
            <Route path={ROUTES.SHOPPING_CART} element={<ShoppingList />} />
            <Route path={ROUTES.ORDERS} element={<OrdersList />} />
            <Route path={ROUTES.ADMIN} element={<CreateProduct />} />
          </>
        )}
        <Route path="*" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default App;
