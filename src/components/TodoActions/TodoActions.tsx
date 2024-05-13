import React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md';
import classnames from 'classnames';

import styles from './todoActions.module.scss'

type Props = {
  handleUpdate: () => void
  handleDelete: () => void
}

function TodoActions({ handleUpdate, handleDelete }: Props) {
  return (
    <div className={styles.todoActions}>
      <div className={classnames(styles.icon, styles.icon__edit)}
        onClick={() => handleUpdate()}>
        <MdEdit />
      </div>
      <div className={classnames(styles.icon, styles.icon__delete)}
        onClick={() => handleDelete()}>
        <MdDelete />
      </div>
    </div>
  )
}

export default TodoActions;