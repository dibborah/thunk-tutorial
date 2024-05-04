import { useEffect } from "react";
import { fetchTodos } from "./todoSlice";
import { useDispatch, useSelector } from "react-redux";

const TodoList = () => {
  const {
    isLoadingFetchTodo,
    data: todos,
    error,
  } = useSelector((state) => {
    return state.todos;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  if (isLoadingFetchTodo) {
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
