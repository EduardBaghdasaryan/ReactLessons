import React, { FC, useState } from "react";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ROUTES } from "../constants";
import UsersList from "./Users";
import UserItem from "./UserItem";

const App: FC = () => {
  return (
    <Router>
      <Routes>
        {<Route path={ROUTES.HOME} element={<UsersList />} />}
        {<Route path={ROUTES.USERS} element={<UserItem />} />}
        {<Route path={ROUTES.CREATE} element={<UserItem />} />}

        <Route path="*" element={<UsersList />} />
      </Routes>
    </Router>
  );
};

export default App;
