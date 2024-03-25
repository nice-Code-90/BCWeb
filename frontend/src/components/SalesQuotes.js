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

  const [isAddingNewQuote, setIsAddingNewQuote] = useState(false);

  const handleNewQuoteSubmit = async (newQuoteData) => {
    // Kezelje az űrlap benyújtási logikáját (pl. küldje el az adatokat a háttér API-nak)

    try {
      const response = await fetch(
        `http://localhost:3000/api/PostSalesQuotes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newQuoteData),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Hiba az új értékesítési ajánlat létrehozásakor: ${response.statusText}`
        );
      }

      const newQuote = await response.json();
      setSalesQuotes([...salesQuotes, newQuote]); // Frissítse az állapotot az új ajánlattal
      setIsAddingNewQuote(false); // Zárja be az űrlapot sikeres benyújtás után
    } catch (error) {
      console.error("Hiba az új értékesítési ajánlat létrehozásakor:", error);
      // Kezelje a lehetséges hibaüzeneteket vagy az UI frissítéseit a sikertelen létrehozáshoz
    }
  };

  return (
    <div className="salesQuotes">
      <h2>Sales Quotes</h2>
      {isAddingNewQuote ? (
        <NewSalesQuoteForm
          onSubmit={(newQuoteData) => handleNewQuoteSubmit(newQuoteData)}
        />
      ) : (
        <button onClick={() => setIsAddingNewQuote(true)}>
          Add New Sales Quote
        </button>
      )}

      {salesQuotes.map((quote) => (
        <SalesQuoteElement key={quote.no} quote={quote} apiUrls={apiUrls} />
      ))}
    </div>
  );
}

export default SalesQuotes;
