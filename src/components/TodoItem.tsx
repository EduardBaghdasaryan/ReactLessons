import React from "react";
import { TodoItemProps } from "../interfaces/todos.types";

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <span>{todo.title}</span>
    </li>
  );
};

export default TodoItem;
