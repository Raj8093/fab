import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { Company_Name } from './constants';
import { SearchApp } from './searchApp';

// Mock the SearchApp component
jest.mock('./searchApp', () => ({
  SearchApp: () => <div data-testid="search-app">SearchApp Component</div>,
}));

describe('App Component', () => {
  it('renders the company name', () => {
    render(<App />);
    const companyNameElement = screen.getByText(Company_Name);
    expect(companyNameElement).toBeInTheDocument();
  });

  it('renders the SearchApp component', () => {
    render(<App />);
    const searchAppElement = screen.getByTestId('search-app');
    expect(searchAppElement).toBeInTheDocument();
    expect(searchAppElement).toHaveTextContent('SearchApp Component');
  });

  it('renders the footer with correct text', () => {
    render(<App />);
    const footerElement = screen.getByText(/Ⓒ 2024 Casa2 Stays Pvt. Ltd. All rights reserved./i);
    expect(footerElement).toBeInTheDocument();
  });
});
