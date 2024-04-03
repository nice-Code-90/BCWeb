import React from "react";
import SalesLineElement from "./SalesLineElement";

export default function SalesLineList({
  currentCustomerForSalesLines,
  salesLines,
  onTabChange,
  currentDocNo,
  apiUrls,
  setSalesLines,
}) {
  console.log(salesLines);
  return (
    <div>
      <h2>Sales Lines for {currentCustomerForSalesLines}</h2>
      <button onClick={() => onTabChange("newSalesLine")}>
        New Sales Line for {currentCustomerForSalesLines}
      </button>

      {salesLines
        .filter((salesLine) => salesLine.documentNo === currentDocNo)
        .map((salesLine) => (
          <SalesLineElement
            setSalesLines={setSalesLines}
            key={`${salesLine.lineNo}${salesLine.documentNo}`}
            salesLine={salesLine}
            apiUrls={apiUrls}
            onTabChange={onTabChange}
          />
        ))}
    </div>
  );
}
