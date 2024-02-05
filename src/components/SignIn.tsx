import "../styles/signin.styles.css";

import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { ROUTES, initialUserCredentials } from "../constants";
import store from "../store";
import { setSignedIn } from "../store/signin/signin-slice";
const isAuth = store.getState().signIn.isAuth;

const SignIn: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      email === initialUserCredentials.email &&
      password === initialUserCredentials.password
    ) {
      dispatch(
        setSignedIn({
          isAuth: true,
          id: initialUserCredentials.id,
        })
      );

      navigate(ROUTES.TODOS);
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
