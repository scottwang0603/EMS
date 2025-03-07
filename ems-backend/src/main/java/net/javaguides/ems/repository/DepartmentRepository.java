package net.javaguides.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import net.javaguides.ems.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    
}