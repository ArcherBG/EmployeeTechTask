import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EmployeeForm from '../components/EmployeeForm/EmployeeForm';

test('update employee form with date', () => {
  const data = {name: "sam", salary: "10000", age: "20", profileImage: ""};
  const handleChange = jest.fn();
  const { getByPlaceholderText } = render(
    <EmployeeForm
      {...data}
      handleChange={handleChange}
      handleSubmit={() => {}}
    />
);

  const inputElement = getByPlaceholderText("Name");
  expect(inputElement).toBeInTheDocument();

  fireEvent.change(inputElement, {
    target: {value: 'Bill'},
  });
  expect(handleChange).toHaveBeenCalled();
});

test('populate employee form with data and submit', () => {
  const data = {name: "", salary: "", age: "", profileImage: ""};
  const handleSubmit = jest.fn();
  const { getByPlaceholderText , getByText } = render(
    <EmployeeForm
      {...data}
      handleChange={() => {}}
      handleSubmit={handleSubmit}
    />
);

  const nameInput = getByPlaceholderText("Name");
  const ageInput = getByPlaceholderText("Age");
  const salaryInput = getByPlaceholderText("Salary");
  const submitButton = getByText(/submit/i);

  expect(nameInput).toBeInTheDocument();
  expect(ageInput).toBeInTheDocument();
  expect(salaryInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  fireEvent.change(nameInput, {
    target: {value: 'John'},
  });
  fireEvent.change(ageInput, {
    target: {value: '42'},
  });
  fireEvent.change(salaryInput, {
    target: {value: '100000'},
  });
  fireEvent.click(submitButton);

  expect(handleSubmit).toHaveBeenCalled();
});
