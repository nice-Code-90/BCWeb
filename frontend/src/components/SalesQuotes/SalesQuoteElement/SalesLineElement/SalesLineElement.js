import { useState } from "react";
import fetchData from "../../../../utils/fetchData";

function SalesLineElement({ salesLine, apiUrls, setSalesLines }) {
  const handleDeleteSalesLine = async () => {
    const confirmDelete = window.confirm("Delete this line of sales quote?");

    if (confirmDelete) {
      try {
        await fetch(`http://localhost:3000/api/DeleteSalesQuote`, {
          method: "DELETE",
          body: JSON.stringify({
            docNo: salesLine.documentNo,
            lineNo: salesLine.lineNo,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        let data = await fetchData(apiUrls.salesLines);
        setSalesLines(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
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
