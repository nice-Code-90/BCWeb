function SalesQuoteElement({
  salesQuote,
  onTabChange,
  setCurrentCustomerForSalesLines,
  setCurrentDocNoForSalesLines,
  apiUrls,
}) {
  handleDeleteSalesQuote = async (e) => {
    e.preventDefault();
    try {
      await fetch(apiUrls.deleteSalesQuotes, {
        method: "POST",
        body: JSON.stringify({
          documentType: "Quote",
          quoteNo: salesQuote.no,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
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
      <button onClick={handleDeleteSalesQuote()}>Delete This Quote</button>
    </div>
  );
}

export default SalesQuoteElement;
