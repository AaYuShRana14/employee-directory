import EmployeeCard from "./EmployeeCard";
/**
 * Displays the list of employees in a responsive table format
 * @param {Array} employees - Array of employee objects to display
 * @param {Function} onEmployeeDeleted - Callback function called after employee is deleted
 */
const EmployeeList = ({ employees, onEmployeeDeleted }) => {
  if (!employees || employees.length === 0) {
    return <p className="text-gray-500 mt-4 text-center">No employees found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {employees.map((employee) => (
        <EmployeeCard 
          key={employee.id} 
          employee={employee} 
          onEmployeeDeleted={onEmployeeDeleted}
        />
      ))}
    </div>
  );
};

export default EmployeeList;