import React, { useState, useEffect } from "react";

function NewSalesLineForm({ onSubmit, apiUrls, salesQuoteNO }) {
  const documentNo = salesQuoteNO;
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const data = await fetch(`http://localhost:3000/api/items`).then((data) =>
        data.json()
      );
    } catch (error) {
      console.error("Error fetching Items:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Sales Line</h2>
      <label htmlFor="typeOfResource">
        Type:
        <select
          onChange={(e) => handleItemChange(e.target.value)}
          name="typeOfResource"
        ></select>
      </label>
    </form>
  );
}

export default NewSalesLineForm;
