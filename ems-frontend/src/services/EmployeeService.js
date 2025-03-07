import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

export function getEmployees() {
    return axios.get(REST_API_BASE_URL);
}

export function addEmployee(employee) {
    return axios.post(REST_API_BASE_URL, employee);
}

export function getEmployee(employeeId) {
    return axios.get(REST_API_BASE_URL + `/${employeeId}`);
}

export function updateEmployee(employeeId, employee) {
    return axios.put(REST_API_BASE_URL + `/${employeeId}`, employee);
}

export function deleteEmployee(employeeId) {
    return axios.delete(REST_API_BASE_URL + `/${employeeId}`);
}