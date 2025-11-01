import EmployeeCard from "./EmployeeCard";
/**
 * Displays the list of employees in a table using EmployeeCard components
 * @param {Array} employees - Array of employee objects to display
 * @param {Function} onEmployeeDeleted - Callback function called after employee is deleted
 * @param {Function} onSave - Callback function called after employee is saved (added or edited)
 */
const EmployeeList = ({ employees, onEmployeeDeleted, onSave }) => {  
  if (!employees || employees.length === 0) {
    return <p className="text-gray-500 mt-4 text-center">No employees found.</p>;
  }

  return (
    <div className="mt-6">
      <div className="overflow-x-auto shadow-lg rounded-lg" style={{ backgroundColor: '#8da9c4' }}>
        <table className="min-w-full border border-gray-300" style={{ backgroundColor: '#8da9c4' }}>
          <thead style={{ backgroundColor: '#6b8fa3' }}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-gray-400">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-gray-400">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-gray-400">
                Department
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider border-b border-gray-400">
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
                onSave={onSave}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;