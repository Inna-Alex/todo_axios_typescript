import React from 'react';
import axios from 'axios'
import { v4 as uuid } from 'uuid';
import { fireEvent, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";

import { renderWithProviders } from '../utils/utils-for-tests';
import App from '../components/App/App';
import * as Consts from '../utils/consts'
import { getFormatDate } from '../utils/getDate'
import { hasInputValue } from '../utils/utils-for-tests';

const mockedAxios = axios as jest.Mocked<typeof axios>

const testTodoTitle = 'New task'
const updatedTitle = 'Updated task'
const initTodo = {
  id: uuid(),
  title: testTodoTitle,
  status: Consts.Incomplete,
  time: getFormatDate((new Date()).toDateString())
}
const initTodoList = { data: [initTodo] }

describe("Base Change Form", () => {
  test('press Edit Task button', async () => {
    mockedAxios.get.mockResolvedValue(initTodoList);
    await act(async () => {
      renderWithProviders(<App />);
    });
    expect(await screen.findByText(/New task/i)).toBeInTheDocument()
    const editButton = document.querySelector(`div[class*='icon__edit']`)
    await act(async () => {
      fireEvent.click(editButton!)
    });
    expect(screen.queryByText(/Update TODO/i)).toBeInTheDocument()
    expect(screen.queryByText(/Update Task/i)).toBeInTheDocument()
    expect(screen.queryByText(/Cancel/i)).toBeInTheDocument()
    const inputTitle = document.querySelector(`input[name='title']`)
    fireEvent.change(inputTitle!, { target: { value: updatedTitle } })
    expect(hasInputValue(inputTitle, updatedTitle)).toBeTruthy()
    const updatedTodo = { ...initTodo, title: updatedTitle }
    const updatedTodoList = { data: updatedTodo }
    mockedAxios.post.mockResolvedValue(updatedTodoList)
    const editTaskSubmit = document.querySelector(`button[class*='button__toUpdate']`)
    await act(async () => {
      fireEvent.click(editTaskSubmit!)
    });
    expect(await screen.findByText(/Updated task/i)).toBeInTheDocument()
  })
  test('press Edit Task button and then Cancel', async () => {
    mockedAxios.get.mockResolvedValue(initTodoList);
    await act(async () => {
      renderWithProviders(<App />);
    });
    expect(await screen.findByText(/New task/i)).toBeInTheDocument()
    const editButton = document.querySelector(`div[class*='icon__edit']`)
    await act(async () => {
      fireEvent.click(editButton!)
    });
    const inputTitle = document.querySelector(`input[name='title']`)
    fireEvent.change(inputTitle!, { target: { value: updatedTitle } })
    expect(hasInputValue(inputTitle, updatedTitle)).toBeTruthy()
    const cancelTask = document.querySelector(`button[class*='button__toCancel']`)
    await act(async () => {
      fireEvent.click(cancelTask!)
    });
    expect(await screen.findByText(/New task/i)).toBeInTheDocument()
  })
})