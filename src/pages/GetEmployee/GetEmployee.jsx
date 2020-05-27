import React, { useState, useEffect, } from 'react';
import { Loader, Dimmer, Grid, Image, Message, Button } from 'semantic-ui-react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import apiConfig from '../../apiConfig.json';
import EmployeeDetail from '../../components/EmployeeDetail/EmployeeDetail';
import './GetEmployee.css';

function GetEmployee() {
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false);
  const [messageValues, setMessageValues] = useState({header: '', content: ''});
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getEmployee(){
      setLoading(true);
      try {
        const response = await axios.get(`${apiConfig.API_URL}/employee/${id}`);
        setEmployee(response.data);
      } catch (error) {
        showMessage("Something went wrong", error.message, true);
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

  const handleUpdateEmployee = () => {
    history.push(`/employee/${id}/update`);
  }

  const getEmployeeView = () => (
      <Grid columns={2} divided centered>
        <Grid.Row>
          <Grid.Column >
              <EmployeeDetail title="Name:" value={employee.employee_name} />
              <EmployeeDetail title="Age:" value={employee.employee_age} />
              <EmployeeDetail title="Salary:" value={`$ ${employee.employee_salary}`} />
          </Grid.Column>
          <Grid.Column>
            <Image src={employee.profile_image || '/avatar.webp'} size="small"/>
            {employee.profile_image && <EmployeeDetail title="Profile image:" value={employee.profile_image} />}
          </Grid.Column>
        </Grid.Row>
      </Grid>
  );

  return (
    <div className="employeeContainer">
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
      <h4 className="title">Employee Information</h4>
      {!loading && getEmployeeView()}
      <div>
        <Button primary onClick={handleUpdateEmployee}>Update Employee</Button>
      </div>
    </div>
  );
}

export default GetEmployee;
