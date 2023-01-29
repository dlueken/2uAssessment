# 2uAssessment Frontend - React.js Project to address User Story 2 

In the project directory, run the following to set up the project:

### `npm install`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:8081](http://localhost:8081) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## User story 2
As a member of the 2ULaundry Accounting Team I need to see a list of invoices that have been submitted by vendors, but have not yet been approved for payment so that I can review and approve them.

### Acceptance criteria
1. Create an interface with react.js that shows a list of unapproved invoices that are submitted via API described in user story #1.
    Status: Completed
2. Display the following fields for each invoice:"Invoice Number", "Vendor Name", "Vendor Address", "Invoice Total", "Invoice Date", "Due Date"
    Status: Completed
    Note: Values in the list.  Values and lables in box brought up when selected.
3. Create a solution that allows the user to select and approve invoices. Once an invoice is "Approved" it should dissappear from the list of available invoices.
    Status: Completed
4. When the user approves an invoice the "status" property for that invoice should be updated to "Approved"
    Status: Completed
5. When an invoice is submitted via the API from user story #1, it should populate in the list of displayed invoices without requiring the user to manually refresh the list of invoices.
    Status: Completed

### To Do
1. The selection functionality is simple and may not handle many test cases when the list items get removed or updated by another user well.  Further tests needed.
2. An interval set for every 30 seconds is used to keep the list up to date with changes in the data store outside of this session.  Research better alternatives nd optimization.
3. Vendor Address on details (selected) card wraps oddly and should be fixed. 
4. UI improvements in general
5. Build test case.  More testing, edge cases, multi user, etc.
