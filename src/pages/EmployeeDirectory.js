import { useState, useEffect } from "react";
import { getEmployees } from "../services/EmployeeService";
import EmployeeList from "../components/EmployeeList";
import EmployeeFormModal from "../components/EmployeeFormModal";

const EmployeeDirectory = () => {
    // state to keep track of all employees
    const [employees, setEmployees] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
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

    /**
     * Callback when an employee is saved (added or edited)- it refreshes the employee list and closes the form modal
     */
    const onEmployeeSave = () => {
        handleRefresh();
        setIsFormOpen(false);
    };

    /**
     * Toggles the employee form modal
     */
    const toggleForm = () => {
        setIsFormOpen((prev) => !prev);
    };
    
    return (
        <div style={{ backgroundColor: '#eef4ed' }}>
            <div className="container mx-auto p-4 flex flex-col">
                <div className="p-6 rounded-lg mb-6" style={{ backgroundColor: '#8da9c4' }}>
                    <h1 className="text-2xl font-bold mb-4 text-center text-white">Employee Directory</h1>
                    {/* Employee Form Component */}
                    <div className="flex gap-4 items-center">
                        <input type="text" placeholder="Search Employees..." className="border p-2 flex-1 rounded" />
                        <button className="bg-[#13315c] text-white px-4 py-2 rounded transition-colors" onClick={toggleForm}>
                            Add Employee
                        </button>
                    </div>
                </div>
                {/* Modal for Employee Form */}
                {isFormOpen && <EmployeeFormModal onClose={toggleForm} isOpen={isFormOpen}  onSave={onEmployeeSave} />}
                {/* Employee List Component */}
                <EmployeeList employees={employees} onEmployeeDeleted={handleRefresh} onSave={onEmployeeSave} />
            </div>
        </div>
    );
};

export default EmployeeDirectory;