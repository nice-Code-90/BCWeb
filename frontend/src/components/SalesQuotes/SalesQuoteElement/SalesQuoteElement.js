import "./SalesQuoteStyle.css";
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
    // Megjelenítjük a figyelmeztető üzenetet és csak akkor folytatjuk a törlést, ha a felhasználó elfogadja
    const confirmDelete = window.confirm(
      "Are you sure delete this sales quote?"
    );
    if (confirmDelete) {
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
    }
  };

  return (
    <div className="salesQuote">
      <h2 onClick={() => onTabChange("newSalesQuote")}>
        Document No: {salesQuote.no}
      </h2>
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
