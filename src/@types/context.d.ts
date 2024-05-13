interface ITheme {
  name: string
  foreground: string
  background: string
}

export type ThemeContextType = {
  theme: ITheme
  setLightTheme: () => void
  setDarkTheme: () => void
}
