import React, { FC } from "react";
import SignIn from "./signin/Signin";

import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ROUTES } from "../constants/index";
import { isAuthSelector } from "../store/signin/signin-selector";
import SignupForm from "./signin/Signup";

const App: FC = () => {
  const isAuth = useSelector(isAuthSelector);
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
        <Route path={ROUTES.SIGN_UP} element={<SignupForm />} />

        <Route path="*" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default App;
