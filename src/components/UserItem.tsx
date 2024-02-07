import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../store";
import { createUser, updateUser } from "../store/users/users-slice";
import { usersSelector } from "../store/users/users.selector";
import "../styles/user.styles.css";
import { User } from "../types/user.types";

const UserItem: FC = () => {
  const users = useSelector(usersSelector);
  const { id } = useParams();

  const user = id ? users.find((user) => user?.id === +id) : null;

  const [firstName, setFirstName] = useState<string>(user?.firstName || "");
  const [secondName, setSecondName] = useState<string>(user?.secondName || "");
  const [age, setAge] = useState<number | "">(user?.age || "");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = async () => {
    if (firstName && secondName && age) {
      const userId = Math.floor(Math.random() * 10);
      const userData: User = {
        id: userId,
        firstName,
        secondName,
        age: age,
      };

      id
        ? await dispatch(updateUser({ id: userId, data: userData }))
        : dispatch(createUser({ data: userData }));
      navigate("/users");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="edit-user-modal">
      <h2>Edit User</h2>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Second Name:
        <input
          type="text"
          name="secondName"
          value={secondName}
          onChange={(e) => setSecondName(e.target.value)}
        />
      </label>
      <label>
        Age:
        <input
          type="number"
          name="age"
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value))}
        />
      </label>
      <div className="buttons">
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
        <button className="cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UserItem;
