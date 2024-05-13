import { createAsyncThunk } from '@reduxjs/toolkit';
import APIClient from '../api/APIClient';
import { getTodos, postTodo, delTodo } from '../routes/routes'
import { APIBadConnection, ErrorFromAPI } from '../utils/errors'


export const fetchTodosThunk = createAsyncThunk(
  'todo/fetchTodos',
  async () => {
    const response = await APIClient.get(getTodos);
    if (response) return response.data
    throw Error(APIBadConnection)
  }
)

export const addTodoThunk = createAsyncThunk(
  'todo/addTodo',
  async (todo: ITodo) => {
    const response = await APIClient.post(postTodo, todo);
    if ('error_msg' in response.data) {
      throw new ErrorFromAPI(response.data)
    }
    return response.data;
  }
);

export const updateTodoThunk = createAsyncThunk(
  'todo/updateTodo',
  async (todo: ITodo) => {
    const response = await APIClient.post(postTodo, todo);
    if ('error_msg' in response.data) {
      throw new ErrorFromAPI(response.data)
    }
    return response.data;
  }
);

export const deleteTodoThunk = createAsyncThunk(
  'todo/deleteTodo',
  async (todo_id: string) => {
    const response = await APIClient.delete(delTodo(todo_id));
    return response.data;
  }
);