/**
 * Displays the list of employees in a responsive table format
 * @param {Array} employees - Array of employee objects to display
 */
const EmployeeList = ({ employees }) => {
  if (!employees || employees.length === 0) {
    return <p className="text-gray-500 mt-4 text-center">No employees found.</p>;
  }

  return (
    <div className="mt-6">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Name</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Role</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Department</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr
              key={employee.id}
              className="hover:bg-gray-50  border-t"
            >
              <td className="py-2 px-4">{employee.name}</td>
              <td className="py-2 px-4">{employee.role}</td>
              <td className="py-2 px-4">{employee.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
