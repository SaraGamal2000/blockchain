import { render, screen } from '@testing-library/react';
import App from './App';
import AppFun from "./AppFun";
test('renders learn react link', () => {
  render(<App />);
  render(<AppFun />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
