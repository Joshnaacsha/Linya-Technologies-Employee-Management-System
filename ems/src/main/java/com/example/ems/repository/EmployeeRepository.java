package com.example.ems.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.ems.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // Correct method name based on entity fields
    List<Employee> findByFirstNameContainingIgnoreCase(String name);

    // Updated query to refer to the correct entity fields
    @Query("SELECT e FROM Employee e WHERE LOWER(e.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) "
            + "OR LOWER(e.lastName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) "
            + "OR LOWER(e.email) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Employee> searchEmployees(@Param("searchTerm") String searchTerm);
}
