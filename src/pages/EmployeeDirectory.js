import { useState, useEffect } from "react";
import {saveEmployee, getEmployees} from "../services/employeeService";
const EmployeeDirectory = () => {

    // state to keep track of all employees
    const [employees, setEmployees] = useState([]);

    // state to manage form inputs for new employee - name, role, department
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        department: "",
    });

    /**
     * Fetches all employees from localStorage and updates the component state
     */
    const fetchEmployees = () => {
        const data = getEmployees();
        setEmployees(data);
    };

    /**
     * Handles input field changes in the employee form
     * @param {Event} e - The input change event
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    
    /**
     * Handles form submission to add a new employee
     * @param {Event} e - The form submit event
     */
    const submitHandler = (e) => {
        e.preventDefault();
        const newEmployee = {
            name: formData.name,
            role: formData.role,
            department: formData.department,
        };
        // Save new employee to localStorage
        saveEmployee(newEmployee);
        // Clear form after saving
        setFormData({ name: "", role: "", department: "" });
        // Refresh the list to show new employee
        fetchEmployees();
    };
    
    // Load existing employees when page first loads
    useEffect(() => {
        fetchEmployees();
    }, []);
    
    return (
        <div className="container mx-auto p-4 flex flex-col">
            <h1 className="text-2xl font-bold mb-4">Employee Directory</h1>

            {/* Form to add new employee */}
            <div className="mb-4">
                <input type="text" placeholder="Name" value={formData.name} onChange={handleChange} name="name" className="border p-2 mr-2"/>
                <input type="text" placeholder="Role" value={formData.role} onChange={handleChange} name="role" className="border p-2 mr-2"/>
                <input type="text" placeholder="Department" value={formData.department} onChange={handleChange} name="department" className="border p-2 mr-2"/>
                <button type="submit" onClick={submitHandler} className="bg-blue-500 text-white p-2">
                    Add Employee
                </button>
            </div>
            
            {/* Table showing all employees */}
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Name</th>
                        <th className="py-2">Role</th>
                        <th className="py-2">Department</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={index}>
                            <td className="border-t py-2">{employee.name}</td>
                            <td className="border-t py-2">{employee.role}</td>
                            <td className="border-t py-2">{employee.department}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeDirectory;
