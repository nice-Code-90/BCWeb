function SalesQuoteElement({ salesQuote, onTabChange }) {
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
      <button onClick={() => onTabChange("SalesLines")}>
        Show Sales Lines
      </button>
      <button>Delete This Quote</button>
    </div>
  );
}

export default SalesQuoteElement;

/*
  const [showSalesLines, setShowSalesLines] = useState(false);
  const [isAddingNewSalesLine, setIsAddingNewSalesLine] = useState(false);

  const handleNewSalesLineSubmit = async (newSLineData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/PostSalesLines`, {
        method: "POST",
        headers: { "Content-Type:": "application/json" },
        body: JSON.stringify(newSLineData),
      });

      if (!response.ok) {
        throw new Error(
          `Hiba az új ajánlat elem hozzáadásakor: ${response.statusText}`
        );
      }

      const newLine = await response.json();
      setSalesLines([...showSalesLines, newLine]);
      setIsAddingNewSalesLine(false);
    } catch (error) {
      console.error(`Hiba az új ajánlat elem hozzáadásakor:`, error);
    }
  };

  const handleShowSalesLines = async () => {
    setShowSalesLines(true);

    const data = await fetchData(apiUrls.salesLines);
    console.log(data);

    setSalesLines(data);
  };




  {isAddingNewSalesLine ? (
        <NewSalesLineForm
          salesQuoteNO={quote.no}
          onSubmit={(newLineData) => handleNewSalesLineSubmit(newLineData)}
        />
      ) : (
        <button onClick={() => setIsAddingNewSalesLine(true)}>
          New Sales Line for {quote.sellToCustomerName}
        </button>
      )}

      {showSalesLines && (
        <div className="salesLines">
          {salesLines.map((line) => (
            <SalesLineElement
              name={quote.sellToCustomerName}
              line={line}
              key={`${line["Document Type"]}-${line["Document No."]}-${line["Line No."]}`}
            />
          ))}
        </div>
      )}
*/
