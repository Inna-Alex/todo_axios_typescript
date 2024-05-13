import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import styles from './appContent.module.scss'
import { selectTodoList, selectFilterStatus, selectLoadingTodoStatus,
  selectErrorLoadingTodos } from '../../slices/todoSlice'
import { fetchTodosThunk } from '../../slices/todoThunk'
import TodoItem from '../TodoItem/TodoItem';
import SettingsContainer from '../SettingsContainer/SettingsContainer'
import ErrorWrapper from '../ErrorWrapper/ErrorWrapper'
import { useAppDispatch } from '../../app/hooks'

function AppContent() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchTodosThunk())
  }, [])
  const todoLoadingStatus = useSelector(selectLoadingTodoStatus)
  const loadingFail = todoLoadingStatus === 'failed'
  const errorLoadingTodos = useSelector(selectErrorLoadingTodos)
  const todoList = useSelector(selectTodoList)
  const filterStatus = useSelector(selectFilterStatus)
  const sortedTodoList = [...todoList]
  sortedTodoList.sort((a, b) => new Date(b.time).valueOf() - new Date(a.time).valueOf());

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });

  return (
    <>
      <SettingsContainer counter={filteredTodoList.length} />
      <div className={styles.content__wrapper}>
        {loadingFail && <ErrorWrapper message={errorLoadingTodos?.message}/>}
        {!loadingFail && filteredTodoList && filteredTodoList.length > 0 ? (
          filteredTodoList.map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))
        ) : !loadingFail ? (
          <div className={styles.emptyText}>
            No Todos
          </div>
        ) : ''}
      </div>
    </>
  )
}

export default AppContent;