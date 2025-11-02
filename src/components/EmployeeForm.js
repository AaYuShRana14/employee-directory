import { useState } from "react";
import { saveEmployee,updateEmployee } from "../services/EmployeeService";

/**
 * Employee Form Component
 * Allows adding a new employee to the directory or editing an existing employee
 * @param {Function} onEmployeeAdded - Callback function to notify parent component after adding an employee
 */
const EmployeeForm = ({ onEmployeeAdded, employee = {}, onClose }) => {
    // State to manage form inputs for new employee - name, role, department
    const [formData, setFormData] = useState({
        name: employee.name || "",
        role: employee.role || "",
        department: employee.department || "",
    });

    // State to manage form validation errors
    const [errors, setErrors] = useState({});

    /**
     * Handles input field changes in the employee form
     * @param {Event} e - The input change event
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error as user types
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    /**
     * Validates the employee form data
     * @returns {boolean} True if form is valid else returns false
     */
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.role.trim()) newErrors.role = "Role is required";
        if (!formData.department.trim()) newErrors.department = "Department is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    /**
     * Handles form submission to add a new employee
     * @param {Event} e - The form submit event
     */
    const submitHandler = (e) => {
        e.preventDefault();
        if (!employee.id) {
            if (!validateForm()) return; // Stop submission if form is invalid

            const newEmployee = {
                name: formData.name,
                role: formData.role,
                department: formData.department,
            };

            // Save new employee to localStorage
            saveEmployee(newEmployee);
            // Clear form after saving
            setFormData({ name: "", role: "", department: "" });
            // Notify parent component that employee was added
            if (onEmployeeAdded) {
                onEmployeeAdded();
            }
        }
        else{
            if (!validateForm()) return; // Stop submission if form is invalid
            // Editing existing employee
            const updatedEmployee = {
                id: employee.id,
                name: formData.name,
                role: formData.role,
                department: formData.department,
            };
            // Save updated employee to localStorage
            updateEmployee(updatedEmployee);
            onEmployeeAdded();
            // Close the modal after updating
            onClose();
        }
    };

    return (
        <div className="mb-6 p-4 border border-gray-300 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-3 text-center text-[#1b263b]">{employee.id ? "Edit Employee" : "Add New Employee"}</h2>
            {/* Form to add new employee or edit existing employee */}
            <form onSubmit={submitHandler}>
                <div className="flex flex-col flex-wrap gap-1.5">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="min-w-[80px] text-[#e0e1dd]">Name:</label>
                        <input type="text" placeholder="Name" value={formData.name} onChange={handleChange} name="name" className={"border p-2 mr-2 " + (errors.name && 'border-[#1b263b]')}/>
                        <div className="h-5">
                            {errors.name && (<span className="text-[13px] font-medium" style={{ color: "#1b263b" }}>{errors.name}</span>)}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="role" className="min-w-[80px] text-[#e0e1dd]">Role:</label>
                        <input type="text" placeholder="Role" value={formData.role} onChange={handleChange} name="role" className={"border p-2 mr-2 " + (errors.role && 'border-[#1b263b]')}/>
                        <div className="h-5">
                            {errors.role && (<span className="text-[13px] font-medium" style={{ color: "#1b263b" }}>{errors.role}</span>)}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="department" className="min-w-[80px] text-[#e0e1dd]">Department:</label>
                        <input type="text" placeholder="Department" value={formData.department} onChange={handleChange} name="department" className={"border p-2 mr-2 " + (errors.department && 'border-[#1b263b]')}/>
                        <div className="h-5">
                            {errors.department && (<span className="text-[13px] font-medium" style={{ color: "#1b263b" }}>{errors.department}</span>)}
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className="bg-[#13315c] hover:bg-[#1b263b] text-white p-2 max-h-10 rounded transition-colors max-w-xs self-center"
                    >
                        {employee.id ? "Update Employee" : "Save Employee"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;