/**
 * Employee Service
 * Handles all CRUD operations for employee data using localStorage
 */

import { nanoid } from 'nanoid'; // for generating unique IDs
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
  const uniqueId = nanoid(); // generating unique_id for each employee
  employees.push({ ...employee, id: uniqueId });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
};

/**
 * Deletes an employee from localStorage by their ID
 * @param {string} employeeId - The unique ID of the employee to delete
 */
export const deleteEmployee = (employeeId) => {
  let employees = getEmployees();
  employees = employees.filter(emp => emp.id !== employeeId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
};


/** * Updates an existing employee's details in localStorage
 * @param {Object} updatedEmployee - Employee object containing updated details including id
 */
export const updateEmployee = (updatedEmployee) => {
  let employees = getEmployees();
  employees = employees.map(emp => 
    emp.id === updatedEmployee.id ? updatedEmployee : emp
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
};


/** * Searches employees by name or department
 * @param {string} searchTerm - The term to search for - name or department
 * @returns {Array} List of employee objects that match the search term
 */
export const searchEmployees = (searchTerm) => {
  const employees = getEmployees();
  return employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
};