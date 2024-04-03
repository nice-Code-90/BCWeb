import { useState } from "react";

function SalesLineElement({ salesLine, onTabChange }) {
  const handleDeleteSalesLine = async () => {
    const confirmDelete = window.confirm("Delete this line of sales quote?");
  };
  /*  TODO
  if (confirmDelete) {
    try{
      await fetch(`http://localhost:3000/api/DeleteSalesQuote`, {
        method:"DELETE",
        body: JSON.stringify({})
      })
    }
  }*/

  return (
    <>
      <div className="salesLine">
        <h2>Description: {salesLine.description}</h2>
        <p>Document No: {salesLine.documentNo}</p>
        <p>Line No: {salesLine.lineNo}</p>
        <p>quantity: {salesLine.quantity}</p>
        <p>type: {salesLine.type}</p>
        <p>unit price: {salesLine.unitPrice}</p>

        <button onClick={handleDeleteSalesLine}>Delete Sales Line</button>
      </div>
    </>
  );
}

export default SalesLineElement;
