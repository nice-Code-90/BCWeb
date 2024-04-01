import React from "react";
import ItemElement from "./ItemElement/ItemElement";

function Items({ items }) {
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
