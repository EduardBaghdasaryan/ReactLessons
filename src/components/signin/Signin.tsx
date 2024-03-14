import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInThunk } from "../../store/signin/signin-thunks";
import { AppDispatch } from "../../store";
import { ROUTES } from "../../constants";
import FormInput from "../common/FormInput";
import { SignIn } from "../../types/signin.types";
import { setUser } from "../../store/user/user-slice";

const Signin: FC = () => {
  const [formData, setFormData] = useState<SignIn>({
    email: "",
    password: "",
  });
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(signInThunk(formData)).then((action) => {
      const user = action.payload;
      dispatch(setUser(user));
    });
    navigate(ROUTES.HOME);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h2>Sign In</h2>
      <form className="form" onSubmit={handleSubmit}>
        <FormInput
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
        />
        <FormInput
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
        />
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
