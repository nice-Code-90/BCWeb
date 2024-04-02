import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CustomerComponent from "./components/Customers/Customers";
import ItemComponent from "./components/Items/Items";
import SalesQuoteComponent from "./components/SalesQuotes/SalesQuotes";
import NewSalesQuoteForm from "./components/SalesQuotes/NewSalesQuotesForm/NewSalesQuoteForm";
import fetchData from "./utils/fetchData";
import SalesLineList from "./components/SalesQuotes/SalesQuoteElement/SalesLineElement/SalesLineList";

const apiUrls = {
  customers: `http://${window.location.hostname}:${3000}/api/customers`,
  items: `http://${window.location.hostname}:${3000}/api/items`,
  salesQuotes: `http://${window.location.hostname}:${3000}/api/salesQuotes`,
  salesLines: `http://${window.location.hostname}:${3000}/api/salesLines`,
  contacts: `http://${window.location.hostname}:${3000}/api/contacts`,
  resources: `http://${window.location.hostname}:${3000}/api/resources`,
};

function App() {
  const [selectedTab, setSelectedTab] = useState(""); // actual page on web-portal
  const [customers, setCustomers] = useState([]); // list of Customers
  const [items, setItems] = useState([]); // list of items
  const [salesQuotes, setSalesQuotes] = useState([]); //list of Sales Headers
  const [salesLines, setSalesLines] = useState([]); // list of Sales Lines
  //----------------------------------------------------------------------------------------------------------------//
  const handleTabChange = (tabName) => setSelectedTab(tabName); // function for change page
  const [renderedSalesQuotes, setRenderedSalesQuotes] = useState(false); // enable when RENDERED SALES QUOTE HEADERS
  const [renderedSalesLines, setRenderedSalesLines] = useState(false); // enable when RENDERED SALES LINES
  const [renderedCustomers, setRenderedCustomers] = useState(false); //  enable when REDNERED CUSTOMERS
  const [renderedItems, setRenderedItems] = useState(false); // ........... RENDERED ITEMS
  //------------------------------------------------------------------------------------------------------------------//
  const [postedNewQuote, setPostedNewQuote] = useState(false); // enable when adding new Sales Header
  const [postedNewLine, setPostedNewLine] = useState(false);

  const [currentCustomerForSalesLines, setCurrentCustomerForSalesLines] =
    useState(""); // customer Name passed from salesHeader to salesLine
  const [currentDocNoForSalesLines, setCurrentDocNoForSalesLines] =
    useState("");

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        if (selectedTab === "customers") {
          if (!renderedCustomers) {
            const data = await fetchData(apiUrls.customers);
            setCustomers(data);
            setRenderedCustomers(true);
          }
        }
        if (selectedTab === "items") {
          if (!renderedItems) {
            const data = await fetchData(apiUrls.items);
            setItems(data);
            setRenderedItems(true);
          }
        }
        if (selectedTab === "salesQuotes") {
          if (!renderedSalesQuotes || postedNewQuote) {
            let data = await fetchData(apiUrls.customers);
            setCustomers(data);
            data = await fetchData(apiUrls.salesQuotes);

            setSalesQuotes(data);
            setRenderedSalesQuotes(true);
          }
        }
        if (selectedTab === "SalesLines") {
          if (!renderedSalesLines || postedNewLine) {
            const data = await fetchData(apiUrls.salesLines);
            setSalesLines(data);
            setRenderedSalesLines(true);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAndSetState();
  }, [
    apiUrls.customers,
    apiUrls.items,
    apiUrls.salesQuotes,
    selectedTab,
    customers,
    items,
    salesQuotes,
  ]);

  let content;

  switch (selectedTab) {
    case "customers":
      content = <CustomerComponent customers={customers} />;
      break;
    case "items":
      content = <ItemComponent items={items} />;
      break;
    case "salesQuotes":
      content = (
        <SalesQuoteComponent
          salesQuotes={salesQuotes}
          setCurrentCustomerForSalesLines={setCurrentCustomerForSalesLines}
          setCurrentDocNoForSalesLines={setCurrentDocNoForSalesLines}
          onTabChange={handleTabChange}
        />
      );

      break;
    case "newSalesQuote":
      content = (
        <NewSalesQuoteForm
          customers={customers}
          apiUrls={apiUrls}
          salesQuotes={salesQuotes}
          onTabChange={handleTabChange}
          setPostedNewQuote={setPostedNewQuote}
        />
      );
      break;
    case "SalesLines":
      content = (
        <SalesLineList
          salesLines={salesLines}
          currentCustomerForSalesLines={currentCustomerForSalesLines}
          currentDocNo={currentDocNoForSalesLines}
        />
      );
      break;
    default:
      content = null;
      break;
  }

  return (
    <div className="App">
      <Header onTabChange={handleTabChange} selectedTab={selectedTab} />
      {content}
    </div>
  );
}

export default App;
