import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";
import { deleteUser, getUsers } from "../store/users/users-slice";
import { usersSelector } from "../store/users/users.selector";
import "../styles/users.styles.css";

const UsersList: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector(usersSelector);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleEdit = (id: number) => {
    navigate(`users/${id}`);
  };

  const handleSave = () => {
    navigate("/create");
  };

  const handleDelete = (userId: number) => {
    dispatch(deleteUser({ id: userId }));
  };

  return (
    <div className="users-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Second Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.secondName}</td>
              <td>{user.age}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="create-btn" onClick={handleSave}>
        Create User
      </button>
    </div>
  );
};

export default UsersList;
