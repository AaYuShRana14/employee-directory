import EmployeeCard from "./EmployeeCard";
/**
 * Displays the list of employees in a table using EmployeeCard components
 * @param {Array} employees - Array of employee objects to display
 * @param {Function} onEmployeeDeleted - Callback function called after employee is deleted
 * @param {Function} onEmployeeUpdated - Callback function called after employee is updated
 */
const EmployeeList = ({ employees, onEmployeeDeleted, onEmployeeUpdated }) => {
  if (!employees || employees.length === 0) {
    return <p className="text-gray-500 mt-4 text-center">No employees found.</p>;
  }

  return (
    <div className="mt-6">
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Department
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <EmployeeCard 
                key={employee.id}
                employee={employee} 
                onEmployeeDeleted={onEmployeeDeleted}
                onEmployeeUpdated={onEmployeeUpdated}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;