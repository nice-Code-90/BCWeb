import React from "react";

export default function SalesLineList({ currentCustomerForSalesLines }) {
  return (
    <div>
      <h2>Sales Lines for {currentCustomerForSalesLines}</h2>
    </div>
  );
}
