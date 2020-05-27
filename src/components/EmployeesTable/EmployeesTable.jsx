import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon } from 'semantic-ui-react';
import './EmployeeTable.css';

function EmployeesTable({employees, setEmployees, handleSelect, handleUpdate, handleDelete}) {
  const [column, setColumn] = useState();
  const [direction, setDirection] = useState();

  const handleSort = (clickedColumn) => {
    if (column !== clickedColumn) {
      setColumn(clickedColumn);
      setDirection('ascending');
      const sortedData = employees.sort((emp1, emp2) => {
        let nameA = emp1[clickedColumn];
        let nameB = emp2[clickedColumn];
        if(nameA === undefined || nameB === undefined) {
          return 0;
        }

        // If values are valid numbers convert and compare them as floats
        if(Number.parseFloat(nameA) && Number.parseFloat(nameB)){
          return Number.parseFloat(nameA) - Number.parseFloat(nameB);
        }

        nameA = nameA.toLowerCase();
        nameB = nameB.toLowerCase();
        // Compare them as strings
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setEmployees(sortedData);
      return;
    }

    setEmployees(employees.reverse());
    setDirection(direction === 'ascending' ? 'descending' : 'ascending');
  }

  return (
  <Table celled striped sortable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell
          textAlign="center"
          width="1"
          sorted={column === 'id' ? direction : null}
          onClick={() => handleSort('id')}
          >
            Id
        </Table.HeaderCell>
        <Table.HeaderCell
          sorted={column === 'employee_name' ? direction : null}
          onClick={() => handleSort('employee_name')}
          >
          Name
        </Table.HeaderCell>
        <Table.HeaderCell
          textAlign="center"
          width="1"
          sorted={column === 'employee_age' ? direction : null}
          onClick={() => handleSort('employee_age')}
          >
          Age
        </Table.HeaderCell>
        <Table.HeaderCell
          textAlign="center"
          width="2"
          sorted={column === 'employee_salary' ? direction : null}
          onClick={() => handleSort('employee_salary')}
          >
          Salary
        </Table.HeaderCell>
        <Table.HeaderCell textAlign="center" width="1">Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
    {employees.map(employee =>
      <Table.Row key={employee.id}>
        <Table.Cell textAlign="center" width="1">{employee.id}</Table.Cell>
        <Table.Cell textAlign="left">
          <span className="employeeName" onClick={() => handleSelect(employee)}>
            {employee.employee_name}
          </span>
        </Table.Cell>
        <Table.Cell textAlign="center" width="1">{employee.employee_age}</Table.Cell>
        <Table.Cell textAlign="center" width="2">$ {employee.employee_salary}</Table.Cell>
        <Table.Cell textAlign="center" width="1">
          <Icon className="updateUser" name="pencil alternate" onClick={() => handleUpdate(employee)}></Icon>
          <Icon className="deleteUser" name="user delete" color="red" onClick={() => handleDelete(employee)}></Icon>
        </Table.Cell>
      </Table.Row>
    )}
    </Table.Body>
  </Table>
  );
}

EmployeesTable.propTypes = {
  employees: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    employee_name: PropTypes.string,
    employee_age: PropTypes.string,
    employee_salary: PropTypes.string,
    profile_image: PropTypes.string,
  })),
  setEmployees: PropTypes.func,
  handleSelect: PropTypes.func,
  handleUpdate: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default EmployeesTable;
