import React from "react";
import CustomerElement from "./CustomerElement/CustomerElement";

function Customers({ customers }) {
  if (customers.length === 0) {
    return <p>Töltés...</p>;
  }

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
