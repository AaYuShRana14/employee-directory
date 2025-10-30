/**
 * Employee Service
 * Handles all CRUD operations for employee data using localStorage
 */

const STORAGE_KEY = "employee_directory_data";

/** * Gets the list of employees from localStorage
 * @returns {Array} List of employee objects
 */
export const getEmployees = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};


/**
 * Saves a new employee to list of employees in localStorage
 * @param {Object} employee - Employee object containing name, role, and department
 */
export const saveEmployee = (employee) => {
  const employees = getEmployees();
  employees.push(employee);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
};