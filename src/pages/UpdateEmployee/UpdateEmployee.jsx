import React, { useState, useEffect } from 'react';
import { Message, Loader, Dimmer } from 'semantic-ui-react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UpdateEmployee.css'
import apiConfig from '../../apiConfig.json';
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm';
import EmployeeSchema from '../../schemas/EmployeeSchema';

function UpdateEmployee() {
  const defaultFormValues = {name: '', age: '', salary: '', profileImage: '' };
  const [loading, setLoading] = useState(false);
  const [hideForm, setHideForm] = useState(false);
  const [values, setValues] = useState(defaultFormValues);
  const [messageValues, setMessageValues] = useState({header: '', content: ''});
  const { id } = useParams();

  useEffect(() => {
    async function getEmployee() {
      setLoading(true);
      try {
        const response = await axios.get(`${apiConfig.API_URL}/employee/${id}`);
        const { data } = response;
        setValues({
          name: data.employee_name,
          age: data.employee_age,
          salary: data.employee_salary,
          profileImage: data.profile_image,
        });
      } catch (e) {
        showMessage('Something went wrong', e.message, true);
        setHideForm(true);
      } finally {
        setLoading(false);
      }
    }

    getEmployee();
  }, [id]);

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
      const response = await axios.put(`${apiConfig.API_URL}/employee/${id}`, {
        id: id,
        employee_name: values.name,
        employee_age: values.age,
        employee_salary: values.salary,
        profile_image: values.profileImage
      });
      const { data } = response;
      showMessage('Success!', 'Employee was updated');
      setValues({
        name: data.employee_name,
        age: data.employee_age,
        salary: data.employee_salary,
        profileImage: data.profile_image,
      });
    } catch (e){
      showMessage('Something went wrong', e.response || e.message, true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="updateEmployeeContainer">
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
      <h4 className="title">Update Existing Employee</h4>
      {!hideForm && <EmployeeForm {...values} handleSubmit={handleSubmit} handleChange={handleChange}/>}
    </div>
  );
}

export default UpdateEmployee;
