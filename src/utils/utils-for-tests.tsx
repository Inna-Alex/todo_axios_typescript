import React, { PropsWithChildren } from "react";
import { render, screen } from "@testing-library/react";
import type { RenderOptions } from '@testing-library/react'
import { Provider } from "react-redux";

import type { AppStore, RootState } from '../app/store'
import { setupStore } from '../app/store'


interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}> {children} </Provider>
    )
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export function hasInputValue(e: any, inputValue: any) {
  return screen.getByDisplayValue(inputValue) === e;
}
