import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
  const response = await axios.get("http://localhost:8001/todos");
  //   console.log(response.data);
  return response.data;
});

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    isLoading: false,
    error: null,
    data: null,
  },
  extraReducers: (builders) => {
    builders.addCase(fetchTodos.pending, (state, action) => {
      //   console.log("Pending");
      state.isLoading = true;
    });
    builders.addCase(fetchTodos.fulfilled, (state, action) => {
      //   console.log("Fulfilled");
      state.data = action.payload;
      state.isLoading = false;
    });
    builders.addCase(fetchTodos.rejected, (state, action) => {
      //   console.log("rejected");
      state.error = action.error;
      // console.log(action.error);
      state.isLoading = false;
      state.error = state.error;
    });
  },
});

export default todoSlice.reducer;
