import React from "react";
import { Link, Route, Routes, useMatch } from "react-router-dom";
import MoviesList from "../movies/MoviesList";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li>
          <Link to={"/movies"}>Movies</Link>
        </li>
        <li>
          <Link to={"/admin"}>Admin</Link>
        </li>
      </ul>

      <Routes>
        <Route path="/movies" element={<MoviesList />} />
        <Route path="/admin" element={<MoviesList />} />
      </Routes>
    </div>
  );
};

export default Home;
