import React from 'react';
import classnames from 'classnames';
import styles from './settingsContainer.module.scss'
import TodoCounter from '../TodoCounter/TodoCounter';
import ThemeSettings from '../Settings/ThemeSettings'

function SettingsContainer({ counter }: ICounter) {
  return (
    <div className={styles.headerButtons}>
      <div className={classnames(styles.toFlex, styles.themeSetting)}>
        <ThemeSettings />
      </div>
      <div className={styles.toFlex}>
        <TodoCounter counter={counter} />
      </div>
    </div>
  )
}

export default SettingsContainer