import React, { Component } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddInvoice from "./components/add-invoice.component";
import Invoice from "./components/invoice.component";
import InvoicesList from "./components/invoices-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="https://linkedin.com/in/darin-lueken" className="navbar-brand" rel="noreferrer" target="_blank">
            Darin Lueken
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to={"/invoices"} className="nav-link">
                Approve Pending Invoices
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink to={"/add"} className="nav-link">
                Add an Invoice
              </NavLink>
            </li> */}
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<InvoicesList/>} />
            <Route path="/invoices/:id" element={<Invoice/>} />
            <Route path="/add" element={<AddInvoice/>} />
            <Route path="/invoices" element={<InvoicesList/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
