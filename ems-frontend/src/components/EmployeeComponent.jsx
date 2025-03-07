import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { addEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { getDepartments, updateDepartment } from '../services/DepartmentService';

function EmployeeComponent() {

    const [employee, setEmployee] = useState({firstName: "", lastName: "", email: "", departmentId: ''});
    const [departmentId, setDepartmentId] = useState('');
    const [departments, setDepartments] = useState([]);

    const [errors, setErrors] = useState({firstName: "", lastName: "", email: "", department: ""})

    const navigator = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        console.log("Start fetching...");
        getDepartments()
            .then((response) => setDepartments(response.data), (error) => console.log(error));
    }, []);

    useEffect(() => {

        if (id) {
            getEmployee(id).then((response) => {             
                setEmployee(response.data);
            }, (errors) => {console.log(errors)})
        }
    }, [id]);

    function validateForm() {
        let isValid = true;
        const errorsCopy = {...errors}

        if (!employee.firstName.trim()) {
            errorsCopy.firstName = 'First name is required';
            isValid = false;
        }

        if (!employee.lastName.trim()) {
            errorsCopy.lastName = 'Last name is required';
            isValid = false;
        }

        if (!employee.email.trim()) {
            errorsCopy.email = 'Email is required';
            isValid = false;
        }

        if (employee.departmentId == '') {
            errorsCopy.department = 'Select one Department';
            isValid = false;
        }

        setErrors(errorsCopy);
    
        return isValid;
    }

    function updateEmployeeField(event) {
        const {name, value} = event.target;

        console.log("name: " + name);
        console.log("value: " + value);

        setEmployee((prevValue) => { return {...prevValue, [name]: value}});

        console.log(employee);
    }

    function saveOrUpdateEmployee(event) {
        event.preventDefault();

        if (validateForm()) {

            if (id) {
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }, error => {
                    console.error(error);
                });    
            } else {
                addEmployee(employee)
                    .then((response) => {console.log(response.data); navigator("/");},
                    (error) => console.error(error));
            }
        }
    }

    function printTitle() {

        console.log(id);

        if (id) {
            return <h2 className='text-center'>Update Employee</h2>
        } else {
            return <h2 className='text-center'>Add Employee</h2>;
        }
    }

    return (
        <div className="container">
            <br />
            <div className='row'>
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {
                        printTitle()
                    }
                    <div className='card-body'>
                        <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name:</label>
                            <input type='text'
                                    placeholder='Enter Employee First Name'
                                    name='firstName'
                                    value={employee.firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid': ''}`} //'form-control'
                                    onChange={updateEmployeeField}
                            >
                            </input>
                            { errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name:</label>
                            <input type='text'
                                    placeholder='Enter Employee Last Name'
                                    name='lastName'
                                    value={employee.lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} //'form-control'
                                    onChange={updateEmployeeField}
                            >
                            </input>
                            { errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Email:</label>
                            <input type='text'
                                    placeholder='Enter Employee Email'
                                    name='email'
                                    value={employee.email}
                                    className={`form-control ${errors.email ? 'is-invalid' :''}`} //'form-control'
                                    onChange={updateEmployeeField}
                            >
                            </input>
                            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Select Department:</label>
                            <select
                                className={`form-control ${errors.department ? 'is-invalid' :''}`}
                                name='departmentId'
                                value={employee.departmentId}
                                onChange={updateEmployeeField}
                            >
                                <option value="">Select Department</option>
                                {
                                    departments.map((department) => 
                                        <option key={department.id} value={department.id}>{department.departmentName}</option>
                                    )
                                }

                            </select>
                            
                            {errors.department && <div className='invalid-feedback'>{errors.department}</div>}
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeComponent;
