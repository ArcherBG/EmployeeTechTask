import React from 'react';
import './EmployeeDetail.css';

function EmployeeDetail({title, value}) {
  return (
    <div className="container">
      <div className="title">{title}</div>
      <div>{value}</div>
    </div>
  );
}

export default EmployeeDetail;
