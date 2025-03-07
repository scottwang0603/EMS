import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees, deleteEmployee } from '../services/EmployeeService';
import { getDepartments } from '../services/DepartmentService';

function ListEmployeeComponent() {
    // const employees = [
    //     {"id": 1, "firstName": "AAA", "lastName": "XXX", "email": "aaa@gmail.com"},
    //     {"id": 2, "firstName": "BBB", "lastName": "TRE", "email": "bbb@gmail.com"},
    //     {"id": 3, "firstName": "CCC", "lastName": "GFG", "email": "ccc@gmail.com"}
    // ];

    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllEmployees();
        getDepartmentList();
    },[]);

    function getAllEmployees() {
        getEmployees()
            .then((response) => {setEmployees(response.data);},
            (error) => {console.error(error)});
    }

    
    function getDepartmentList() {
        getDepartments()
            .then((response) => {setDepartments(response.data); console.log(response.data)}, (error) => {console.error(error)});
    }

    function addEmployee() {
        navigate("/add-employee");
    }

    function editEmployee(id) {
        navigate(`/edit-employee/${id}`);
    }

    function removeEmployee(employeeId) {
        deleteEmployee(employeeId)
            .then((response) => {console.log(response); getAllEmployees();},
        (error) => console.log(error));
    }

    
    function getDepartmentName(departmentId) {
        console.log(departmentId);
        const department = departments.find(dept => dept.id == departmentId);

        return department ? department.departmentName : "-";
    }

    return (
        <div className="container">
        <h2 className="text-center">List of Employees</h2>
        <button type="button" className="btn btn-primary mb-2" onClick={addEmployee}>Add Employee</button>
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email</th>
                    <th>Department</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {employees.map(employee => 
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>{getDepartmentName(employee.departmentId)}</td>
                        <td>
                            <button className='btn btn-info' onClick={() => editEmployee(employee.id)} >Update</button>
                            <button className='btn btn-danger' style={{marginLeft: '10px'}} onClick={() => removeEmployee(employee.id)} >Delete</button>
                        </td>
                    </tr>)}
            </tbody>
        </table>
        </div>
    );
}

export default ListEmployeeComponent;