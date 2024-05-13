import React from 'react';
import axios from 'axios'
import { v4 as uuid } from 'uuid';
import { fireEvent, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";

import { renderWithProviders } from '../utils/utils-for-tests';
import App from '../components/App/App';
import * as Consts from '../utils/consts'
import { getFormatDate } from '../utils/getDate'

const mockedAxios = axios as jest.Mocked<typeof axios>

const noTodo = { data: [] }
const testTodoTitle = 'New task'
const testTodo = {
  data: {
    id: uuid(),
    title: testTodoTitle,
    status: Consts.Incomplete,
    time: getFormatDate((new Date()).toDateString())
  }
}

describe("Theme Light (Components)", () => {
  test('test initial theme - Light', async () => {
    mockedAxios.get.mockResolvedValue(noTodo);
    await act(async () => {
      renderWithProviders(<App />);
    });
    expect(await screen.findByText(/No Todos/i)).toBeInTheDocument()
    // header
    const appHeaderLight = document.querySelector('.appHeaderLight')
    expect(appHeaderLight).toBeInTheDocument()
    const appHeaderDark = document.querySelector('.appHeaderDark')
    expect(appHeaderDark).toBeNull
    // task counter
    const todoCounterLight = document.querySelector('.textLight')
    expect(todoCounterLight).toBeInTheDocument()
    const todoCounterDark = document.querySelector('.textDark')
    expect(todoCounterDark).toBeNull
    // button theme settings
    const settings_themeLight = document.querySelector('.themeLight')
    expect(settings_themeLight).toBeInTheDocument()
    const settings_themeDark = document.querySelector('.themeDark')
    expect(settings_themeDark).toBeNull
  })
})

describe("Theme Light (Form & Item)", () => {
  test('test initial (Form & Item) theme - Light', async () => {
    mockedAxios.get.mockResolvedValue(noTodo);
    await act(async () => {
      renderWithProviders(<App />);
    });
    expect(await screen.findByText(/No Todos/i)).toBeInTheDocument()
    const addButton = screen.getByText(/add task/i);
    expect(addButton).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(addButton)
    });
    // form
    const formLight = document.querySelector('.formLight')
    expect(formLight).toBeInTheDocument()
    const formDark = document.querySelector('.formDark')
    expect(formDark).toBeNull
    const inputTitle = document.querySelector(`input[name='title']`)
    fireEvent.change(inputTitle!, { target: { value: testTodoTitle } })
    const addTaskSubmit = document.querySelector(`button[type='submit'][class*='button__toAdd']`)
    mockedAxios.post.mockResolvedValue(testTodo)
    await act(async () => {
      fireEvent.click(addTaskSubmit!)
    })
    // item
    expect(await screen.findByText(/New task/i)).toBeInTheDocument()
    const itemLight = document.querySelector('.itemLight')
    expect(itemLight).toBeInTheDocument()
    const itemDark = document.querySelector('.itemDark')
    expect(itemDark).toBeNull
  })
})

describe("Toggle Theme to Dark (Components)", () => {
  test('test toggle theme to Dark', async () => {
    mockedAxios.get.mockResolvedValue(noTodo);
    await act(async () => {
      renderWithProviders(<App />);
    });
    expect(await screen.findByText(/No Todos/i)).toBeInTheDocument()
    const themeSetting = document.querySelector('.themeSetting')
    const themeToggler = themeSetting!.querySelector(`input[type='checkbox']`)
    await act(async () => {
      fireEvent.click(themeToggler!)
    })
    // header
    const appHeaderDark = document.querySelector('.appHeaderDark')
    expect(appHeaderDark).toBeInTheDocument()
    const appHeaderLight = document.querySelector('.appHeaderLight')
    expect(appHeaderLight).toBeNull
    // task counter
    const todoCounterDark = document.querySelector('.textDark')
    expect(todoCounterDark).toBeInTheDocument()
    const todoCounterLight = document.querySelector('.textLight')
    expect(todoCounterLight).toBeNull
    // button theme settings
    const settings_themeDark = document.querySelector('.themeDark')
    expect(settings_themeDark).toBeInTheDocument()
    const settings_themeLight = document.querySelector('.themeLight')
    expect(settings_themeLight).toBeNull
  })
})

describe("Toggle Theme to Dark (Form & Item)", () => {
  test('test toggle theme (Form & Item) to Dark', async () => {
    mockedAxios.get.mockResolvedValue(noTodo);
    await act(async () => {
      renderWithProviders(<App />);
    });
    expect(await screen.findByText(/No Todos/i)).toBeInTheDocument()
    const themeSetting = document.querySelector('.themeSetting')
    const themeToggler = themeSetting!.querySelector(`input[type='checkbox']`)
    await act(async () => {
      fireEvent.click(themeToggler!)
    })
    
    const addButton = screen.getByText(/add task/i);
    expect(addButton).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(addButton)
    });
    // form
    const formDark = document.querySelector('.formDark')
    expect(formDark).toBeInTheDocument()
    const formLight = document.querySelector('.formLight')
    expect(formLight).toBeNull
    const inputTitle = document.querySelector(`input[name='title']`)
    fireEvent.change(inputTitle!, { target: { value: testTodoTitle } })
    const addTaskSubmit = document.querySelector(`button[type='submit'][class*='button__toAdd']`)
    mockedAxios.post.mockResolvedValue(testTodo)
    await act(async () => {
      fireEvent.click(addTaskSubmit!)
    })
    // item
    expect(await screen.findByText(/New task/i)).toBeInTheDocument()
    const itemDark = document.querySelector('.itemDark')
    expect(itemDark).toBeInTheDocument()
    const itemLight = document.querySelector('.itemLight')
    expect(itemLight).toBeNull
  })
})