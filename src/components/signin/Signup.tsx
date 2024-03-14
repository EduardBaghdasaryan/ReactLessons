import React, { FC, useState } from "react";
import { User } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { signUpThunk } from "../../store/signin/signin-thunks";
import { isLoadingSelector } from "../../store/signin/signin-selector";
import { useSelector } from "react-redux";

const Signup: FC = () => {
  const [user, setUser] = useState<User>({
    id: "",
    firstName: "",
    lastName: "",
    imageUrl: "",
    email: "",
    password: "",
    phone: "",
  });

  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector(isLoadingSelector);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(signUpThunk(user));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
          <input
            type="text"
            name="imageUrl"
            value={user.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
          />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <input
            type="tel"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          <button type="submit">Sign Up</button>
        </form>
      )}
    </>
  );
};

export default Signup;
