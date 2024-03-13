import React, { FC } from "react";

const Signin: FC = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = (event.target as any).email.value;
    const password = (event.target as any).password.value;
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
    </div>
  );
};

export default Signin;
