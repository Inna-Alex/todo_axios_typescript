import React, { useContext } from 'react';
import classnames from 'classnames';
import ToggleButton from 'react-toggle-button'
import ThemeContext, { themes } from '../../context/ThemeContext';
import styles from './settings.module.scss'

function ThemeSettings() {
  const { theme, setDarkTheme, setLightTheme } = useContext(ThemeContext);
  const isDark = theme === themes.dark

  return (
    <>
      <ToggleButton
        value={isDark}
        onToggle={!isDark ? setDarkTheme : setLightTheme}
      />
      <div className={classnames(styles.themeText, styles[`theme${theme.name}`])}>Dark</div>
    </>
  )
}

export default ThemeSettings