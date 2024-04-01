import React, { useState } from "react";

function NewSalesLineForm({ onSubmit, apiUrls, salesQuoteNO }) {
  const documentNo = salesQuoteNO;
  const [lineTypeElements, setLineTypeElements] = useState([]);
  const typeOfLine = ["Comment", "Item", "Resource"];
  const [currentType, setCurrentType] = useState(typeOfLine[0]); // Állapot a kiválasztott típus tárolására
  const [No, setNo] = useState([]); // Állapot a No elemek tárolására

  const handleTypeChange = async (currline) => {
    setCurrentType(currline); // Állapot frissítése az aktuális típussal

    if (currline === "Item") {
      const items = await fetchItems();
      setNo(items); // No állapot frissítése az Item-ekkel
    } else if (currline === "Resource") {
      const resources = await fetchResources();
      setNo(resources); // No állapot frissítése a Resource-okkal
    }
  };

  const fetchResources = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/resources`);
      const data = await response.json();
      return data.value;
    } catch (error) {
      console.error("Error fetching Resources:", error);
      return [];
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/items`);
      const data = await response.json();
      return data.value;
    } catch (error) {
      console.error("Error fetching Items:", error);
      return [];
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({});
  };

  const handleNOChange = () => {};

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Sales Line</h2>
      <label htmlFor="typeOfResource">
        Type:
        <select
          onChange={(e) => handleTypeChange(e.target.value)}
          name="typeOfResource"
          value={currentType} // Az aktuális típus értékének beállítása a select elemen
        >
          {typeOfLine.map((currentLine) => (
            <option key={currentLine} value={currentLine}>
              {currentLine}
            </option>
          ))}
        </select>
      </label>
      <label
        htmlFor="No."
        title="Specifies the number of a general ledger account, item, resource, additional cost, or fixed asset, depending on the contents of the Type field."
      >
        No.
        <select onChange={(e) => handleNOChange(e.target.value)} name="No.">
          {No.map((NoElement) => (
            <option
              key={NoElement.no}
              value={NoElement.name ? NoElement.name : NoElement.description}
            >
              {NoElement.name ? NoElement.name : NoElement.description}
            </option>
          ))}
        </select>
      </label>
      <label
        htmlFor="quantity"
        title="Specifies how many units are being sold."
      >
        quantity
        <input type="number"></input>
      </label>
      <label htmlFor="unitPrice">
        Unit price
        <input type="number"></input>
      </label>
      <button type="submit">Add New SalesQuote Line</button>
    </form>
  );
}

export default NewSalesLineForm;
