import React, { Component } from "react";
import InvoiceDataService from "../services/invoice.service";
import { withRouter } from '../common/with-router';

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.getInvoice = this.getInvoice.bind(this);
    this.updateInvoice = this.updateInvoice.bind(this);

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

  componentDidMount() {
    this.getInvoice(this.props.router.params.id);
  }

  getInvoice(id) {
    InvoiceDataService.get(id)
      .then(response => {
        this.setState({
          currentInvoice: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateInvoice() {
    InvoiceDataService.update(
      this.state.currentInvoice.id,
      { status: "" }
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The invoice was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    const { currentInvoice } = this.state;

    return (
      <div>
        {currentInvoice ? (
          <div className="edit-form">
            <h4>Invoice</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentInvoice.name}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentInvoice.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentInvoice.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentInvoice.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTutorial}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateInvoice}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Invoice...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Invoice);