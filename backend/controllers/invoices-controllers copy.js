const uuid = require('uuid/v4');

const HttpError = require('../models/http-error');

let DUMMY_INVOICES = [
  {
    "invoice_number": "12345",
    "total": "199.99",
    "currency": "USD",
    "invoice_date": "2019-08-17",
    "due_date": "2019-09-17",
    "vendor_name": "Acme Cleaners Inc.",
    "remittance_address": "123 ABC St. Charlotte, NC 28209",
    "status": "pending"
  },
    {
    "invoice_number": "12346",
    "total": "99.99",
    "currency": "USD",
    "invoice_date": "2020-08-17",
    "due_date": "2020-09-17",
    "vendor_name": "Emca Cleaners Inc.",
    "remittance_address": "123 XYZ St. Junper, SC 19234",
    "status": "pending"
  }
];

const getInvoiceList = (req, res, next) => {
  const invoices = DUMMY_INVOICES;
  res.json({ invoices });
};

const getInvoiceById = (req, res, next) => {
  const invoiceNum = req.params.iid; 

  const invoice = DUMMY_INVOICES.find(i => {
    return i.invoice_number === invoiceNum;
  });

  if (!invoice) {
    throw new HttpError('Could not find an invoice for the provided number.', 404);
  }

  res.json({ invoice });
};

const createInvoice = (req, res, next) => {
  const { total, currency, invoice_date, due_date, vendor_name, remittance_address } = req.body;

  const createdInvoice = {
    id: uuid(),
    currency,
    invoice_date,
    due_date,
    vendor_name,
    remittance_address,
    status: "pending"
  };

  DUMMY_INVOICES.push(createdInvoice); //unshift(createdPlace)

  res.status(200).json({ message: "invoice submitted successfully" });
};

const updateInvoice = (req, res, next) => {
  const invoiceNum = req.params.iid;

  const updatedInvoice = { ...DUMMY_INVOICES.find(i => i.invoice_number === invoiceNum) };

  if (!updatedInvoice) {
    throw new HttpError('Could not find an invooice for the provided number.', 404);
  }

  const invoiceIndex = DUMMY_INVOICES.findIndex(i => i.invoice_number === invoiceNum);
  if ( req.body.total ) { updatedInvoice.total = req.body.total; }
  if ( req.body.currency ) { updatedInvoice.currency = req.body.currency; }
  if ( req.body.invoice_date ) { updatedInvoice.invoice_date = req.body.invoice_date; }
  if ( req.body.due_date ) { updatedInvoice.due_date = req.body.due_date; }
  if ( req.body.vendor_name ) { updatedInvoice.vendor_name = req.body.vendor_name; }
  if ( req.body.remittance_address ) { updatedInvoice.remittance_address = req.body.remittance_address; }
  if ( req.body.status ) { updatedInvoice.status = req.body.status; }

  DUMMY_INVOICES[invoiceIndex] = updatedInvoice;

  res.status(200).json({ invoice: updatedInvoice });
};

const deleteInvoice = (req, res, next) => {
  const invoiceNum = req.params.iid;
  DUMMY_INVOICES = DUMMY_INVOICES.filter(i => i.invoice_number !== invoiceNum);
  res.status(200).json({ message: 'Deleted invoice.' });
};

exports.getInvoiceList = getInvoiceList;
exports.getInvoiceById = getInvoiceById;
exports.createInvoice = createInvoice;
exports.updateInvoice = updateInvoice;
exports.deleteInvoice = deleteInvoice;
