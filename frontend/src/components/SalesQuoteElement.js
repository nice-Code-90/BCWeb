import React, { useState } from "react";
import fetchData from "../utils/fetchData";
import SalesLineElement from "./SalesLineElement";

function SalesQuoteElement({ quote, apiUrls }) {
  const [salesLines, setSalesLines] = useState([]);

  const [showSalesLines, setShowSalesLines] = useState(false);

  const handleShowSalesLines = async () => {
    debugger;
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

      {showSalesLines && (
        <div className="salesLines">
          {salesLines.map((line) => (
            <SalesLineElement key={line.no} line={line} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SalesQuoteElement;
