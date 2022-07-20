import Button from '../components/Button';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import FileField from '../components/FileField';
import '../styles/style.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateEmployeeMutation, useGetEmployeeByIdQuery, useGetEmployeeQuery, useUpdateEmployeeMutation } from '../service/employee';
import MainContainer from '../components/MainContainer';


function CreateEmployee(props) {
  const { onCancel } = props;
  const [newEmployee, setNewEmployee] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const { data } = useGetEmployeeByIdQuery(params.id, { skip: !params.id });
  const [createEmployee, result] = useCreateEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();
  console.log(params.id ? 'submit' : 'create');
  useEffect(() => {
    if (data) {
      console.log(data);
      setNewEmployee(data);
    }
  }, [data])

  const onCancelDefault = () => {
    if (onCancel) onCancel();
    else
      navigate('/dashboard');
  }


  const handleChange = (name, value) => {
    console.log(newEmployee);
    setNewEmployee({
      ...newEmployee,
      [name]: value
    })
  }

  const onSubmit = () => {
    // console.log(newEmployee);
    const payload = { 
      name: newEmployee.name, 
      role: newEmployee.role, 
      status: newEmployee.status, 
      experience: newEmployee.experience,
      joiningDate: newEmployee.joiningDate,
      address: newEmployee.address,
      email:newEmployee.email
    }
    console.log(payload)
    if (!data) {
      createEmployee(payload);
    } else {
      updateEmployee({
        id: params.id,
        body: payload
      })
    }
    if (onCancel)
      onCancel();
    else
      navigate('/dashboard');
  }

  const inputFields = [
    { label: 'Employee Name', name: 'name' },
    { label: 'Employee Email', type: 'email', name: 'email' },
    { label: 'Employee ID', name: 'id' },
    { label: 'Joining Date', type: 'date', name: 'joiningDate' },
    { label: 'Experience', name: 'experience' },
    { label: 'Address', name: 'address' }
  ];

  return (
    <MainContainer title={`${params.id ? 'Edit' : 'Create'} Employee`}>
      <section id="form">
        <form id="employee-form">
          <div id="form-container">
            {inputFields.map(
              inputField =>
                <InputField
                  key={inputField.label}
                  label={inputField.label}
                  type={inputField.type}
                  value={newEmployee[`${inputField.name}`]}
                  handleChange={value => handleChange(inputField.name, value)}
                />
            )}
            <SelectField
              label={'Role'}
              options={[
                {
                  label: 'Choose Role',
                  value: ''
                },
                { 
                  label: 'Developer', 
                  value: 'Developer' 
                },
                { 
                  label: 'DevOps',
                  value: 'DevOps'
                }, 
                { 
                  label: 'QA', 
                  value: 'QA' 
                }]}
              value={newEmployee.role || data?.role}
              handleChange={value => handleChange('role', value)}
              name="role"
            />
            <SelectField
              label={'Status'}
              options={[
                {
                  label: 'Choose Status',
                  value: ''
                },
                { 
                  label: 'Probation', 
                  value: 'Probation' 
                },
                { 
                  label: 'Active',
                  value: 'Active'
                }, 
                { 
                  label: 'Inactive', 
                  value: 'Inactive' 
                }]}
              value={newEmployee.status || data?.status}
              handleChange={value => handleChange('status', value)}
              name="status"
            />
            <FileField label={'Upload ID Proof'} />
          </div>
          <div id="form-buttons">
            <Button handleClick={() => { onSubmit(newEmployee) }} label={params.id ? 'Submit' : 'Create'} variant="primary" />
            <Button handleClick={() => onCancelDefault()} label={'Cancel'} variant="outlined" />
            {/* <Button  label={'Cancel'} variant="outlined" /> */}
          </div>
        </form>
      </section>
    </MainContainer>
    //   </main>
    // </div>
  );
}

export default CreateEmployee;