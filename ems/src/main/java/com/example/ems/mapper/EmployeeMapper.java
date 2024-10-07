package com.example.ems.mapper;

import com.example.ems.dto.EmployeeDto;
import com.example.ems.entity.Employee;

//Mapper is used to prevent writing the same logic in entity Employee class and EmployeeDto class
//To prevent, what we do this that we map Employee JPA (entity) and EmployeeDto and vice versa

public class EmployeeMapper {
    // Maps Employee JPA(entity) to EmployeeDto
    public static EmployeeDto mapToEmployeeDto(Employee employee) {
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail());

    }
    // Maps EmployeeDto to Employee JPA(entity)

    public static Employee mapToEmployee(EmployeeDto employeeDto) {
        return new Employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmail());
    }

}
