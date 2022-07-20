import { useState } from "react";
import IconButton from "../components/IconButton";
import MainContainer from "../components/MainContainer";
import SelectField from "../components/SelectField";
import Table from "../components/Table";
import TrashIcon from "../components/TrashIcon";
import { useDeleteEmployeeMutation, useGetEmployeeQuery } from "../service/employee";
import employeeList from "../service/mockData";
import CreateEmployee from "./CreateEmployee";
import { useNavigate } from 'react-router-dom';
import UpdateIcon from "../components/Updateicon";

function EmployeeList() {
    //const{data, error,isLoading}=useGetEmployeeQuery();
    const [employees, setEmployees] = useState(employeeList);
    const [isCreateScreen, setIsCreateScreen] = useState(false);
    const [deleteEmployee] = useDeleteEmployeeMutation();
    const { data } = useGetEmployeeQuery();
    console.log(data);
    const navigate = useNavigate();

    const addEmployee = newEmployee => {
        console.log(newEmployee);

        setEmployees([
            ...employees,
            newEmployee
        ]);
        setIsCreateScreen(false);
    }
    const updateEmployee = (employeeId) => {

        navigate(`/dashboard/update/${employeeId}`);
    }

    const toggleCreateScreen = () => {
        setIsCreateScreen(!isCreateScreen);
    }

    const actions = [
        (
            <div className="action-container filter">
                <p>Filter By</p>
                <SelectField options={['Status']} />
            </div>
        ),
        (
            <div className="action-container icon-button">
                <IconButton
                    iconContent={"+"}
                    label="Create employee"
                    handleClick={toggleCreateScreen}
                />
            </div>
        )
    ];

    const tableHeaderItems = [
        "Employee Name",
        "Employee ID",
        "Joining Date",
        "Role",
        "Status",
        "Experience",
        "Actions"
    ];

    if (!data) return (<p>Hello</p>)

    return !isCreateScreen ? (
        <MainContainer title="Employee List" actions={actions}>
            <Table headerItems={tableHeaderItems}>
                {data['data'].map((data, index) => (
                    <tr className="card" key={index}>
                        <td onClick={() => navigate(`/dashboard/${data.id}`)}>{data['name']}</td>
                        <td onClick={() => navigate(`/dashboard/${data.id}`)}>{data['id']}</td>
                        <td onClick={() => navigate(`/dashboard/${data.id}`)}>{data['joiningDate']}</td>
                        <td onClick={() => navigate(`/dashboard/${data.id}`)}>{data['role']}</td>
                        <td onClick={() => navigate(`/dashboard/${data.id}`)}
                            className={`status status-${data['status']?.toLowerCase()}`}
                        ><div className="tag">{data['status']}</div></td>
                        <td onClick={() => navigate(`/dashboard/${data.id}`)}>{data['experience']} Years</td>
                        <td>
                            <TrashIcon onClick={() => deleteEmployee(data.id)} />
                            <UpdateIcon onClick={() => updateEmployee(data.id)} />
                        </td>
                    </tr>
                ))}
            </Table>
        </MainContainer>) : (
        <CreateEmployee onSubmit={addEmployee} onCancel={toggleCreateScreen} />
    )
}

export default EmployeeList;