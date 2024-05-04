import { useState } from "react";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const handleSubmit = () => {};
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
