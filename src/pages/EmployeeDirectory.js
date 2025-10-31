import { useState, useEffect } from "react";
import { getEmployees } from "../services/EmployeeService";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

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
     * Callback function to refresh employee list after employee is added, edited, or deleted
     */
    const handleRefresh = () => {
        fetchEmployees();
    }; 

    // Load existing employees when page first loads
    useEffect(() => {
        fetchEmployees();
    }, []);
    
    return (
        <div className="container mx-auto p-4 flex flex-col">
            <h1 className="text-2xl font-bold mb-4 mx-auto">Employee Directory</h1>
            {/* Employee Form Component */}
            <EmployeeForm onEmployeeAdded={handleRefresh} />
            {/* Employee List Component */}
            <EmployeeList employees={employees} onEmployeeDeleted={handleRefresh} />
        </div>
    );
};

export default EmployeeDirectory;
