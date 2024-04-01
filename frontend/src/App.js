import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CustomerComponent from "./components/Customers/Customers";
import ItemComponent from "./components/Items/Items";
import SalesQuoteComponent from "./components/SalesQuotes/SalesQuotes";
import NewSalesQuoteForm from "./components/SalesQuotes/NewSalesQuotesForm/NewSalesQuoteForm";
import fetchData from "./utils/fetchData";

const apiUrls = {
  customers: `http://${window.location.hostname}:${3000}/api/customers`,
  items: `http://${window.location.hostname}:${3000}/api/items`,
  salesQuotes: `http://${window.location.hostname}:${3000}/api/salesQuotes`,
  salesLines: `http://${window.location.hostname}:${3000}/api/salesLines`,
  contacts: `http://${window.location.hostname}:${3000}/api/contacts`,
  resources: `http://${window.location.hostname}:${3000}/api/resources`,
};

function App() {
  const [selectedTab, setSelectedTab] = useState("");
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [salesQuotes, setSalesQuotes] = useState([]);
  const handleTabChange = (tabName) => setSelectedTab(tabName);
  const [renderedSalesQuotes, setRenderedSalesQuotes] = useState(false);
  const [renderedCustomers, setRenderedCustomers] = useState(false);
  const [renderedItems, setRenderedItems] = useState(false);
  const [postedNewQuote, setPostedNewQuote] = useState(false);

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
