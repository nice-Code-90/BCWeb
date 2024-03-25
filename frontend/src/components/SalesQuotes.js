import React, { useState, useEffect } from "react";
import fetchData from "../utils/fetchData";
import SalesQuoteElement from "./SalesQuoteElement";
import NewSalesQuoteForm from "./NewSalesQuoteForm";

function SalesQuotes({ apiUrls }) {
  const [salesQuotes, setSalesQuotes] = useState([]);

  useEffect(() => {
    const fetchSalesQuotes = async () => {
      try {
        const data = await fetchData(apiUrls.salesQuotes);
        setSalesQuotes(data);
      } catch (error) {
        console.error("Error fetching sales quotes:", error);
      }
    };

    fetchSalesQuotes();
  }, [apiUrls]);

  return (
    <div className="salesQuotes">
      <h2>Sales Quotes</h2>

      {salesQuotes.map((quote) => (
        <SalesQuoteElement key={quote.no} quote={quote} apiUrls={apiUrls} />
      ))}
    </div>
  );
}

export default SalesQuotes;
