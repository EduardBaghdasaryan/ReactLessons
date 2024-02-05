type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type TodosProps = {
  todos: Todo[];
};

type TodoItemProps = {
  todo: {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  };
};

export { Todo, TodosProps, TodoItemProps };
