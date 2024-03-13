import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants";

const Home: FC = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={ROUTES.MY_PROFILE}>My Profile</Link>
          </li>
          <li>
            <Link to={ROUTES.PRODUCT_LIST}>Product List</Link>
          </li>
          <li>
            <Link to={ROUTES.PRODUCT_DETAILS}>Product Details</Link>
          </li>
          <li>
            <Link to={ROUTES.SHOPPING_CART}>Shopping Cart</Link>
          </li>
          <li>
            <Link to={ROUTES.ORDERS}>Orders</Link>
          </li>
          <li>
            <Link to={ROUTES.ADMIN}>Admin</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
