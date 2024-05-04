import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo } from "./todoSlice";

const SingleTodo = ({ todo }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };
  const handleToggle = () => {
    dispatch(toggleTodo({id: todo.id,completed: todo.completed}))
  };
  return (
    <div style={{ border: "2px solid black", padding: "2rem", margin: "1rem" }}>
      <p>id:{todo.id}</p>
      <p>title:{todo.title}</p>
      <p>completed:{todo.completed ? "completed" : "not completed"}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleToggle}>Toggle</button>
    </div>
  );
};

export default SingleTodo;
