import React, { FC } from "react";
import { useUserForm } from "../../hooks/useUserForm";
import FormInput from "../signin/FormInput";

const MyProfile: FC = () => {
  const { user, isLoading, handleChange, handleSubmit } = useUserForm();

  return (
    <div>
      <h2>My Profile</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          id="firstName"
          name="firstName"
          value={user.firstName}
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
          id="phone"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          placeholder="Phone"
          type="tel"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
