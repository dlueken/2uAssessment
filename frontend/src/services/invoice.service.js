import http from "../http-common";

class InvoiceDataService {
  getAll() {
    return http.get("/invoice");
  }

  get(id) {
    return http.get(`/invoice/${id}`);
  }

  create(data) {
    return http.post("/invoice", data);
  }

  update(id, data) {
    return http.patch(`/invoice/${id}`, data);
  }

  delete(id) {
    return http.delete(`/invoice/${id}`);
  }

  deleteAll() {
    return http.delete(`/invoice`);
  }
}

export default new InvoiceDataService();