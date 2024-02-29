import React, { FC } from "react";
import SignIn from "./signin/Signin";

import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ROUTES } from "../constants/index";
import { isAuthSelector } from "../store/signin/signin-selector";
import Home from "./home/Home";
import MovieList from "./movies/MoviesList";
import AddMovie from "./admin/AddMovie";
import MovieDetails from "./movies/MovieDetails";

const App: FC = () => {
  const isAuth = useSelector(isAuthSelector);
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
        {isAuth && <Route path={ROUTES.HOME} element={<Home />} />}
        {isAuth && <Route path={ROUTES.MOVIES} element={<MovieList />} />}
        {isAuth && <Route path={ROUTES.ADMIN} element={<AddMovie />} />}
        {isAuth && (
          <Route path={ROUTES.MOVIES_BY_ID} element={<MovieDetails />} />
        )}
        <Route path="*" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default App;
