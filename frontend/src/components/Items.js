import React, { useState, useEffect } from "react";
import fetchData from "../utils/fetchData";
import ItemElement from "./ItemElement";

function Items({ apiUrls }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await fetchData(apiUrls.items);

        setItems(data);
      } catch (error) {
        console.error("Error fetching items", error);
      }
    };

    fetchItems();
  }, [apiUrls]);

  return (
    <div className="items">
      <h2>Items</h2>
      {items.map((item) => (
        <ItemElement key={item.no} item={item} />
      ))}
    </div>
  );
}

export default Items;
