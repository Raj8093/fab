import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SearchBar } from './index';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import { setHotels } from '../../store/actions';

jest.mock('axios');

const mockStore = configureStore([]);
const renderWithRedux = (component, { initialState, store = mockStore(initialState) } = {}) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('SearchBar Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      hotels: [],
    });

    store.dispatch = jest.fn();
  });

  it('renders search bar with icon and input', () => {
    renderWithRedux(<SearchBar />);

    expect(screen.getByPlaceholderText(/Search here/i)).toBeInTheDocument();
    expect(screen.getByTestId('searchIcon')).toBeInTheDocument();
  });

  it('dispatches setHotels with empty object when input is cleared', () => {
    renderWithRedux(<SearchBar />, { store });

    fireEvent.change(screen.getByPlaceholderText(/Search here/i), { target: { value: '' } });

    expect(store.dispatch).toHaveBeenCalledWith(setHotels({}));
  });

  it('makes API call and dispatches setHotels with data on input change', async () => {
    const mockData = [{ id: 1, name: 'Hotel Test' }];
    axios.mockResolvedValueOnce({ data: mockData });

    renderWithRedux(<SearchBar />, { store });

    fireEvent.change(screen.getByPlaceholderText(/Search here/i), { target: { value: 'Hotel' } });

    await waitFor(() => expect(axios).toHaveBeenCalledWith('http://localhost:8000/hoteldetails/?suggest=Hotel'));

    expect(store.dispatch).toHaveBeenCalledWith(setHotels(mockData));
  });

  it('handles API error and dispatches setHotels with empty object', async () => {
    axios.mockRejectedValueOnce(new Error('API is down'));

    renderWithRedux(<SearchBar />, { store });

    fireEvent.change(screen.getByPlaceholderText(/Search here/i), { target: { value: 'Hotel' } });

    await waitFor(() => expect(axios).toHaveBeenCalledWith('http://localhost:8000/hoteldetails/?suggest=Hotel'));

    expect(store.dispatch).toHaveBeenCalledWith(setHotels({}));
  });
});
