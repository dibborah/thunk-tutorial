import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todos/todoSlice";

export const store = configureStore({
  reducer: { 
    todos: todoReducer// the key value pair here is very important especially the name todos
    // "todos" will the name of the state object when we access it
 },
});
