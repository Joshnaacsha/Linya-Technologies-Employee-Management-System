import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]) // All employees from the backend
    const [filteredEmployees, setFilteredEmployees] = useState([]) // Filtered list to display
    const [searchTerm, setSearchTerm] = useState('') // Search term
    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, [])

    function getAllEmployees() {
        listEmployees().then((response) => {
            setEmployees(response.data);
            setFilteredEmployees(response.data); // Initially, show all employees
        }).catch(error => {
            console.error(error)
        })
    }

    function addNewEmployee() {
        navigator('/add-employee');
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`);
    }

    function removeEmployee(id) {
        deleteEmployee(id).then(() => {
            getAllEmployees();
        }).catch(error => {
            console.error(error);
        })
    }

    // Handle search input
    function handleSearch(event) {
        const term = event.target.value.toLowerCase(); // Convert to lowercase for case-insensitive search
        setSearchTerm(term);

        // Filter employees by name or email
        const filtered = employees.filter(employee =>
            employee.firstName.toLowerCase().includes(term) ||
            employee.lastName.toLowerCase().includes(term) ||
            employee.email.toLowerCase().includes(term)
        );
        setFilteredEmployees(filtered);
    }

    return (
        <div className='container'>
            <h2 className='text-center'>List Of Employees</h2>

            {/* Search Input */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Name or Email"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <button className="btn btn-primary mb-2" onClick={addNewEmployee}>Add Employee</button>

            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredEmployees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                    <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}
                                        style={{ marginLeft: '10px' }}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponent;
