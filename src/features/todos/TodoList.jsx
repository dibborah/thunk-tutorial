import { useEffect, useState } from "react";
import { fetchTodos } from "./todoSlice";
import { useDispatch, useSelector } from "react-redux";

const TodoList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { data: todos } = useSelector((state) => {
    return state.todos;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchTodos())
      .unwrap()
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      {todos &&
        todos.map((todo) => {
          return <div key={todo.id}>{todo.title}</div>;
        })}
    </div>
  );
};

export default TodoList;
