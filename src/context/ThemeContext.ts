import React from 'react'
import {ThemeContextType} from '../@types/context'

export const themes = {
  light: {
      name: 'Light',
      foreground: '#646681',
      background: '#f8f8ff',
  },
  dark: {
      name: 'Dark',
      foreground: 'white',
      background: '#2e2e66',
  },
};

const ThemeContext = React.createContext<ThemeContextType>({
  theme: themes.light,
  setLightTheme: () => {},
  setDarkTheme: () => {},
});

export default ThemeContext