import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react'

function EmployeeForm({name, age, salary, profileImage, handleSubmit, handleChange}) {
  return (
    <Form success onSubmit={handleSubmit}>
      <Form.Input
        name="name"
        label="Name:"
        placeholder="Name"
        value={name}
        onChange={handleChange}
      />
      <Form.Input
        name="age"
        label="Age:"
        placeholder="Age"
        type="number"
        value={age}
        onChange={handleChange}
      />
      <Form.Input
        name="salary"
        label="Salary:"
        placeholder="Salary"
        type="number"
        value={salary}
        onChange={handleChange}
      />
      <Form.Input
        name="profileImage"
        label="Profile Image:"
        placeholder="Profile Image"
        value={profileImage}
        onChange={handleChange}
      />
      <Button type="submit" primary>Submit</Button>
    </Form>
  );
}

EmployeeForm.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default EmployeeForm;
