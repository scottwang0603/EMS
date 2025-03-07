import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/api/departments";

export function getDepartments() {
    return axios.get(REST_API_BASE_URL);
}

export function addDepartment(department) {
    return axios.post(REST_API_BASE_URL, department);
}

export function getDepartment(departmentId) {
    return axios.get(REST_API_BASE_URL + `/${departmentId}`);
}

export function updateDepartment(departmentId, department) {
    return axios.put(REST_API_BASE_URL + `/${departmentId}`, department);
}

export function deleteDepartment(departmentId) {
    return axios.delete(REST_API_BASE_URL + `/${departmentId}`);
}