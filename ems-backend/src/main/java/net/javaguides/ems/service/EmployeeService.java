package net.javaguides.ems.service;

import java.util.List;

import net.javaguides.ems.dto.EmployeeDto;

public interface EmployeeService {
    public EmployeeDto createEmployee(EmployeeDto employeeDto);

    public EmployeeDto getEmployee(Long employeeId);

    public List<EmployeeDto> getAllEmployees();

    public EmployeeDto updateEmployeeById(Long id, EmployeeDto employeeDto);

    public void deleteEmployeeById(Long id);
}