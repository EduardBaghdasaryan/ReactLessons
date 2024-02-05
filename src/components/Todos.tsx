import "../styles/todos.styles.css";

import axios from "axios";
import React, { FC, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../constants";
import { userIdSelector } from "../store/signin/sigin-selector";
import { setTodos } from "../store/todos/todos-slice";
import { todosSelector } from "../store/todos/todos.selector";
import TodoItem from "./TodoItem";

const Todos: FC = () => {
  const todos = useSelector(todosSelector);
  const userId = useSelector(userIdSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            userId: userId,
          },
        });
        dispatch(setTodos(response.data));
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="todos-container">
      <h2>Todos List</h2>
      <ul>
        {todos?.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default Todos;
