import React, { FC } from "react";
import SignIn from "./SignIn";
import Todos from "./Todos";

import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ROUTES } from "../constants";
import { isAuthSelector } from "../store/signin/sigin-selector";

const App: FC = () => {
  const isAuth = useSelector(isAuthSelector);
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
        {isAuth && <Route path={ROUTES.TODOS} element={<Todos />} />}
        <Route path="*" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default App;
