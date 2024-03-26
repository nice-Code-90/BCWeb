import React, { useState } from "react";
import fetchData from "../../../utils/fetchData";
import SalesLineElement from "./SalesLineElement/SalesLineElement";
import NewSalesLineForm from "./NewSalesLineForm/NewSalesLineForm";

function SalesQuoteElement({ quote, apiUrls }) {
  const [salesLines, setSalesLines] = useState([]);

  const [showSalesLines, setShowSalesLines] = useState(false);
  const [isAddingNewSalesLine, setIsAddingNewSalesLine] = useState(false);

  const handleNewSalesLineSubmit = async (newSLineData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/PostSalesLines`, {
        method: "POST",
        headers: { "Content-Type:": "application/json" },
        body: JSON.stringify(newSLineData),
      });

      if (!response.ok) {
        throw new Error(
          `Hiba az új ajánlat elem hozzáadásakor: ${response.statusText}`
        );
      }

      const newLine = await response.json();
      setSalesLines([...showSalesLines, newLine]);
      setIsAddingNewSalesLine(false);
    } catch (error) {
      console.error(`Hiba az új ajánlat elem hozzáadásakor:`, error);
    }
  };

  const handleShowSalesLines = async () => {
    setShowSalesLines(true);

    const data = await fetchData(apiUrls.salesLines);
    console.log(data);

    setSalesLines(data);
  };

  return (
    <div className="salesQuote">
      <h2>Document No: {quote.no}</h2>
      <p>Document Date: {quote.documentDate}</p>
      <p>Due Date: {quote.dueDate}</p>
      <p>Posting Date: {quote.postingDate}</p>
      <p>Sell To Customer Number: {quote.sellToCustomerNo}</p>
      <p>Sell To Customer Name: {quote.sellToCustomerName}</p>
      <p>Sell To Contact: {quote.selltoContact}</p>
      <p>Amount: {quote.Amount}</p>
      <button onClick={handleShowSalesLines}>Show Sales Lines</button>

      {isAddingNewSalesLine ? (
        <NewSalesLineForm
          salesQuoteNO={quote.no}
          onSubmit={(newLineData) => handleNewSalesLineSubmit(newLineData)}
        />
      ) : (
        <button onClick={() => setIsAddingNewSalesLine(true)}>
          New Sales Line for {quote.sellToCustomerName}
        </button>
      )}

      {showSalesLines && (
        <div className="salesLines">
          {salesLines.map((line) => (
            <SalesLineElement
              name={quote.sellToCustomerName}
              line={line}
              key={`${line["Document Type"]}-${line["Document No."]}-${line["Line No."]}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SalesQuoteElement;
