import { useState, useEffect } from "react";
import { getEmployees } from "../services/EmployeeService";
import EmployeeForm from "../components/EmployeeForm";

const EmployeeDirectory = () => {
    // state to keep track of all employees
    const [employees, setEmployees] = useState([]);

    /**
     * Fetches all employees from localStorage and updates the component state
     */
    const fetchEmployees = () => {
        const data = getEmployees();
        setEmployees(data);
    };

    /**
     * Callback function to refresh employee list after new employee is added
     */
    const handleEmployeeAdded = () => {
        fetchEmployees();
    };
    
    // Load existing employees when page first loads
    useEffect(() => {
        fetchEmployees();
    }, []);
    
    return (
        <div className="container mx-auto p-4 flex flex-col">
            <h1 className="text-2xl font-bold mb-4">Employee Directory</h1>
            
            {/* Employee Form Component */}
            <EmployeeForm onEmployeeAdded={handleEmployeeAdded} />
            
            {/* Table showing all employees */}
            <div className="mt-6 overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2">Name</th>
                            <th className="py-2">Role</th>
                            <th className="py-2">Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td className="border-t py-2">{employee.name}</td>
                                <td className="border-t py-2">{employee.role}</td>
                                <td className="border-t py-2">{employee.department}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeDirectory;
