import React, { useContext } from 'react';
import classnames from 'classnames';
import styles from './todoCounter.module.scss'
import ThemeContext from '../../context/ThemeContext'

function TodoCounter({ counter }: ICounter) {
  const { theme } = useContext(ThemeContext)

  return (
    <div className={classnames(styles.counterAll, styles[`text${theme.name}`])}>
      <div>
        Number of tasks:
        <span className={styles.counterText}>
          {counter}
        </span>
      </div>
    </div>
  )
}

export default TodoCounter;