import React from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios'
import { fireEvent, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";

import { renderWithProviders } from '../utils/utils-for-tests';
import App from '../components/App/App';
import * as Consts from '../utils/consts'
import { getFormatDate } from '../utils/getDate'
import { hasInputValue } from '../utils/utils-for-tests';

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
const emptyTestTodo = {
  data: {
    id: uuid(),
    title: '',
    status: Consts.Incomplete,
    time: getFormatDate((new Date()).toDateString())
  }
}

describe("Add Task Button", () => {
  test('press Add Task button and create new incomplete Todo', async () => {
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
    expect(await screen.findByText(/Add TODO/i)).toBeInTheDocument()
    const addTasks = screen.findAllByText(/Add Task/i);
    (await addTasks).forEach(elem => expect(elem).toBeInTheDocument())
    expect(await screen.findByText(/Cancel/i)).toBeInTheDocument()
    expect(await screen.findByText(/Title/i)).toBeInTheDocument()
    expect(await screen.findByText(/Status/i)).toBeInTheDocument()
    expect(await screen.findByText(/Incomplete/i)).toBeInTheDocument()
    const inputTitle = document.querySelector(`input[name='title']`)
    fireEvent.change(inputTitle!, { target: { value: testTodoTitle } })
    expect(hasInputValue(inputTitle, testTodoTitle)).toBeTruthy()
    mockedAxios.post.mockResolvedValue(testTodo);
    const addTaskSubmit = document.querySelector(`button[type='submit'][class*='button__toAdd']`)
    await act(async () => {
      fireEvent.click(addTaskSubmit!)
    });
    expect(screen.queryByText(/No Todos/i)).not.toBeInTheDocument()
    expect(await screen.findByText(/New task/i)).toBeInTheDocument()
    const numberOfTasks = document.querySelector('.counterText')
    expect(numberOfTasks!.textContent).toBe('1')
  })

  test('press Add Task button and then Cancel', async () => {
    mockedAxios.get.mockResolvedValue(noTodo);
    await act(async () => {
      renderWithProviders(<App />);
    });
    expect(await screen.findByText(/No Todos/i)).toBeInTheDocument()
    const addButton = screen.getByText(/add task/i);
    await act(async () => {
      fireEvent.click(addButton)
    });
    const inputTitle = document.querySelector(`input[name='title']`)
    fireEvent.change(inputTitle!, { target: { value: testTodoTitle } })
    expect(hasInputValue(inputTitle, testTodoTitle)).toBeTruthy()
    const cancelTask = document.querySelector(`button[class*='button__toCancel']`)
    await act(async () => {
      fireEvent.click(cancelTask!)
    });
    expect(screen.queryByText(/No Todos/i)).toBeInTheDocument()
    expect(screen.queryByText(/New task/i)).not.toBeInTheDocument()
    const numberOfTasks = document.querySelector('.counterText')
    expect(numberOfTasks!.textContent).toBe('0')
  })

  test('press Add Task button and validate empty title', async () => {
    mockedAxios.get.mockResolvedValue(noTodo);
    await act(async () => {
      renderWithProviders(<App />);
    });
    expect(await screen.findByText(/No Todos/i)).toBeInTheDocument()
    const addButton = screen.getByText(/add task/i);
    expect(addButton).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(addButton)
    });
    expect(await screen.findByText(/Add TODO/i)).toBeInTheDocument()
    mockedAxios.post.mockResolvedValue(emptyTestTodo)
    const addTaskSubmit = document.querySelector(`button[type='submit'][class*='button__toAdd']`)
    await act(async () => {
      fireEvent.click(addTaskSubmit!)
    })
    expect(await screen.findByText(/Title is required/i)).toBeInTheDocument()
    const errTitleText = document.querySelector('.errTitleText')
    expect(errTitleText).toBeInTheDocument()
  })
})
