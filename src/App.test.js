import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders the PTCW welcome message', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const welcomeMessage = screen.getByText(/welcome to PTCW/i);
  expect(welcomeMessage).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const loginLink = screen.getByText(/login/i);
  const registerLink = screen.getByText(/register/i);
  const aboutLink = screen.getByText(/learn more/i);

  expect(loginLink).toBeInTheDocument();
  expect(registerLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
});

test('checks if the footer renders', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const footerText = screen.getByText(/© 2024 ptcw. all rights reserved./i);
  expect(footerText).toBeInTheDocument();
});
