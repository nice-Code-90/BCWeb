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
  const handleDeleteSalesQuote = async () => {
    debugger;
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
    }
    setChangedQuoteList(true);
    onTabChange("salesQuotes");
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
    </div>
  );
}

export default SalesQuoteElement;
