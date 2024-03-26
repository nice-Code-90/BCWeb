import { useState } from "react";

function SalesLineElement({ line, name }) {
  const [isAddingNewLine, setIsAddingNewLine] = useState(false);

  return (
    <>
      <div className="salesLine">
        <h2>Description: {line.description}</h2>
        <p>Document No: {line.documentNo}</p>
        <p>Line No: {line.lineNo}</p>
        <p>quantity: {line.quantity}</p>
        <p>type: {line.type}</p>
        <p>unit price: {line.unitPrice}</p>
      </div>
    </>
  );
}

export default SalesLineElement;
