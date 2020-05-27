import React, { useState, useEffect } from 'react';
import './Home.css';
import { Dimmer, Loader, Confirm, Input, Button, Message } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import apiConfig from '../../apiConfig.json';
import EmployeesTable from  '../../components/EmployeesTable/EmployeesTable';

function Home() {
  const [employees, setEmployees] = useState([]);
  const [baseEmployees, setBaseEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [updateEmployee, setUpdateEmployee] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState();
  const [messageValues, setMessageValues] = useState({header: '', content: ''});
  const history = useHistory();

  useEffect(() => {
    async function getEmployees() {
      setLoading(true);
      try {
        const response = await axios.get(`${apiConfig.API_URL}/employee`);
        setEmployees(response.data);
        setBaseEmployees(response.data);
      } catch (error) {
        showMessage("Something went wrong", error.message, true);
      } finally {
        setLoading(false);
      }
    }

    getEmployees();
  }, [updateEmployee]);

  const showMessage = (header, content, isError) => {
    setMessageValues({header, content, error: isError })
  }

  const handleMessageDismiss = () => {
    setMessageValues({});
  }

  const handleSearch = (event, {value}) => {
    if(!value) {
      // Populate table with all employees again
      setEmployees(baseEmployees);
      return;
    }

    const filtered = baseEmployees.filter(employee => {
      for(let key in employee) {
        if(employee.hasOwnProperty(key)){
          let shouldBeIncluded = employee[key]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
          if (shouldBeIncluded) {
            return true;
          }
        }
      }
      return false;
    });

    setEmployees(filtered);
    return;
  }

  const handleSelect = (employee) => {
    history.push(`/employee/${employee.id}`);
  }

  const handleUpdate = (employee) => {
    history.push(`/employee/${employee.id}/update`);
  }

  const handleAddEmployee = () => {
    history.push(`/employee/create`);
  }

  /** Opens Dialog and asks user to confirm its choice */
  const handleDelete = (employee) => {
    setDialogOpen(true);
    setEmployeeToDelete(employee);
  }

  /** Closes Dialog */
  const handleClose = () => {
    setEmployeeToDelete(null);
    setDialogOpen(false);
  }

  /** Actual delete function */
  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`${apiConfig.API_URL}/employee/${employeeToDelete.id}`);
      showMessage("Success", `Employee ${employeeToDelete.employee_name} was deleted`);
      setEmployeeToDelete(null);
      setUpdateEmployee(!updateEmployee);
    } catch (error) {
      showMessage("Something went wrong", error.message, true);
    } finally {
      setLoading(false);
    }
  }

  return (
  <div className="homeContainer">
    <Dimmer active={loading} inverted>
        <Loader>Loading</Loader>
    </Dimmer>
    <Message
      onDismiss={handleMessageDismiss}
      hidden={!(messageValues.header || messageValues.content)}
      error={messageValues.error}
      success={!messageValues.error}
      header={messageValues.header}
      content={messageValues.content}
    />
    <h3 className="title">Our exceptional employees</h3>
    {employeeToDelete && <Confirm
      open={isDialogOpen}
      header="Delete employee?"
      content={`This will delete employee "${employeeToDelete.employee_name}" permanently!`}
      confirmButton="Delete"
      onCancel={handleClose}
      onConfirm={handleConfirmDelete}
    />}
    <div className="featuresWrapper">
      <Button primary onClick={handleAddEmployee}>Add Employee</Button>
      <Input className="search" icon='search' placeholder='Search...' onChange={handleSearch}/>
    </div>
    <EmployeesTable
      employees={employees}
      setEmployees={setEmployees}
      handleSelect={handleSelect}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
    />
  </div>
  );
}

export default Home;
