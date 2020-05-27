import * as yup from 'yup';

const EmployeeSchema = yup.object().shape({
  name: yup.string().min(3).max(255).required(),

  age: yup.number().min(14).max(130).required(),

  salary: yup.number().positive().required(),

  profileImage: yup.string().url(),
});

export default EmployeeSchema;
