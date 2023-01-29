const uuid = require('uuid/v4');
const HttpError = require('../models/http-error');
const fs = require('fs');
const path = require('path');

function buildPath(fileName) {
  return path.join(process.cwd(), 'data', fileName);
}

function loadInvoices() {
  const filePath = buildPath('invoices-data.json');
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function storeInvoices(data) {
  const filePath = buildPath('invoices-data.json');
  fs.writeFileSync(filePath, JSON.stringify(data));
  return;
}

const getInvoiceList = (req, res, next) => {
  const invoices = loadInvoices();
  res.json({ invoices });
};

const getInvoiceById = (req, res, next) => {
  const invoiceNum = req.params.iid; 
  const invoices = InvoicesData.loadInvoices();
  const invoice = invoices.find(i => {
    return i.invoice_number === invoiceNum;
  });

  if (!invoice) {
    throw new HttpError('Could not find an invoice for the provided number.', 404);
  }

  res.json({ invoice });
};

const createInvoice = (req, res, next) => {
  const { total, currency, invoice_date, due_date, vendor_name, remittance_address } = req.body;

  const curTime = String(new Date().getTime());
  const iNum = curTime.substring(curTime.length-5);
  const createdInvoice = {
    // invoice_number: uuid(),
    invoice_number: curTime,
    total,
    currency,
    invoice_date,
    due_date,
    vendor_name,
    remittance_address,
    status: "pending"
  };

  const invoices = loadInvoices();
  invoices.push(createdInvoice); 
  storeInvoices(invoices);
  res.status(200).json({ message: "invoice submitted successfully" });
};

const updateInvoice = (req, res, next) => {
  const invoiceNum = req.params.iid;
  const invoices = loadInvoices();
  const updatedInvoice = { ...invoices.find(i => i.invoice_number === invoiceNum) };

  if (!updatedInvoice) {
    throw new HttpError('Could not find an invooice for the provided number.', 404);
  }

  const invoiceIndex = invoices.findIndex(i => i.invoice_number === invoiceNum);
  if ( req.body.total ) { updatedInvoice.total = req.body.total; }
  if ( req.body.currency ) { updatedInvoice.currency = req.body.currency; }
  if ( req.body.invoice_date ) { updatedInvoice.invoice_date = req.body.invoice_date; }
  if ( req.body.due_date ) { updatedInvoice.due_date = req.body.due_date; }
  if ( req.body.vendor_name ) { updatedInvoice.vendor_name = req.body.vendor_name; }
  if ( req.body.remittance_address ) { updatedInvoice.remittance_address = req.body.remittance_address; }
  if ( req.body.status ) { updatedInvoice.status = req.body.status; }

  invoices[invoiceIndex] = updatedInvoice;
  storeInvoices(invoices);
  res.status(200).json({ invoice: updatedInvoice });
};

const deleteInvoice = (req, res, next) => {
  const invoiceNum = req.params.iid;
  const invoices = InvoicesData.loadInvoices();
  invoices = invoices.filter(i => i.invoice_number !== invoiceNum);
  InvoicesData.saveInvoices(invoices);
  res.status(200).json({ message: 'Deleted invoice.' });
};

exports.getInvoiceList = getInvoiceList;
exports.getInvoiceById = getInvoiceById;
exports.createInvoice = createInvoice;
exports.updateInvoice = updateInvoice;
exports.deleteInvoice = deleteInvoice;
