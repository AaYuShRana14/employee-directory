import { useState, useEffect } from "react";
import { getEmployees,searchEmployees } from "../services/EmployeeService";
import EmployeeList from "../components/EmployeeList";
import EmployeeFormModal from "../components/EmployeeFormModal";
import SearchBar from "../components/SearchBar";

/** Employee Directory Page
 * Displays the employee directory with options to add, edit, delete, and search employees
 */
const EmployeeDirectory = () => {
    // state to keep track of all employees
    const [employees, setEmployees] = useState([]);
    // state to open or close the employee form modal
    const [isFormOpen, setIsFormOpen] = useState(false);
    // state to keep track of filtered employees based on search
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    // state to keep track of search input value
    const [searchValue, setSearchValue] = useState("");
    /**
     * Fetches all employees from localStorage and updates the component state
     */
    const fetchEmployees = () => {
        const data = getEmployees();
        setEmployees(data);
        setFilteredEmployees(data); // Initialize filteredEmployees with all employees
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
     * Callback when an employee is saved (added or edited)- it refreshes the employee list, closes the form modal and resets search
     */
    const onEmployeeSave = () => {
        handleRefresh();
        setIsFormOpen(false);
        setSearchValue("");
    };

    /**
     * Toggles the employee form modal
     */
    const toggleForm = () => {
        setIsFormOpen((prev) => !prev);
    };

    /**
     * Handles searching employees by name or department by calling the search service
     * @param {string} searchTerm - The term to search for
     */
    const handleSearch = (searchTerm) => {
        if (!searchTerm.trim()) {
            // If search is empty, show all employees
            setFilteredEmployees(employees);
        }
        else{
            // If search is not empty, filter employees
            const results = searchEmployees(searchTerm);
            setFilteredEmployees(results);
        }
    };

    return (
        <div style={{ backgroundColor: '#eef4ed' }}>
            <div className="container mx-auto p-4 flex flex-col">
                <div className="p-6 rounded-lg mb-6" style={{ backgroundColor: '#8da9c4' }}>
                    <h1 className="text-2xl font-bold mb-4 text-center text-[#1b263b]">Employee Directory</h1>
                    {/* Employee Form Component */}
                    <div className="flex gap-4 items-center">
                        <SearchBar onSearch={handleSearch} setSearchValue={setSearchValue} searchValue={searchValue} />
                        <button className="bg-[#13315c] text-white px-4 py-2 rounded transition-colors hover:bg-[#1b263b]" onClick={toggleForm}>
                            Add Employee
                        </button>
                    </div>
                </div>
                {/* Modal for Employee Form */}
                {isFormOpen && <EmployeeFormModal onClose={toggleForm} isOpen={isFormOpen}  onSave={onEmployeeSave} />}
                {/* Employee List Component */}
                <EmployeeList employees={filteredEmployees} onEmployeeDeleted={handleRefresh} onSave={onEmployeeSave} />
            </div>
        </div>
    );
};

export default EmployeeDirectory;