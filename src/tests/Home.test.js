import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../pages/Home/Home';

test('render add new employee button', () => {
  const { getByText } = render(<Home />);
  const buttonElement = getByText(/add employee/i);

  expect(buttonElement).toBeInTheDocument();
});

test('render table', async () => {
  const renderResult = render(<Home />);
  const table = renderResult.container.getElementsByTagName('table')[0];

  expect(table).toBeDefined();
});

test('render search', async () => {
  const { getByPlaceholderText } = render(<Home />);
  const searchElement = getByPlaceholderText(/search/i);

  expect(searchElement).toBeInTheDocument();
});
