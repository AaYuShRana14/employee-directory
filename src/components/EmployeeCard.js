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
const EmployeeCard = ({ employee, onEmployeeDeleted,onSave }) => {
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
    <tr className="hover:bg-opacity-80 transition-colors border-b border-gray-400" style={{ backgroundColor: '#8da9c4' }}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-white">
          {employee.name}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-white">
          {employee.role}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-white">
          {employee.department}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <div className="flex justify-center gap-2">
          <button className="bg-[#13315c] hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors" onClick={handleEdit}>
            Edit
          </button>
          <button className="bg-[#134074] text-white px-3 py-1 rounded text-sm transition-colors" onClick={deleteHandler}>
            Delete
          </button>
        </div>
      </td>

      {/* Modal to edit employee details */}
      <EmployeeFormModal
        employee={employee}
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSave={onSave}
      />
    </tr>
  );
};

export default EmployeeCard;
