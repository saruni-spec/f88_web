# eTIMS User Manual (Product Documentation)

## 1. Access & Dashboard
**Entry Point**: The application is accessed via a link sent to your WhatsApp number. This link automatically logs you in (or prompts for OTP verification if the session has expired).

### Dashboard (`Home`)
Upon successful login, you see the **eTIMS Home** screen with the following options:

1.  **Sales Invoice** (Blue Card): Create a new tax invoice for a sale.
2.  **Credit Note** (Green Card): Issue a correction/return for a previously issued invoice.
3.  **Buyer Initiated** (Purple Card): Manage invoices created by buyers for your approval (or create one as a buyer).

---

## 2. Sales Invoice Journey
**Goal**: Issue a valid tax invoice to a customer.

### Step 1: Buyer Details
*   **Action**: Click "Sales Invoice" on the dashboard.
*   **Screen**: "Buyer Details"
*   **Input**:
    *   **Buyer PIN or ID**: Enter the customer's KRA PIN (e.g., `A00...Z`) or ID number.
    *   **Buyer Name**: Enter the customer's name.
*   **Logic**:
    *   **Validated**: If you enter a PIN/ID and click "Continue", the system verifies it with KRA. If valid, it locks the name to the official KRA name.
    *   **Unverified (Name Only)**: If you leave the PIN field **empty** and just enter a **Buyer Name**, the system will accept it. This allows you to invoice casual customers without needing their PIN details.
*   **Validation**: You cannot proceed if *both* fields are empty.

### Step 2: Item Details
*   **Action**: Click "Continue" after buyer validation.
*   **Screen**: "Invoice Details"
*   **Input**:
    *   **Item Type**: Choose "Product" or "Service".
    *   **Item Name**: Description of what you are selling.
    *   **Unit Price**: Cost per item (KES).
    *   **Quantity**: Number of items.
    *   **Description (Optional)**: Additional details (max 600 chars).
*   **Action**: Click "Add Item". The item appears in a list below.
*   **Logic**: You can add multiple items. The system automatically calculates the Total (Price × Quantity).
*   **Validation**: Price and Quantity must be greater than 0.

### Step 3: Review & Submit
*   **Action**: Click "Continue" after adding items.
*   **Screen**: "Review Invoice"
*   **Display**: Shows a summary of:
    *   **Seller**: Your name (from login session).
    *   **Buyer**: The customer's name/PIN from Step 1.
    *   **Items**: List of items and the Grand Total.
*   **Action**: Click "Submit".
*   **System Action**:
    1.  Sends data to KRA.
    2.  Generates a unique KRA Receipt Number.
    3.  Generates a PDF Invoice.
    4.  **WhatsApp Delivery**: Automatically sends the PDF Invoice to your WhatsApp number.
*   **Success Screen**: Displays the new Invoice Number and confirms PDF delivery.

---

## 3. Credit Note Journey
**Goal**: Correct an error or process a return for an existing invoice.

### Step 1: Search Invoice
*   **Action**: Click "Credit Note" on the dashboard.
*   **Screen**: "Create Credit Note"
*   **Input**:
    *   **Invoice Number**: The number of the *original* invoice (e.g., `KRASRN...`) you want to credit.
    *   **Credit Note Type**:
        *   **Partial**: Return only specific items or quantities.
        *   **Full**: Cancel the entire invoice.
    *   **Reason**: Select why (e.g., "Damaged", "Missing Quantity", "Refund").
*   **Logic**:
    *   The system checks if the invoice exists.
    *   **Validation Rule**: If a Credit Note *already exists* for this invoice, you might be restricted from creating another Partial note (depending on remaining balance).

### Step 2: Select Items (Partial Only)
*   *Skip this step if "Full" was selected.*
*   **Screen**: "Select Items"
*   **Display**: Lists all items from the *original* invoice with their original quantities.
*   **Action**:
    *   Select the item(s) being returned.
    *   **Edit Quantity**: Reduce the quantity to match what is being returned (cannot exceed original quantity).
*   **Validation**: You must select at least one item.

### Step 3: Review & Submit
*   **Screen**: "Review Credit Note"
*   **Display**: Summary of original invoice, selected items to credit, and total credit amount.
*   **Action**: Click "Submit".
*   **Outcome**: Generates a Credit Note PDF and sends it via WhatsApp.

---

## 4. Buyer-Initiated Journey
**Goal**: Allow a Buyer to draft an invoice for a Seller to approve (Self-Invoicing).

### Buyer View (Creator)
1.  **Dashboard**: Click "Buyer Initiated" -> "Buyer" -> "Create Invoice".
2.  **Seller Validation**:
    *   **Transaction Type**: Select **B2B** (requires Seller PIN) or **B2C** (PIN or ID).
    *   **Input**: Enter Seller's PIN.
    *   **Action**: Click "Validate". System confirms Seller's name from KRA records.
3.  **Contact Info**: Enter Seller's phone number (crucial for them to receive the approval request).
4.  **Add Items**: Same as Sales Invoice item entry.
5.  **Submit**:
    *   **Outcome**: The invoice is **Pending**.
    *   **Notification**: The **Seller** receives a WhatsApp message: *"Buyer [Name] has initiated an invoice... Click to approve."*

### Seller View (Approver)
1.  **Access**: Click the link in the WhatsApp notification (or go to Dashboard -> Buyer Initiated -> Seller -> Pending).
2.  **Screen**: "Pending Invoices"
3.  **Display**: List of invoices buyers have drafted against your PIN.
4.  **Action**: Click "View" on an invoice.
5.  **Review**: Check items and amounts.
    *   **Button: Accept**: Generates the official KRA invoice. PDF sent to **both** Buyer and Seller.
    *   **Button: Reject**: Marks invoice as rejected. Buyer is notified.
