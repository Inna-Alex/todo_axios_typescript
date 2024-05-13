import React from 'react';
import { screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import axios from 'axios'

import { renderWithProviders } from '../utils/utils-for-tests';
import App from '../components/App/App';

const mockedAxios = axios as jest.Mocked<typeof axios>

const noTodo = { data: [] }
const oneTodo = {
  data: [
    {
      id: '1',
      title: 'My title',
      status: 'incomplete',
      time: ''
    },
  ],
}

describe("App.js component", () => {
  test('renders header in <App />', () => {
    renderWithProviders(<App />);
    const headerElement = screen.getByText(/todo list/i);
    const addButton = screen.getByText(/add task/i);
    expect(headerElement).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test('test loading', async () => {
    act(() => {
      renderWithProviders(<App />);
    })
    expect(screen.getByText(/Loading/i)).toBeInTheDocument()
  })

  test('test axios api get: fetchTodosThunk with empty response', async () => {
    mockedAxios.get.mockResolvedValue(noTodo);
    await act(async () => {
      renderWithProviders(<App />);
    });
    expect(await screen.findByText(/No Todos/i)).toBeInTheDocument()
    const numberOfTasks = document.querySelector('.counterText')
    expect(numberOfTasks!.textContent).toBe('0')
  })

  test('test axios api get: fetchTodosThunk with 1 Todo', async () => {
    mockedAxios.get.mockResolvedValue(oneTodo)
    await act(async () => {
      renderWithProviders(<App />);
    });
    expect(await screen.findByText(/My title/i)).toBeInTheDocument()
    const numberOfTasks = document.querySelector('.counterText')
    expect(numberOfTasks!.textContent).toBe('1')
  })

  test('test error loading and get error message ', async () => {
    await act(async () => {
      renderWithProviders(<App />);
    })
    expect(await screen.findByText(/Bad response from API/i)).toBeInTheDocument()
    const errorText = document.querySelector('.errorText')
    expect(errorText).toBeInTheDocument()
  })
});
