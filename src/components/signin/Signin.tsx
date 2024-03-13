import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { signUpThunk } from "../../store/signin/signin-thunks";

const Signin: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(signUpThunk(user));
  };

  return (
    <div className="container">
      <h2>Sign In</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" className="input" />
        </div>
        <div className="formGroup">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="input"
          />
        </div>
        <button type="submit" className="button">
          Sign In
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Signin;
