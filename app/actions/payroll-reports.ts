'use server';

import axios from 'axios';

const BASE_URL = 'https://kratest.pesaflow.com';

// Helper to handle API errors
const handleApiError = (error: any) => {
  console.error('API Error:', error.response?.data || error.message);
  throw new Error(error.response?.data?.message || error.response?.data?.error || 'An error occurred while communicating with the server');
};

export interface Payroll {
  id: number;
  uuid: string;
  ref_no: string;
  period: string;
  status: string;
  employer_tax_payer: {
    name: string;
    pin: string;
  };
  total_gross: string;
  total_net: string;
  total_tax: string;
  total_deductions: string;
  employee_count: number;
  currency: string;
  inserted_at: string;
  updated_at: string;
}

export interface PayrollListResult {
  entries: Payroll[];
  page_number: number;
  page_size: number;
  total_entries: number;
  total_pages: number;
}

export interface ExportReportResult {
  download_url: string;
  password: string;
  template: string;
  error?: string;
}

/**
 * Get payrolls by period
 * @param token - Authorization Bearer token from URL
 */
export async function getPayrollsByPeriod(
  token: string,
  period: string,
  page: number = 1,
  pageSize: number = 10
): Promise<PayrollListResult> {
  if (!token) {
    throw new Error('Authorization token is required');
  }

  try {
    const response = await axios.get(`${BASE_URL}/api/payroll`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        period,
        page,
        page_size: pageSize
      }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

/**
 * Get all payrolls (for period selection)
 * @param token - Authorization Bearer token from URL
 */
export async function getPayrolls(
  token: string,
  page: number = 1,
  pageSize: number = 20
): Promise<PayrollListResult> {
  if (!token) {
    throw new Error('Authorization token is required');
  }

  try {
    const response = await axios.get(`${BASE_URL}/api/payroll`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        page,
        page_size: pageSize
      }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

/**
 * Export/Generate a report
 * @param token - Authorization Bearer token from URL
 */
export async function exportReport(
  token: string,
  reportType: string,
  period: string,
  payrollRefNo: string
): Promise<ExportReportResult> {
  if (!token) {
    throw new Error('Authorization token is required');
  }

  console.log('Exporting report:', { reportType, period, payrollRefNo });

  try {
    const response = await axios.post(
      `${BASE_URL}/api/payroll/export-reports`,
      {
        report_type: reportType,
        period,
        payroll_ref_no: payrollRefNo
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    // Check for error in response
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

/**
 * Send report to WhatsApp via webhook
 */
export async function sendReportToWhatsApp(
  downloadUrl: string,
  password: string,
  whatsappNumber: string
): Promise<{ success: boolean }> {
  const WEBHOOK_URL = 'https://webhook.chatnation.co.ke/webhook/6937dc3730946fd02503d6e9';
  
  console.log('Sending report to WhatsApp:', { downloadUrl, password, whatsappNumber });

  try {
    const response = await axios.get(WEBHOOK_URL, {
      params: {
        download_url: downloadUrl,
        password,
        number: whatsappNumber
      }
    });
    
    return { success: true };
  } catch (error) {
    console.error('Webhook error:', error);
    throw new Error('Failed to send report to WhatsApp');
  }
}
