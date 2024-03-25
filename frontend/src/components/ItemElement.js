function ItemElement({ item }) {
  return (
    <div className="item">
      <h2>{item.description}</h2>
      <p>Item Number: {item.no}</p>
      <p>
        Description: {item.description}$
        {item.description2 ? `, ${item.description2}` : ""}
      </p>
      <p>Unit Price: {item.unitPrice}</p>
    </div>
  );
}

export default ItemElement;
