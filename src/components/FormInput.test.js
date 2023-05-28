import { render, screen } from '@testing-library/react';
import TodoCreator from './FormInput';

test('renders learn react link', () => {
  render(<TodoCreator />);
  const linkElement = screen.getByTestId("formInput");
  expect(linkElement).toBeInTheDocument();
});
