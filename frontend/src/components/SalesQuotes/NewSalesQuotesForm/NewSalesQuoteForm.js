import React, { useState, useEffect } from "react";
import fetchData from "../../../utils/fetchData";

function NewSalesQuoteForm({
  apiUrls,
  customers,
  onTabChange,
  setPostedNewQuote,
}) {
  const [sellToCustomerNo, setSellToCustomerNo] = useState(10000);
  const [sellToContact, setSellToContact] = useState([{ name: "-", key: 0 }]);
  const [documentDate, setDocumentDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  let currentCustomer = customers[0];
  const fetchContacts = async (selectedCustomer) => {
    try {
      if (!selectedCustomer) {
        console.error("Customer not found!");
        return;
      }
      // Kapcsolatok lekérése
      const contactsData = await fetchData(apiUrls.contacts);

      // Aktuális ügyfél nevével megegyező kapcsolatok kiválogatása
      const filteredContacts = contactsData.filter(
        (contact) => contact.CompName === selectedCustomer.name
      );

      // Kapcsolatok beállítása az állapotba

      setSellToContact(
        filteredContacts.map((contact, index) => ({
          name: contact.name,
          CompName: contact.CompName,
          key: index,
        }))
      );
    } catch (error) {
      console.error("Error fetching Contacts:", error);
    }
  };

  const handleContactChange = (e) => {
    const selectedValue = e.target.value;
    setSellToContact(
      sellToContact.map((contact) => ({
        ...contact,
        name: contact.name === selectedValue ? selectedValue : contact.name,
      }))
    );
  };

  const handleCustomerChange = (customerNo) => {
    setSellToCustomerNo(customerNo);
    const selectedCustomer = customers.find(
      (customer) => customer.no === customerNo
    );
    fetchContacts(selectedCustomer);
  };

  console.log(customers);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:3000/api/PostSalesQuotes`, {
        method: "POST",
        body: JSON.stringify({
          documentType: "Quote",
          no: "",
          sellToCustomerNo: sellToCustomerNo,
          documentDate: documentDate,
          dueDate: dueDate,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
    setPostedNewQuote(true);
    onTabChange("salesQuotes");
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
        <select onChange={(e) => handleContactChange(e)} name="selltoCtact">
          {Array.isArray(sellToContact) ? (
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
