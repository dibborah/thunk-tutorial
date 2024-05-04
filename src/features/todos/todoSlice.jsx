import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
  const response = await axios.get("http://localhost:8001/todosTTT");
//   console.log(response.data);
  return response.data;
});

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  extraReducers: (builders) => {
    builders.addCase(fetchTodos.pending, (state,actions) => {
      console.log("Pending");
      console.log(actions.type);
    });
    builders.addCase(fetchTodos.fulfilled, (state, actions) => {
      console.log("Fulfilled");
      console.log(actions.payload);
      console.log(actions.type);
    });
    builders.addCase(fetchTodos.rejected, (state, actions) => {
        console.log("rejected");
        console.log(actions.error);
    });
  }
});

export default todoSlice.reducer;
