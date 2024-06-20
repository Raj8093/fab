import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SearchBar } from './index';
import { FaSearch } from 'react-icons/fa';

// Mocking the fetch API
beforeAll(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  fetch.mockClear();
});

describe('SearchBar Component', () => {
  it('renders the search input and icon', () => {
    render(<SearchBar getHoteldata={jest.fn()} />);
    const inputElement = screen.getByPlaceholderText(/Search here/i);
    const searchIcon = screen.getByTestId('searchIcon')
    expect(inputElement).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });

  it('calls getHoteldata with fetched data when typing in the input', async () => {
    const mockData = [{ id: 1, name: 'Hotel Test' }];
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
    });

    const getHoteldata = jest.fn();
    render(<SearchBar getHoteldata={getHoteldata} />);

    const inputElement = screen.getByPlaceholderText(/Search here/i);
    fireEvent.change(inputElement, { target: { value: 'Test' } });

    await waitFor(() => expect(fetch).toHaveBeenCalledWith('http://localhost:8000/hoteldetails/?suggest=Test'));
    await waitFor(() => expect(getHoteldata).toHaveBeenCalledWith(mockData));
  });

  it('calls getHoteldata with an empty object when the search term is cleared', async () => {
    const mockData = [{ id: 1, name: 'Hotel Test' }];
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
    });

    const getHoteldata = jest.fn();
    render(<SearchBar getHoteldata={getHoteldata} />);

    const inputElement = screen.getByPlaceholderText(/Search here/i);
    fireEvent.change(inputElement, { target: { value: 'Test' } });

    await waitFor(() => expect(fetch).toHaveBeenCalledWith('http://localhost:8000/hoteldetails/?suggest=Test'));
    await waitFor(() => expect(getHoteldata).toHaveBeenCalledWith(mockData));

    fireEvent.change(inputElement, { target: { value: '' } });

    await waitFor(() => expect(getHoteldata).toHaveBeenCalledWith({}));
  });

  it('calls getHoteldata with an empty object when there is an error in fetching data', async () => {
    fetch.mockRejectedValueOnce(new Error('API is down'));

    const getHoteldata = jest.fn();
    render(<SearchBar getHoteldata={getHoteldata} />);

    const inputElement = screen.getByPlaceholderText(/Search here/i);
    fireEvent.change(inputElement, { target: { value: 'Test' } });

    await waitFor(() => expect(fetch).toHaveBeenCalledWith('http://localhost:8000/hoteldetails/?suggest=Test'));
    await waitFor(() => expect(getHoteldata).toHaveBeenCalledWith({}));
  });
});
