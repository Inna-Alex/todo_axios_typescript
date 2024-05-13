import React, { useContext, CSSProperties } from "react";
import { v4 as uuid } from 'uuid';
import { format } from 'date-fns';
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import Select, { StylesConfig } from 'react-select';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import classnames from 'classnames';
import toast from 'react-hot-toast'

import styles from './baseChangeForm.module.scss'
import Button, { buttonTypes } from '../Button/Button'
import { statusOptions } from '../FilterButton/FilterButton'
import * as Consts from '../../utils/consts'
import ThemeContext from '../../context/ThemeContext'
import { addTodoThunk, updateTodoThunk } from '../../slices/todoThunk'
import { selectErrorAddTodo, selectErrorUpdateTodo } from '../../slices/todoSlice'
import { useAppDispatch } from '../../app/hooks'

type FormValues = {
  title: string
  todoStatus: {
    value: string
    label: string
  }
}

const controlColourStyles: CSSProperties = {
  backgroundColor: '#fff',
  fontWeight: 500,
}
const optionColourStyles = ({ isDisabled, isFocused, isSelected }: OptionState) => {
  return {
    backgroundColor: isDisabled ? '#dedfe1' : isSelected ? '#cccdde' : isFocused ? '#646681' : '#fff',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    fontWeight: 500,
    color: isFocused && !isSelected ? '#fff' : '#000'
  }
}
const selectStyle: StylesConfig<OptionType, IsMulti> = {
  control: (baseStyles) => {
    return {
      ...baseStyles,
      ...controlColourStyles
    };
  },
  option: (baseStyles, state) => {
    return {
      ...baseStyles,
      ...optionColourStyles({
        isDisabled: state.isDisabled, 
        isFocused: state.isFocused,
        isSelected: state.isSelected})
    }
  }
}

const validationSchema = yup
  .object()
  .shape({
    title: yup.string()
      .required('Title is required')
      .max(50, 'Task is too big! You will never do it!'),
    todoStatus: yup.object().shape({
      value: yup.string().required(),
      label: yup.string().required()
    })
      .required('Please select a status')
      .oneOf(statusOptions, 'Status can be either Incomplete or Completed'),
  })
  .required()

const createTodo = (todo: TodoType) => {
  return {
    id: todo.id ? todo.id : uuid(),
    title: todo.title,
    status: todo.todoStatus ? todo.todoStatus!.value : todo.status ? todo.status : '',
    time: todo.time ? todo.time : format(new Date(), Consts.DateFormat),
  }
}

export const BaseChangeForm = ({ type, setOpen, todo }: FormProps) => {
  const dispatch = useAppDispatch()
  const { theme } = useContext(ThemeContext)
  const errorAddTodo = useSelector(selectErrorAddTodo)
  const errorUpdateTodo = useSelector(selectErrorUpdateTodo)
  const buttonText = type === buttonTypes.toAdd ? 'Add Task' : 'Update Task'
  const defaultValues = {
    title: todo ? todo.title : '',
    status: todo ? todo.status : Consts.Incomplete,
  }
  const defaultValue = statusOptions.find(opt => opt.value == defaultValues.status)
  const { register, handleSubmit, control, formState: { errors }, } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues
  });
  const onSubmit = (data: TodoType) => {
    if (type === buttonTypes.toAdd) {
      dispatch(addTodoThunk(createTodo(data)))
      if (errorAddTodo) {
        toast.error(`Todo Add Error: ${errorAddTodo?.message}`);
      }
    } 
    else if (type === buttonTypes.toUpdate) {
      if (todo!.title !== data.title || todo!.status !== data.todoStatus!.value) {
        const updatedTodo = createTodo({ 
          id: todo!.id, 
          title: data.title, 
          status: data.todoStatus!.value, 
          time: todo!.time })
        dispatch(updateTodoThunk(updatedTodo))
        if (errorUpdateTodo) {
          toast.error(`Todo Update Error: ${errorUpdateTodo?.message}`);
        }
      }
    }
    setOpen(false)
  }

  return (
    <form className={classnames(styles.form, styles[`form${theme.name}`])} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={classnames(styles.formTitle, styles[`form${theme.name}`])}>
        {type === buttonTypes.toAdd ? 'Add' : 'Update'} TODO
      </h1>
      <label htmlFor="title">
        Title
        <input className={errors.title && styles.errTitleField} id="title" {...register("title")} />
      </label>
      {errors.title && <div className={styles.errTitleText}>{errors.title.message}</div>}
      <span>Status</span>
      <Controller
        render={({ field }) => (
          <Select {...field}
            className={styles.select}
            options={statusOptions}
            styles={selectStyle}
          />
        )}
        control={control}
        name="todoStatus"
        defaultValue={defaultValue}
      />
      {errors.todoStatus && <div className={styles.errStatusText}>{errors.todoStatus.message}</div>}
      <div className={styles.ButtonContainer}>
        <Button type="submit" kind={type}>
          {buttonText}
        </Button>
        <Button kind={buttonTypes.toCancel} onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  )
}