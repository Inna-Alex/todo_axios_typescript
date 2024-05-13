import { SerializedError, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../app/store';
import { fetchTodosThunk, addTodoThunk, updateTodoThunk, deleteTodoThunk } from './todoThunk'

interface TodoState {
  filterStatus: string
  todoList: Array<ITodo>
  loadingTodoStatus: 'idle' | 'loading' | 'failed'
  errorLoadingTodos: SerializedError | null
  errorAddTodo: SerializedError | null
  errorUpdateTodo: SerializedError | null
  errorDeleteTodo: SerializedError | null
}

export const initialState: TodoState = {
  filterStatus: 'all',
  todoList: [],
  loadingTodoStatus: 'idle',
  errorLoadingTodos: null,
  errorAddTodo: null,
  errorUpdateTodo: null,
  errorDeleteTodo: null,
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosThunk.pending, (state) => {
        state.loadingTodoStatus = 'loading'
        state.errorLoadingTodos = null
      })
      .addCase(fetchTodosThunk.fulfilled, (state, action) => {
        state.todoList = [...action.payload]
        state.loadingTodoStatus = 'idle'
        state.errorLoadingTodos = null
      })
      .addCase(fetchTodosThunk.rejected, (state, action) => {
        state.loadingTodoStatus = 'failed'
        state.errorLoadingTodos = action.error
      })
      .addCase(addTodoThunk.fulfilled, (state, action) => {
        state.todoList.push(action.payload);
      })
      .addCase(addTodoThunk.rejected, (state, action) => {
        state.errorAddTodo = action.error
      })
      .addCase(updateTodoThunk.fulfilled, (state, action) => {
        state.todoList.forEach((todo) => {
          if (todo.id === action.payload.id) {
            todo.status = action.payload.status;
            todo.title = action.payload.title;
          }
        })
      })
      .addCase(updateTodoThunk.rejected, (state, action) => {
        state.errorUpdateTodo = action.error
      })
      .addCase(deleteTodoThunk.fulfilled, (state, action) => {
        state.todoList.forEach((todo, index) => {
          if (todo.id === action.payload) {
            state.todoList.splice(index, 1);
          }
        });
      })
      .addCase(deleteTodoThunk.rejected, (state, action) => {
        state.errorDeleteTodo = action.error
      })
  },
})

export const { updateFilterStatus } = todoSlice.actions

export const selectTodoList = (state: RootState) => state.todo.todoList
export const selectFilterStatus = (state: RootState) => state.todo.filterStatus
export const selectLoadingTodoStatus = (state: RootState) => state.todo.loadingTodoStatus
export const selectErrorLoadingTodos = (state: RootState) => state.todo.errorLoadingTodos
export const selectErrorAddTodo = (state: RootState) => state.todo.errorAddTodo
export const selectErrorUpdateTodo = (state: RootState) => state.todo.errorUpdateTodo
export const selectErrorDeleteTodo = (state: RootState) => state.todo.errorDeleteTodo

export default todoSlice.reducer