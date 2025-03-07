import React, { useState, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import { getDepartments, deleteDepartment } from '../services/DepartmentService';

function ListDepartmentComponent() {
    // const dummyData = [
    //     {"id": 1, "departmentName": "R&D", "departmentDescription": "Research and Development"},
    //     {"id": 2, "departmentName": "Finance", "departmentDescription": "Finance Department"},
    //     {"id": 3, "departmentName": "Sport","departmentDescription": "Sport Department"} ];

    const [departments, setDepartments] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllDepartments();
    });

    function addDepartment() {
        navigator("/add-department");
    }

    function editDepartment(id) {
        navigator(`/edit-department/${id}`);
    }

    function removeDepartment(id) {
        deleteDepartment(id);
    }

    function getAllDepartments() {
        getDepartments().then((response) => setDepartments(response.data), (error) => console.log(error));
    }

  return (
    <div className='container'>
        <h2 className="text-center">List of Departments</h2>
        <button type="button"  className='btn btn-primary mb-2' onClick={addDepartment}>Add Department</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Department Id</th>
                    <th>Department Name</th>
                    <th>Department Description</th>
                </tr>
            </thead>
            <tbody>
                {
                    departments.map((department) => (
                        <tr key={department.id}>
                            <td>{department.id}</td>
                            <td>{department.departmentName}</td>
                            <td>{department.departmentDescription}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => editDepartment(department.id)}>Update</button>
                                <button className='btn btn-danger' style={{ marginLeft: "10px" }} onClick={() => removeDepartment(department.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListDepartmentComponent;