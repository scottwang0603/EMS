import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addDepartment, getDepartment, updateDepartment } from '../services/DepartmentService';

function DepartmentComponent() {

    const [department, setDepartment] = useState({departmentName: "", departmentDescription: ""});
    const [errors, setErrors] = useState({departmentName: "", departmentDescription: ""});
    
    const navigator = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            getDepartment(id)
                .then((response) => {setDepartment(response.data)},
                (errors) => {console.log(errors)})
        }
    }, [id]);
    
    function validateForm() {
        let isValid = true;
    
        const errorsCopy = {...errors};
    
        if (department.departmentName.trim()) {
            errorsCopy.departmentName = '';
        } else {
            errorsCopy.departmentName = 'Department name is required';
            isValid = false;
        }
    
        if (department.departmentDescription.trim()) {
            errorsCopy.departmentDescription = '';
        } else {
            errorsCopy.departmentDescription= 'Department name is required';
            isValid = false;
        }
    
        setErrors(errorsCopy);
    
        return isValid;
    }

    function saveOrUpdateDepartment(event) {
        event.preventDefault();
        
        if (validateForm()) {
            if (id) {
                updateDepartment(id, department)
                        .then((response) => {console.log(response); navigator('/departments')},
                        (error) => {console.log(error)});
            } else {
                addDepartment(department)
                    .then((response) => {console.log(response); navigator('/departments')}, (error) => {console.log(error)});
            }
        }
    }

    function updateDepartmentField(event) {
        const {name, value} = event.target;

        setDepartment((prevValue) => { return {...prevValue, [name]: value}});
    }

    function printTitle() {
        if (id) {
            return <h2 className='text-center'>Update Department</h2>
        } else {
            return <h2 className='text-center'>Add Department</h2>
        }
    }

  return (
    <div className='container'>
            <br />
            <div className='row'>
                <div className="card col-md-6 offset-md-3">
                {
                        printTitle()
                }
                <div className='card-body'>
                        <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Department Name:</label>
                            <input type='text'
                                   placeholder='Enter Department Name'
                                   name='departmentName'
                                   value={department.departmentName}
                                   className={`form-control ${errors.departmentName ? 'is-invalid' : ''}`}
                                   onChange={updateDepartmentField}
                            >
                            </input>
                            { errors.departmentName && <div className='invalid-feedback'>{errors.departmentName}</div> }
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Department Description:</label>
                            <input type='text'
                                   placeholder='Enter Department Description'
                                   name='departmentDescription'
                                   value={department.departmentDescription}
                                   className={`form-control ${errors.departmentDescription ? 'is-invalid' : ''}`}
                                   onChange={updateDepartmentField}
                            >
                            </input>
                            { errors.departmentDescription && <div className='invalid-feedback'>{errors.departmentDescription}</div> }
                        </div>
                            
                        <button type="button" className="btn btn-success" onClick={saveOrUpdateDepartment}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default DepartmentComponent;
