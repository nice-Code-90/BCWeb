import SalesQuoteElement from "./SalesQuoteElement/SalesQuoteElement";

function SalesQuotes({ salesQuotes, onTabChange }) {
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
          onTabChange={onTabChange}
        />
      ))}
    </div>
  );
}

export default SalesQuotes;
