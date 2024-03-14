import React, { FC } from "react";
import { useUserForm } from "../../hooks/useUserForm";
import FormInput from "../common/FormInput";

const Signup: FC = () => {
  const { user, isLoading, handleChange, handleSubmit } = useUserForm();

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <form onSubmit={handleSubmit}>
          <FormInput
            id="firstName"
            name="firstName"
            value={user?.firstName || ""}
            onChange={handleChange}
            placeholder="First Name"
            type="text"
          />
          <FormInput
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            type="text"
          />
          <FormInput
            id="imageUrl"
            name="imageUrl"
            value={user.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            type="text"
          />
          <FormInput
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
          />
          <FormInput
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
          />
          <FormInput
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            placeholder="Phone"
            type="tel"
          />
          <button type="submit">Sign Up</button>
        </form>
      )}
    </>
  );
};

export default Signup;
