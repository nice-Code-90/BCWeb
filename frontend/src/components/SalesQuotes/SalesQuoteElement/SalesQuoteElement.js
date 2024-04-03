import React, { useState } from "react";
import ConfirmDialog from "react-confirm-dialog";

function SalesQuoteElement({
  salesQuote,
  onTabChange,
  setCurrentCustomerForSalesLines,
  setCurrentDocNoForSalesLines,
  setChangedQuoteList,
  setSalesQuotes,
  fetchData,
  apiUrls,
}) {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleDeleteSalesQuote = () => {
    setOpenConfirmDialog(true); // Megerősítő ablak megjelenítése

    setChangedQuoteList(true); // Újra renderelés indítása
    onTabChange("salesQuotes"); // Tab megváltoztatása
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(`http://localhost:3000/api/DeleteSalesQuote`, {
        method: "DELETE",
        body: JSON.stringify({
          quoteNo: salesQuote.no,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await fetchData(apiUrls.salesQuotes);
      setSalesQuotes(data);
    } catch (error) {
      console.log(error);
    } finally {
      setOpenConfirmDialog(false);
    }
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false); // Megerősítő ablak bezárása
  };

  const confirmationMessage = {
    title: "Confirm Deletion",
    content: "Are you sure you want to delete this sales quote?",
  };

  return (
    <div className="salesQuote">
      <h2>Document No: {salesQuote.no}</h2>
      <p>Document Date: {salesQuote.documentDate}</p>
      <p>Due Date: {salesQuote.dueDate}</p>
      <p>Posting Date: {salesQuote.postingDate}</p>
      <p>Sell To Customer Number: {salesQuote.sellToCustomerNo}</p>
      <p>Sell To Customer Name: {salesQuote.sellToCustomerName}</p>
      <p>Sell To Contact: {salesQuote.selltoContact}</p>
      <p>Amount: {salesQuote.Amount}</p>
      <button
        onClick={() => {
          setCurrentCustomerForSalesLines(salesQuote.sellToCustomerName);
          setCurrentDocNoForSalesLines(salesQuote.no);
          onTabChange("SalesLines");
        }}
      >
        Show Sales Lines
      </button>

      <button onClick={handleDeleteSalesQuote}>Delete This Quote</button>
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={handleCancelDelete}
        content={confirmationMessage.content}
        buttons={[
          {
            label: "Delete",
            onClick: handleConfirmDelete,
          },
          {
            label: "Cancel",
            onClick: handleCancelDelete,
          },
        ]}
      />
    </div>
  );
}

export default SalesQuoteElement;
