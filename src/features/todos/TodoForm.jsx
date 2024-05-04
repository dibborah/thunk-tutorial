import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "./todoSlice";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const {isLoadingAddTodo} = useSelector((state) => {
    return state.todos
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(title));
    setTitle("");
  };

  if(isLoadingAddTodo) {
    return <h1>Loading ...</h1>
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
