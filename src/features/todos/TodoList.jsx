import { useEffect } from "react";
import { fetchTodos } from "./todoSlice";
import { useDispatch } from "react-redux";

const TodoList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  return <div>TodoList</div>;
};

export default TodoList;
