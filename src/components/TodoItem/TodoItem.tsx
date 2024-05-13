import React, { useEffect, useState, useContext } from 'react'
import classnames from 'classnames';

import styles from './todoItem.module.scss'
import { updateTodoThunk } from '../../slices/todoThunk';
import { getFormatDate } from '../../utils/getDate'
import ModalForm from '../ModalForm/ModalForm'
import { buttonTypes } from '../Button/Button'
import CheckboxMain from '../CheckboxMain/CheckboxMain'
import TodoActions from '../TodoActions/TodoActions'
import * as Consts from '../../utils/consts'
import ThemeContext from '../../context/ThemeContext';
import { useAppDispatch } from '../../app/hooks'

type Props = {
  todo: ITodo
}

function TodoItem({ todo }: Props) {
  const dispatch = useAppDispatch()
  const { theme } = useContext(ThemeContext)
  const [isOpen, setOpen] = useState(false);
  const [actionType, setActionType] = useState(buttonTypes.toAdd);
  const [isCompleted, setIsCompleted] = useState(todo.status === Consts.Completed)

  useEffect(() => {
    setIsCompleted(todo.status === Consts.Completed)
  }, [isOpen, todo])

  const handleDelete = () => {
    setActionType('toDelete')
    setOpen(true)
  }

  const handleUpdate = () => {
    setActionType('toUpdate')
    setOpen(true)
  }

  const onCheck = () => {
    setIsCompleted(!isCompleted)
    const updatedStatus = isCompleted ? Consts.Incomplete : Consts.Completed
    dispatch(updateTodoThunk({...todo, status: updatedStatus}))
  }

  return (
    <div className={classnames(styles.item, styles[`item${theme.name}`])}>
      <div className={styles.todoDetails}>
        <div>
          <CheckboxMain isChecked={isCompleted} onCheck={onCheck} />
        </div>
        <div className={styles.texts}>
        <div
            className={classnames(
              styles.todoText,
              styles[`todo${theme.name}`],
              isCompleted && styles['todoText--completed'],
            )}
          >
            {todo.title}
          </div>
          <div className={classnames(styles.time, styles[`todo${theme.name}`],)}>
            {getFormatDate(todo.time)}
          </div>
        </div>
      </div>
      <TodoActions handleUpdate={handleUpdate} handleDelete={handleDelete} />
      <ModalForm isOpen={isOpen} setOpen={setOpen} triggerShow={false} type={actionType} todo={todo} />
    </div>
  )
}

export default TodoItem