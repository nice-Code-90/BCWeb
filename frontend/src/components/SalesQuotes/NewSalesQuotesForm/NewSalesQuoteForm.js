import React, { useState, useEffect } from "react";
import fetchData from "../../../utils/fetchData";

function NewSalesQuoteForm({ onSubmit, apiUrls }) {
  const [sellToCustomerNo, setSellToCustomerNo] = useState("");
  const [sellToContact, setSellToContact] = useState([]);
  const [documentDate, setDocumentDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [customers, setCustomers] = useState([]);

  const fetchContacts = async () => {
    try {
      // Ügyfél nevének lekérése az aktuális `sellToCustomerNo` alapján
      const currentCustomer = customers.find(
        (customer) => customer.no === sellToCustomerNo
      );

      if (!currentCustomer) {
        console.error("Customer not found!");
        return;
      }

      // Kapcsolatok lekérése
      const contactsData = await fetch(
        `http://localhost:3000/api/contacts`
      ).then((response) => response.json());

      // Aktuális ügyfél nevével megegyező kapcsolatok kiválogatása
      const filteredContacts = contactsData.value.filter(
        (contact) => contact.CompName === currentCustomer.name
      );

      // Kapcsolatok beállítása az állapotba
      setSellToContact(
        filteredContacts.map((contact) => ({
          name: contact.name,
          CompName: contact.CompName,
        }))
      );
    } catch (error) {
      console.error("Error fetching Contacts:", error);
    }
  };

  const handleCustomerChange = (customerNo) => {
    setSellToCustomerNo(customerNo);
    // Az első kapcsolat kiválasztása alapértelmezettként, ha van
    const currentCustomer = customers.find(
      (customer) => customer.no === customerNo
    );
    setSellToContact([currentCustomer.name]);
  };

  const fetchCustomers = async () => {
    try {
      const data = await fetch(`http://localhost:3000/api/customers`).then(
        (data) => data.json()
      );

      setCustomers(
        data.value.map((customer) => ({ no: customer.no, name: customer.name }))
      );
      fetchContacts();
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, [sellToCustomerNo]);

  console.log(customers);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      sellToCustomerNo,
      sellToContact:
        sellToContact.length > 0 ? sellToContact[sellToContact.length - 1] : "", // Csak az utolsó kiválasztott nevet küldi el
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
          onChange={(e) => handleCustomerChange(e.target.value)}
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
          onChange={(e) => setSellToContact([...sellToContact, e.target.value])}
          name="selltoCtact"
        >
          {sellToContact.length > 0 ? (
            sellToContact.map((selltoCont) => (
              <option key={selltoCont.no} value={selltoCont.name}>
                {selltoCont.name}
              </option>
            ))
          ) : (
            <option>Loading contacts...</option>
          )}
        </select>
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
