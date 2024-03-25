import React, { useState, useEffect } from "react";
import fetchData from "../utils/fetchData";

function NewSalesQuoteForm({ apiUrls, onSubmit }) {
  const [sellToCustomerNo, setSellToCustomerNo] = useState("");
  const [sellToContact, setSellToContact] = useState("");
  const [documentDate, setDocumentDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const data = await fetch(`http://localhost:3000/api/customers`).then(
        (data) => data.json()
      );
      setCustomers(
        data.value.map((customer) => ({ no: customer.no, name: customer.name }))
      );
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, [apiUrls]);

  console.log(customers);

  const handleSubmit = (event) => {
    debugger;
    event.preventDefault();
    onSubmit({
      sellToCustomerNo,
      sellToContact,
      documentDate,
      dueDate,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Sales Quote</h2>
      <label htmlFor="sellToCustno">
        Sell to Customer Name:
        <select
          onChange={(e) => setSellToCustomerNo(e.target.value)}
          name="sellToCustno"
        >
          {customers.map((customer) => (
            <option key={customer.no} value={customer.no}>
              {customer.name}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="sellToCtact">
        Sell to Contact:
        <select
          onChange={(e) => sellToContact(e.target.value)}
          name="selltoCtact"
        ></select>
      </label>
      <label htmlFor="documentDate">
        Document Date:
        <input
          type="date"
          id="documentDate"
          value={documentDate}
          onChange={(e) => setDocumentDate(e.target.value)}
          placeholder="Enter Document date"
          required
        />
      </label>
      <label htmlFor="dueDate">
        Due Date:
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          placeholder="Enter Due Date"
          required
        />
      </label>
      <button type="submit">Create New Sales Quote</button>
    </form>
  );
}

export default NewSalesQuoteForm;
