import React, { useState } from "react";

function NewSalesQuoteForm({ onSubmit }) {
  const [sellToCustomerNo, setSellToCustomerNo] = useState("");
  const [sellToContact, setSellToContact] = useState("");
  const [documentDate, setDocumentDate] = useState("");
  const [dueDate, setDueDate] = useState("");

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
      <label htmlFor="sellToCustomerNo">
        Sell to Customer No:
        <input
          type="number"
          id="sellToCustomerNo"
          value={sellToCustomerNo}
          onChange={(e) => setSellToCustomerNo(e.target.value)}
          placeholder="Enter Sell to Customer No"
          required
        />
      </label>
      <label htmlFor="sellToContact">
        Sell to Contact:
        <input
          type="text"
          id="sellToContact"
          value={sellToContact}
          onChange={(e) => setSellToContact(e.target.value)}
          placeholder="Enter Sell to Contact name"
          required
        />
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
