import React, { useState } from 'react';
import { Message, Loader, Dimmer } from 'semantic-ui-react'
import axios from 'axios';
import './CreateEmployee.css';
import apiConfig from '../../apiConfig.json';
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm';
import EmployeeSchema from '../../schemas/EmployeeSchema';

function CreateEmployee() {
  const defaultFormValues = {name: '', age: '', salary: '', profileImage: '' };
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(defaultFormValues);
  const [messageValues, setMessageValues] = useState({header: '', content: ''});

  const showMessage = (header, content, isError) => {
    setMessageValues({header, content, error: isError })
  }

  const handleMessageDismiss = () => {
    setMessageValues({});
  }

  const handleChange = async (e, { name, value })  => {
    e.preventDefault();
    setValues({...values, [name]: value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await EmployeeSchema.validate(values);
    } catch (error) {
      showMessage("Something went wrong", error.message, true);
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${apiConfig.API_URL}/employee`, {
        employee_name: values.name,
        employee_age: values.age,
        employee_salary: values.salary,
        profile_image: values.profileImage
      });
      showMessage('Success!', 'New employee was added');
      setValues(defaultFormValues); // Reset the form
    } catch (e){
      showMessage('Something went wrong', e.response || e.message, true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="createEmployeeContainer">
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
      <h4 className="title">Add New Employee</h4>
      <EmployeeForm {...values} handleSubmit={handleSubmit} handleChange={handleChange}/>
    </div>
  );
}

export default CreateEmployee;
