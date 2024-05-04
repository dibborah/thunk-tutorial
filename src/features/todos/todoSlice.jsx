import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
  const response = await axios.get("http://localhost:8001/todos");
  //   console.log(response.data);
  //   await pause(1500);
  return response.data;
}); // get

export const addTodo = createAsyncThunk("todos/add", async (title) => {
  const response = await axios.post("http://localhost:8001/todos", {
    title: title,
    completed: false,
  });
  //   await pause(1500); // resolve => execution of this line of code is completed
  //   console.log(response.data);
  return response.data;
}); // post

export const deleteTodo = createAsyncThunk("todos/delete", async (id) => {
  const resonse = await axios.delete(`http://localhost:8001/todos/${id}`);
  //   await pause(1500); // resolve => execution of this line of code is completed
  //   console.log(response);
  return id;
}); // delete
export const toggleTodo = createAsyncThunk(
  "todos/toggle",
  async ({ id, completed }) => {
    const response = await axios.patch(`http://localhost:8001/todos/${id}`, {
      completed: !completed,
    });
    //   await pause(1500); // resolve => execution of this line of code is completed
    console.log(response.data);
    return response.data;
  }
); // patch

// put// entire resource

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    data: [],
  },
  extraReducers: (builders) => {
    builders.addCase(fetchTodos.pending, (state, action) => {
      //   console.log("Pending");
    });
    builders.addCase(fetchTodos.fulfilled, (state, action) => {
      //   console.log("Fulfilled");
      state.data = action.payload;
    });
    builders.addCase(fetchTodos.rejected, (state, action) => {
      //   console.log("rejected");
    });

    builders.addCase(addTodo.pending, (state, action) => {
      //   console.log("Pending");
    });
    builders.addCase(addTodo.fulfilled, (state, action) => {
      //   console.log("Fulfilled");
      state.data.push(action.payload);
    });
    builders.addCase(addTodo.rejected, (state, action) => {
      //   console.log("rejected");
    });

    builders.addCase(deleteTodo.pending, (state, action) => {
      //   console.log("Pending");
    });
    builders.addCase(deleteTodo.fulfilled, (state, action) => {
      //   console.log("Fulfilled");
      //   console.log("action from deleteTodo", action);
      state.data = state.data.filter((todo) => todo.id !== action.payload);
    });
    builders.addCase(deleteTodo.rejected, (state, action) => {
      //   console.log("rejected");
    });

    builders.addCase(toggleTodo.pending, (state, action) => {
      //   console.log("Pending");
    });
    builders.addCase(toggleTodo.fulfilled, (state, action) => {
      //   console.log("Fulfilled");
      //   state.data = state.data.map((todo) => {
      //     if (todo.id === action.payload) {
      //       return { ...todo, completed: !todo.completed };
      //     }
      //     return todo;
      //   });
      state.data.forEach((todo) => {// cannot initialise or set state.data here
        if (todo.id === action.payload.id) {
          todo.completed = action.payload.completed;
        }
      });
    });
    builders.addCase(toggleTodo.rejected, (state, action) => {
      //   console.log("rejected");
    });
  },
});

export default todoSlice.reducer;
