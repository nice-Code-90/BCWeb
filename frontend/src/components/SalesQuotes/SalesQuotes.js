import SalesQuoteElement from "./SalesQuoteElement/SalesQuoteElement";

function SalesQuotes({
  salesQuotes,
  onTabChange,
  setCurrentCustomerForSalesLines,
  setCurrentDocNoForSalesLines,
  apiUrls,
}) {
  return (
    <div className="salesQuotes">
      <h2>Sales Quotes</h2>
      <button onClick={() => onTabChange("newSalesQuote")}>
        New Sales Quote
      </button>

      {salesQuotes.map((salesQuote) => (
        <SalesQuoteElement
          key={salesQuote.no}
          salesQuote={salesQuote}
          apiUrls={apiUrls}
          setCurrentCustomerForSalesLines={setCurrentCustomerForSalesLines}
          setCurrentDocNoForSalesLines={setCurrentDocNoForSalesLines}
          onTabChange={onTabChange}
        />
      ))}
    </div>
  );
}

export default SalesQuotes;
