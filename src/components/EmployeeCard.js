import { deleteEmployee } from "../services/EmployeeService";
/**
 * Displays a single employee in a card layout
 * @param {Object} employee - The employee object containing name, role, and department
 * @param {Function} onEmployeeDeleted - Callback function called after employee is deleted
 */
const EmployeeCard = ({ employee, onEmployeeDeleted }) => {
    const deleteHandler = () => {
        deleteEmployee(employee.id);
        // Notify parent component that employee was deleted
        if (onEmployeeDeleted) {
            onEmployeeDeleted();
        }
    };
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        {employee.name}
      </h3>
      <p className="text-gray-600 text-sm mb-1">
        <span className="font-medium">Role:</span> {employee.role}
      </p>
      <p className="text-gray-600 text-sm">
        <span className="font-medium">Department:</span> {employee.department}
      </p>
      <div className="mt-3 flex gap-2">
        <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Edit</button>
        <button className="bg-red-500 text-white px-3 py-1 rounded text-sm" onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
};

export default EmployeeCard;
