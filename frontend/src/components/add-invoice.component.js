import React, { Component } from "react";
import InvoiceDataService from "../services/invoice.service";

export default class AddInvoice extends Component {
  constructor(props) {
    super(props);
    this.onChangeTotal = this.onChangeTotal.bind(this);
    this.onChangeTotal = this.onChangeTotal.bind(this);
    this.onChangeCurrency = this.onChangeCurrency.bind(this);
    this.onChangeInvoiceDate = this.onChangeInvoiceDate.bind(this);
    this.onChangeDueDate = this.onChangeDueDate.bind(this);
    this.onChangeVendorName = this.onChangeVendorName.bind(this);
    this.onChangeRemitAddr = this.onChangeRemitAddr.bind(this);
    this.saveInvoice = this.saveInvoice.bind(this);
    this.newInvoice = this.newInvoice.bind(this);

    this.state = {
      currentInvoice: {
        invoice_number: null,
        total: 0,
        currency: "",
        invoice_date: "",
        due_date: "",
        vendor_name: "",
        remittance_address: "",
        status: "",
      },
      message: ""
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveTutorial() {
    var data = {
      title: this.state.title,
      description: this.state.description
    };

    InvoiceDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveTutorial} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
