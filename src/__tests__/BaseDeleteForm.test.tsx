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

const testTodoTitle = 'New task'
const initTodo = {
  id: uuid(),
  title: testTodoTitle,
  status: Consts.Incomplete,
  time: getFormatDate((new Date()).toDateString())
}
const initTodoList = { data: [initTodo] }

describe("Base Delete Form", () => {
  test('press Delete Task button', async () => {
    mockedAxios.get.mockResolvedValue(initTodoList);
    await act(async () => {
      renderWithProviders(<App />);
    })
    expect(await screen.findByText(/New task/i)).toBeInTheDocument()
    const deleteButton = document.querySelector(`div[class*='icon__delete']`)
    await act(async () => {
      fireEvent.click(deleteButton!)
    })
    const deleteTask = document.querySelector(`button[class*='button__toDelete']`)
    mockedAxios.delete.mockResolvedValue({data: initTodo.id})
    await act(async () => {
      fireEvent.click(deleteTask!)
    })
    expect(await screen.findByText(/No Todos/i)).toBeInTheDocument()
  })
  test('press Delete Task button and then Cancel', async () => {
    mockedAxios.get.mockResolvedValue(initTodoList);
    await act(async () => {
      renderWithProviders(<App />);
    })
    expect(await screen.findByText(/New task/i)).toBeInTheDocument()
    const deleteButton = document.querySelector(`div[class*='icon__delete']`)
    await act(async () => {
      fireEvent.click(deleteButton!)
    })
    const cancelTask = document.querySelector(`button[class*='button__toCancel']`)
    await act(async () => {
      fireEvent.click(cancelTask!)
    })
    expect(await screen.findByText(/New task/i)).toBeInTheDocument()
  })
})