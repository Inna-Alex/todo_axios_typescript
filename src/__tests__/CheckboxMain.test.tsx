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
const oneTodo = {
  id: uuid(),
  title: testTodoTitle,
  status: Consts.Incomplete,
  time: getFormatDate((new Date()).toDateString())
}
const oneTodoList = { data: [oneTodo] }

describe("Check/Uncheck Todo item in the list", () => {
  test('Check/Uncheck Todo item', async () => {
    const mockedData = oneTodoList
    // render Todo list with 1 Todo
    mockedAxios.get.mockResolvedValue(mockedData);
    await act(async () => {
      renderWithProviders(<App />);
    });
    expect(await screen.findByText(/New task/i)).toBeInTheDocument()
    // check the task as Completed
    const inputUnchecked = document.querySelector(`button[class='CheckboxRoot']`)
    expect(inputUnchecked).not.toBeChecked()
    await act(async () => {
      fireEvent.click(inputUnchecked!)
    });
    expect(inputUnchecked).toBeChecked()
    const taskCompleted = document.querySelector(`div[class*='todoText']`)
    expect(taskCompleted!.getAttribute('class')!.includes('todoText--completed')).toBeTruthy()
    // check the task as Uncompleted
    await act(async () => {
      fireEvent.click(inputUnchecked!)
    });
    expect(inputUnchecked).not.toBeChecked()
    expect(taskCompleted!.getAttribute('class')!.includes('todoText--completed')).toBeFalsy()
  })
})