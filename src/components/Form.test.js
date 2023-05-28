import { render, screen } from '@testing-library/react';
import Form from './Form';

test('renders learn react link', () => {
  render(<Form />);
  const linkElement = screen.getByTestId("form");
  expect(linkElement).toBeInTheDocument();
});
