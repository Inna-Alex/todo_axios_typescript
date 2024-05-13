import React, { useContext, PropsWithChildren } from 'react';
import classnames from 'classnames';
import styles from './appHeader.module.scss'
import ThemeContext from '../../context/ThemeContext';
import { ITheme } from '../../@types/context';

function setBodyTheme(theme: ITheme) {
  const bodyElem = document.querySelector('body');
  bodyElem?.style.setProperty('background-color', theme.background)
}

function AppHeader({ children, ...rest }: PropsWithChildren<{}>) {
  const { theme } = useContext(ThemeContext)
  setBodyTheme(theme)

  return (
    <div className={classnames(
      styles.appHeader, styles[`appHeader${theme.name}`]
    )} {...rest}>
      {children}
    </div>
  );
}

export default AppHeader;