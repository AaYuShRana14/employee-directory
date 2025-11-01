import EmployeeForm from "./EmployeeForm";

/**
 * Modal wrapper component that uses the existing EmployeeForm for editing employees
 * @param {Object} employee - The employee object to edit
 * @param {boolean} isOpen - Whether the modal is open
 * @param {Function} onClose - Function to close the modal
 * @param {Function} onSave - Function to save the edited employee
 */
const EmployeeFormModal = ({ employee={}, isOpen, onClose, onSave }) => {

    /**
     * Handles the employee added event from EmployeeForm
     */
    const handleEmployeeAdded = () => {
        // call onSave to notify the parent when employee is edited
        onSave();
    };

    if (!isOpen) return null; // render nothing if modal is not open

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" style={{ backgroundColor: '#8da9c4' }}>
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-gray-400 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">Edit Employee</h3>
                    <button onClick={onClose} className="text-white hover:text-gray-200 text-xl font-bold">
                        X
                    </button>
                </div>

                <div className="p-6">
                    <EmployeeForm
                        employee={employee}
                        onEmployeeAdded={handleEmployeeAdded}
                        onClose={onClose}
                    />
                </div>
            </div>
        </div>
    );
};

export default EmployeeFormModal;
