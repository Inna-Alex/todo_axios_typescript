import React from 'react';
import axios from 'axios'
import { fireEvent, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";

import { renderWithProviders } from '../utils/utils-for-tests';
import App from '../components/App/App';
import * as Consts from '../utils/consts'


const mockedAxios = axios as jest.Mocked<typeof axios>

const noTodo = { data: [] }
const completedIncompleteTodos = {
  data: [
    {
      id: '1',
      title: 'Started Task',
      status: Consts.Incomplete,
      time: ''
    },
    {
      id: '2',
      title: 'Finished Task',
      status: Consts.Completed,
      time: ''
    },
  ]
}

describe("FilterButton.js component", () => {
  test('test options presence in FilterButton component', async () => {
    mockedAxios.get.mockResolvedValue(noTodo)
    await act(async () => {
      renderWithProviders(<App />);
    });
    expect(await screen.findByText(/All/i)).toBeInTheDocument()
    const filterButton = document.querySelector(`.select input[role='combobox']`)
    fireEvent.focus(filterButton!);
    fireEvent.keyDown(filterButton!, { key: 'ArrowDown', code: 40 });
    const alls = screen.findAllByText(/All/i);
    (await alls).forEach(elem => expect(elem).toBeInTheDocument())
    expect(await screen.findByText(/Incomplete/i)).toBeInTheDocument()
    expect(await screen.findByText(/Completed/i)).toBeInTheDocument()
  })

  test('test click on options in FilterButton component', async () => {
    mockedAxios.get.mockResolvedValue(completedIncompleteTodos)
    await act(async () => {
      renderWithProviders(<App />);
    });
    expect(await screen.findByText(/Finished Task/i)).toBeInTheDocument()
    expect(await screen.findByText(/Started Task/i)).toBeInTheDocument()
    expect(await screen.findByText(/All/i)).toBeInTheDocument()
    const filterButton = document.querySelector(`.select input[role='combobox']`)
    fireEvent.focus(filterButton!);
    fireEvent.keyDown(filterButton!, { key: 'ArrowDown', code: 40 });
    const alls = screen.findAllByText(/All/i);
    (await alls).forEach(elem => expect(elem).toBeInTheDocument())
    // filter completed tasks
    const completedOpt = screen.queryByText(/Completed/i)
    expect(completedOpt).toBeInTheDocument()
    fireEvent.click(completedOpt!)
    expect(screen.queryByText(/Finished Task/i)).toBeInTheDocument()
    expect(screen.queryByText(/Started Task/i)).not.toBeInTheDocument()
    // filter incomplete tasks
    fireEvent.focus(filterButton!);
    fireEvent.keyDown(filterButton!, { key: 'ArrowDown', code: 40 });
    const incompleteOpt = screen.queryByText(/Incomplete/i)
    expect(incompleteOpt).toBeInTheDocument()
    fireEvent.click(incompleteOpt!)
    expect(screen.queryByText(/Started Task/i)).toBeInTheDocument()
    expect(screen.queryByText(/Finished Task/i)).not.toBeInTheDocument()
    // filter all tasks
    fireEvent.focus(filterButton!);
    fireEvent.keyDown(filterButton!, { key: 'ArrowDown', code: 40 });
    const allOpt = screen.queryByText(/All/i)
    fireEvent.click(allOpt!)
    expect(screen.queryByText(/Started Task/i)).toBeInTheDocument()
    expect(screen.queryByText(/Finished Task/i)).toBeInTheDocument()
  })
})
