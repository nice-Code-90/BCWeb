import { useState } from "react";

function SalesLineElement({ salesLine, onTabChange }) {
  return (
    <>
      <div className="salesLine">
        <h2>Description: {salesLine.description}</h2>
        <p>Document No: {salesLine.documentNo}</p>
        <p>Line No: {salesLine.lineNo}</p>
        <p>quantity: {salesLine.quantity}</p>
        <p>type: {salesLine.type}</p>
        <p>unit price: {salesLine.unitPrice}</p>
      </div>
    </>
  );
}

export default SalesLineElement;
