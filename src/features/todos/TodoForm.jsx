import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "./todoSlice";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    dispatch(addTodo(title))
    .unwrap()
    .catch((error) => {
      setError(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
    setTitle("");
  };

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
