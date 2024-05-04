import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
  const response = await axios.get("http://localhost:8001/todos");
  //   console.log(response.data);
  await pause(1500);
  return response.data;
});

export const addTodo = createAsyncThunk("add/fetch", async (title) => {
  const response = await axios.post("http://localhost:8001/todos", {
    title: title,
    completed: false,
  });
  await pause(1500);// resolve => execution of this line of code is completed
  //   console.log(response.data);
  return response.data;
});


const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}
const todoSlice = createSlice({
  name: "todos",
  initialState: {
    isLoadingFetchTodo: false,
    error: null,
    data: [],
    isLoadingAddTodo: false,
  },
  extraReducers: (builders) => {
    builders.addCase(fetchTodos.pending, (state, action) => {
      //   console.log("Pending");
      state.isLoadingFetchTodo = true;
    });
    builders.addCase(fetchTodos.fulfilled, (state, action) => {
      //   console.log("Fulfilled");
      state.data = action.payload;
      state.isLoadingFetchTodo = false;
    });
    builders.addCase(fetchTodos.rejected, (state, action) => {
      //   console.log("rejected");
      state.error = action.error;
      // console.log(action.error);
      state.isLoadingFetchTodo = false;
      state.error = state.error;
    });
    builders.addCase(addTodo.pending, (state, action) => {
      //   console.log("Pending");
      state.isLoadingAddTodo = true;
    });
    builders.addCase(addTodo.fulfilled, (state, action) => {
      //   console.log("Fulfilled");
      state.data.push(action.payload);
      state.isLoadingAddTodo = false;
    });
    builders.addCase(addTodo.rejected, (state, action) => {
      //   console.log("rejected");
      state.error = action.error;
      // console.log(action.error);
      state.isLoadingAddTodo = false;
      state.error = state.error;
    });
  },
});

export default todoSlice.reducer;
