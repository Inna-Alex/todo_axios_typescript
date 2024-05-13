import { combineReducers, configureStore, Middleware, createAction } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import todoReducer from '../slices/todoSlice'

// middleware. just for fun
const updateAction = createAction<ITodo>('todo/updateTodo/fulfilled')
const updater: Middleware<{}, RootState> = (store) => (next) => (action) => {
  if (updateAction.match(action)) {
    action.payload!.title = `${action.payload!.title}1`;
  }
  return next(action);
}

const rootReducer = combineReducers({
  todo: todoReducer
})

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(logger, updater),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
