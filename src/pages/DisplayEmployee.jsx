import Button from '../components/Button';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import FileField from '../components/FileField';
import '../styles/style.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateEmployeeMutation, useGetEmployeeByIdQuery } from '../service/employee';
import OutputField from '../components/OutputField';
import MainContainer from '../components/MainContainer';

function EmployeeDetails(props) {
    const params = useParams();
    console.log('params', params);
    const { data, isFetching } = useGetEmployeeByIdQuery(params.id);
    const { onCancel } = props;
    const navigate = useNavigate();
    console.log('data', data);

    const OutputFields = [
        { label: 'Employee Name', name: 'name' },
        { label: 'Employee Email', type: 'email', name: 'email' },
        { label: 'Employee ID', name: 'id' },
        { label: 'Joining Date', type: 'date', name: 'joiningDate' },
        { label: 'Experience', name: 'experience' },
        { label: 'Address', name: 'address' }
    ];

    return (
        <MainContainer title="Employee Details">

            <section id="form">
                <form id="employee-form">
                    <div id="form-container">
                        {OutputFields.map(
                            outputField =>
                                <OutputField
                                    key={outputField.label}
                                    label={outputField.label}
                                    value={data?.[outputField.name]} />
                        )}
                    </div>
                </form>
            </section>
        </MainContainer>
    );
}

export default EmployeeDetails;