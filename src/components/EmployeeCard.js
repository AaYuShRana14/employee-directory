import { useState } from "react";
import { deleteEmployee } from "../services/EmployeeService";
import EmployeeFormModal from "./EmployeeFormModal";

/**
 * Displays a single employee as a table row
 * @param {Object} employee - The employee object containing name, role, and department
 * @param {Function} onEmployeeDeleted - Callback function called after employee is deleted
 * @param {Function} onEmployeeUpdated - Callback function called after employee is updated
 * @param {boolean} isEven - Whether this is an even-numbered row for alternating colors
 */
const EmployeeCard = ({ employee, onEmployeeDeleted,onEmployeeUpdated }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    /**
     * function to handle deleting an employee
     * @returns {void}
     */
    const deleteHandler = () => {
        deleteEmployee(employee.id);
        // Notify parent component that employee was deleted
        if (onEmployeeDeleted) {
            onEmployeeDeleted();
        }
    };

    /**
     * function to handle opening the edit modal
     * @returns {void}
     */
    const handleEdit = () => {
        setIsEditModalOpen(true);
    };

    /**
     * function to handle closing the edit modal
     * @returns {void}
     */
    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

  return (
    <tr className={`hover:bg-blue-50 transition-colors border-b`}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {employee.name}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-600">
          {employee.role}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-600">
          {employee.department}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <div className="flex justify-center gap-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors" onClick={handleEdit}>
            Edit
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors" onClick={deleteHandler}>
            Delete
          </button>
        </div>
      </td>

      {/* Modal to edit employee details */}
      <EmployeeFormModal
        employee={employee}
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSave={onEmployeeUpdated}
      />
    </tr>
  );
};

export default EmployeeCard;
