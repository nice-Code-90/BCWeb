import React, { useState, useEffect } from "react";

export default function NewSalesLineForm({
  currentCustomerForSalesLines,
  items,
  resources,
  currentDocNo,
  setPostedNewLine,
  onTabChange,
}) {
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const typeOfLine = ["Item", "Resource", "Comment"];
  const [currentType, setCurrentType] = useState(typeOfLine[0]);
  const [currentDescriptions, setCurrentDescriptions] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState("ATHENS Desk");
  const [no, setNo] = useState("1896-S");

  useEffect(() => {
    if (currentType === "Item") {
      setCurrentDescriptions(items.map((item) => item.description));
    } else if (currentType === "Resource") {
      setCurrentDescriptions(resources.map((resource) => resource.name));
    } else {
      setCurrentDescriptions([
        "Monthly Depreciation",
        "Shipping Charge",
        "Sale under Contract",
        "Travel Expenses",
      ]);
    }
  }, [items, currentType, resources]);

  const handleTypeChange = (currline) => {
    setCurrentType(currline);
  };

  const handleDescChange = (currDescription) => {
    setSelectedDescription(currDescription);
    const selectedItem = items.find(
      (item) => item.description === currDescription
    );
    const selectedResource = resources.find(
      (resource) => resource.name === currDescription
    );

    if (selectedItem) {
      setNo(selectedItem.no);
    } else if (selectedResource) {
      setNo(selectedResource.no);
    } else {
      setNo("");
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleUnitPriceChange = (e) => {
    setUnitPrice(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3000/api/PostSalesLines`, {
        method: "POST",
        body: JSON.stringify({
          documentType: "Quote",
          documentNo: currentDocNo,
          type: currentType,
          description: selectedDescription,
          description2: "",
          quantity: quantity,
          unitPrice: unitPrice,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
    setPostedNewLine(true);
    onTabChange("SalesLines");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>New Sales Line for {currentCustomerForSalesLines}</h2>
        <label htmlFor="typeOfResource">
          Type:
          <select
            onChange={(e) => handleTypeChange(e.target.value)}
            name="typeOfResource"
            value={currentType}
          >
            {typeOfLine.map((currentLine) => (
              <option key={currentLine} value={currentLine}>
                {currentLine}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="description">
          Description:
          <select
            onChange={(e) => handleDescChange(e.target.value)}
            name="description"
            value={currentDescriptions.find(
              (desc) => desc === items.find((item) => item.description)
            )}
          >
            {currentDescriptions.map((description) => (
              <option key={description} value={description}>
                {description}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="quantity">
          Quantity:
          <input
            name="quantity"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
          ></input>
        </label>
        <label htmlFor="unitPrice">
          Unit Price:
          <input
            name="unitPrice"
            type="number"
            value={unitPrice}
            onChange={handleUnitPriceChange}
          ></input>
        </label>
        <input type="submit" value="Add new Line to Sales Quote" />
      </form>
    </>
  );
}
