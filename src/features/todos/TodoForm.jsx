import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "./todoSlice";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(addTodo(title))
      .unwrap()
      .then(() => {
        setTitle("");
      })
      .catch((error) => {
        // new Error (setError(<p>Error exists</p>));
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>{error && <p style={{ color: "red" }}>{error.message}</p>}</div>

      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Adding" : "Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;
