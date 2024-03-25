import React, { useState, useEffect } from "react";
import fetchData from "../utils/fetchData";
import CustomerElement from "./CustomerElement";

function Customers({ apiUrls }) {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const data = await fetchData(apiUrls.customers);

      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, [apiUrls]);

  return (
    <div className="customers">
      <h2>Customers</h2>
      {customers.map((customer) => (
        <CustomerElement key={customer.no} customer={customer} />
      ))}
    </div>
  );
}

export default Customers;
