import React, { useContext, Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast'
import classnames from 'classnames';

import styles from './baseDeleteForm.module.scss'
import Button, { buttonTypes } from '../Button/Button'
import ThemeContext from '../../context/ThemeContext'
import { deleteTodoThunk } from '../../slices/todoThunk'
import { selectErrorDeleteTodo } from "../../slices/todoSlice"
import { useAppDispatch } from '../../app/hooks'


export const BaseDeleteForm = ({ type, setOpen, todo }: FormProps) => {
  const { theme } = useContext(ThemeContext)
  const dispatch = useAppDispatch()
  const { handleSubmit, } = useForm();
  const errorDeleteTodo = useSelector(selectErrorDeleteTodo)
  const onSubmit = () => {
    dispatch(deleteTodoThunk(todo!.id))
    setOpen(false)
    if (errorDeleteTodo) {
      toast.error(`Todo Delete Error: ${errorDeleteTodo?.message}`)
    }
  }

  return (
    <form className={classnames(styles.form, styles[`form${theme.name}`])} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.formTitle}>
        Delete TODO
      </h1>
      <h2>Are you sure? Are you too lazy to do it?</h2>
      <div className={styles.ButtonContainer}>
        <Button type="submit" kind={type}>
          To be lazy
        </Button>
        <Button kind={buttonTypes.toCancel} onClick={() => setOpen(false)}>
          Cancel (Great!)
        </Button>
      </div>
    </form>
  )
}