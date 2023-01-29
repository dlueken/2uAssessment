import React, { Component } from "react";
import InvoiceDataService from "../services/invoice.service";

export default class InvoicesList extends Component {
  constructor(props) {
    super(props);

    this.retrieveInvoices = this.retrieveInvoices.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveInvoice = this.setActiveInvoice.bind(this);
    this.approveInvoice = this.approveInvoice.bind(this);

    this.state = {
      invoices: [],
      currentInvoice: null,
      currentIndex: -1,
      watchInt: null,
      message: ""
    };
  }

  componentDidMount() {
    this.retrieveInvoices();
    let watchInt = setInterval(() => {console.log("interval hit"); this.retrieveInvoices()}, 30000);
    this.setState({
          watchInt: watchInt
    });
  }

  componentWillUnmount() {
    if ( this.state.watchInt ) {
        console.log("interval cleared"); 
        clearInterval(this.state.watchInt);
        this.setState({
          watchInt: null
        });
    }
  }

  retrieveInvoices() {
    InvoiceDataService.getAll()
      .then(response => {
        let invoices = response.data.invoices?response.data.invoices:[];
        this.setState({
          invoices: invoices
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveInvoices();
    this.setState({
      currentInvoice: null,
      currentIndex: -1,
      message: ""
    });
  }

  setActiveInvoice(invoice, index) {
    this.setState({
      currentInvoice: invoice,
      currentIndex: index,
      message: ""
    });
  }

  approveInvoice(currentInvoice) {
    this.setState({message: "" });
    InvoiceDataService.update(
      currentInvoice.invoice_number,
      { status: "Approved" }
    )
      .then(response => {
        this.refreshList();
        this.setState({
          message: "The invoice was approved successfully",
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { invoices, currentInvoice, currentIndex, message } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Invoices To Approve</h4>
          { message  &&
            <div>
              <br />
              <p>{message}</p>
            </div>
          }
          <ul className="list-group">
            {invoices &&
              invoices
              .filter(invoice => invoice.status === 'pending')
              .map((invoice, index) => (

                <li className={
                    "list-group-item " +
                    (invoice.status === 'pending' ? "visible" : "invisible") + " " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveInvoice(invoice, index)}
                  key={index}
                >
                  <div>Invoice Number: {invoice.invoice_number}</div>
                  <div className={"list-details"}>{invoice.vendor_name}</div>
                  <div className={"list-details"}>{invoice.remittance_address}</div>
                  <div className={"list-details"}>Created on {invoice.invoice_date}</div>
                  <div className={"list-details"}>{invoice.total} {invoice.currency} due by {invoice.due_date}</div>
                </li>

              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentInvoice ? (
            <div className="border p-3">
              <h4>Invoice Number: {currentInvoice.invoice_number}</h4>
              <div>
                <label>
                  <strong>Vendor Name:</strong>
                </label>{" "}
                {currentInvoice.vendor_name}
              </div>
              <div>
                <label>
                  <strong>Vendor Address:</strong>
                </label>{" "}
                {currentInvoice.remittance_address}
              </div>
              <div>
                <label>
                  <strong>Invoice Amount:</strong>
                </label>{" "}
                {currentInvoice.total} {currentInvoice.currency}
              </div>
              <div>
                <label>
                  <strong>Invoice Date:</strong>
                </label>{" "}
                {currentInvoice.invoice_date}
              </div>
              <div>
                <label>
                  <strong>Due Date:</strong>
                </label>{" "}
                {currentInvoice.due_date}
              </div>
              <div>
                <button
                  className="m-3 btn btn-sm btn-primary"
                  onClick={() => this.approveInvoice(currentInvoice)}
                >
                  Approve
                </button>
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an invoice to approve it</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
