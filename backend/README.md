# 2uAssessment Frontend - React.js Project to address User Story 2 

In the project directory, run the following to set up the project:

### `npm install`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:8081](http://localhost:8081) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## User story 1
As a vendor supplying services to 2ULaundry I need to submit invoices via an API in order to receive payment in a timely manner.

### Acceptance criteria
1. The API accepts JSON formatted HTTP POST requests at the route '/Invoice'
The following is a sample Invoice request that will be submitted to the API endpoint.
```javascript
{
  "invoice_number": "12345",
  "total": "199.99",
  "currency": "USD",
  "invoice_date": "2019-08-17",
  "due_date": "2019-09-17",
  "vendor_name": "Acme Cleaners Inc.",
  "remittance_address": "123 ABC St. Charlotte, NC 28209"
}
```
	Status: Completed

2. The API returns an HTTP 200 Response code and the following message body

```javascript
{
  "message": "invoice submitted successfully"
}
```
	Status: Completed


3. Store the invoices in a data store of your choice with an additional property and value "status": "pending" 
	Status: Completed
	Note: Used local file storage tp simplify installation.  Expected to be intergrated with DB in a system integration  
	
### To Do
1. Very little to no data validation is done.  Not very fault tolerant.
2. Does not handle exceptions.
3. Build test case.  More testing, edge cases, multi user, etc.
