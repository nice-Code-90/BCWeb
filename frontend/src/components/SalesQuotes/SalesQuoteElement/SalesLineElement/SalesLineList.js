import React from "react";
import SalesLineElement from "./SalesLineElement";

export default function SalesLineList({
  currentCustomerForSalesLines,
  salesLines,
  onTabChange,
  currentDocNo,
}) {
  console.log(salesLines);
  return (
    <div>
      <h2>Sales Lines for {currentCustomerForSalesLines}</h2>

      {salesLines
        .filter((salesLine) => salesLine.documentNo === currentDocNo)
        .map((salesLine) => (
          <SalesLineElement
            key={`${salesLine.lineNo}${salesLine.documentNo}`}
            salesLine={salesLine}
            onTabChange={onTabChange}
          />
        ))}
    </div>
  );
}
