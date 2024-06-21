import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { Company_Name } from './constants';

// Mock the SearchApp component
jest.mock('./searchApp', () => ({
  SearchApp: () => <div>Mocked SearchApp Component</div>,
}));

describe('App Component', () => {
  it('renders the company name', () => {
    render(<App />);
    expect(screen.getByText(Company_Name)).toBeInTheDocument();
  });

  it('renders the SearchApp component', () => {
    render(<App />);
    expect(screen.getByText('Mocked SearchApp Component')).toBeInTheDocument();
  });

  it('renders the footer with correct text', () => {
    render(<App />);
    expect(screen.getByText(/Ⓒ 2024 Casa2 Stays Pvt. Ltd. All rights reserved./i)).toBeInTheDocument();
  });
});
