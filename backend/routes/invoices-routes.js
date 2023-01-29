const express = require('express');

const invoicesControllers = require('../controllers/invoices-controllers');

const router = express.Router();

router.get('/', invoicesControllers.getInvoiceList);

router.get('/:iid', invoicesControllers.getInvoiceById);

router.post('/', invoicesControllers.createInvoice);

router.patch('/:iid', invoicesControllers.updateInvoice);

router.delete('/:iid', invoicesControllers.deleteInvoice);

module.exports = router;
