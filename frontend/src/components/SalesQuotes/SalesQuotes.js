import SalesQuoteElement from "./SalesQuoteElement/SalesQuoteElement";

function SalesQuotes({
  salesQuotes,
  onTabChange,
  setCurrentCustomerForSalesLines,
  setCurrentDocNoForSalesLines,
  setChangedQuoteList,
  setSalesQuotes,
  apiUrls,
  fetchData,
}) {
  return (
    <div className="salesQuotes">
      <h2>Sales Quotes</h2>
      <button onClick={() => onTabChange("newSalesQuote")}>
        New Sales Quote
      </button>

      {salesQuotes.map((salesQuote) => (
        <SalesQuoteElement
          apiUrls={apiUrls}
          fetchData={fetchData}
          key={salesQuote.no}
          salesQuote={salesQuote}
          setSalesQuotes={setSalesQuotes}
          setChangedQuoteList={setChangedQuoteList}
          setCurrentCustomerForSalesLines={setCurrentCustomerForSalesLines}
          setCurrentDocNoForSalesLines={setCurrentDocNoForSalesLines}
          onTabChange={onTabChange}
        />
      ))}
    </div>
  );
}

export default SalesQuotes;
