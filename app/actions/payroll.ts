'use server';

import axios from 'axios';

const BASE_URL = 'https://kratest.pesaflow.com';

// Helper to handle API errors
const handleApiError = (error: any) => {
  console.error('API Error:', error.response?.data || error.message);
  throw new Error(error.response?.data?.message || 'An error occurred while communicating with the server');
};

export interface Employee {
  id: number;
  uuid: string;
  name: string;
  pin: string;
  email: string | null;
  msisdn: string;
  gender: string | null;
  dob: string;
  status: string;
  contract_type: string;
  date_of_employment: string;
  date_of_completion: string | null;
  employment_no: string;
  department: string | null;
  profession: string | null;
  gross_pay: string;
  net_pay: string;
  salary: string;
  taxable_pay: string;
  tax_due: string;
  deduction: string;
  allowance: string;
  benefit: string;
  relief: string;
  currency: string;
  nssf_no: string;
  shif_no: string;
  employer_type: string;
  employer_tax_payer: any;
  tax_payer: any;
  items: any[];
  inserted_at: string;
  updated_at: string;
}

export interface SearchEmployeesResult {
  entries: Employee[];
  page_number: number;
  page_size: number;
  total_entries: number;
  total_pages: number;
}

/**
 * Search for employees by name or KRA PIN
 * @param token - Authorization Bearer token from URL
 */
export async function searchEmployees(
  token: string,
  searchQuery: string,
  page: number = 1,
  pageSize: number = 5
): Promise<SearchEmployeesResult> {
  if (!token) {
    throw new Error('Authorization token is required');
  }

  try {
    const response = await axios.get(`${BASE_URL}/api/payroll/employee`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        page,
        page_size: pageSize,
        multi_filter: searchQuery
      }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

/**
 * Update employee details
 * @param token - Authorization Bearer token from URL
 */
export async function updateEmployee(
  token: string,
  employeeUuid: string,
  updates: Record<string, any>
): Promise<any> {
  if (!token) {
    throw new Error('Authorization token is required');
  }

  console.log('Updating employee:', updates);

  try {
    const response = await axios.post(
      `${BASE_URL}/api/payroll/employee/${employeeUuid}/update`,
      updates,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

/**
 * Deactivate employee (toggle status to inactive)
 * @param token - Authorization Bearer token from URL
 */
export async function deactivateEmployee(
  token: string,
  employeeUuid: string,
  deactivationReason: string
): Promise<any> {
  if (!token) {
    throw new Error('Authorization token is required');
  }

  console.log('Deactivating employee:', employeeUuid, 'Reason:', deactivationReason);

  try {
    const response = await axios.post(
      `${BASE_URL}/api/payroll/employee/${employeeUuid}/toggle-status`,
      {
        status: false,
        deactivation_reason: deactivationReason
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

/**
 * Terminate employee
 * @param token - Authorization Bearer token from URL
 */
export async function terminateEmployee(
  token: string,
  employeeUuid: string,
  terminationReason: string,
  terminationDate: string
): Promise<any> {
  if (!token) {
    throw new Error('Authorization token is required');
  }

  console.log('Terminating employee:', employeeUuid, 'Reason:', terminationReason);

  try {
    const response = await axios.post(
      `${BASE_URL}/api/payroll/employee/${employeeUuid}/remove`,
      {
        termination_reason: terminationReason,
        termination_date: terminationDate
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

/**
 * Reinstate a previously terminated employee
 * @param token - Authorization Bearer token from URL
 */
export async function reinstateEmployee(
  token: string,
  employeeUuid: string,
  newEmploymentNo: string
): Promise<any> {
  if (!token) {
    throw new Error('Authorization token is required');
  }

  console.log('Reinstating employee:', employeeUuid, 'New Employment No:', newEmploymentNo);

  try {
    const response = await axios.post(
      `${BASE_URL}/api/payroll/employee/${employeeUuid}/reinstate`,
      {
        new_employment_no: newEmploymentNo
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

