import React, { useState } from "react";
import Header from "./components/Header";
import Customers from "./components/Customers/Customers";
import Items from "./components/Items/Items";
import SalesQuotes from "./components/SalesQuotes/SalesQuotes";

const apiUrls = {
  customers: `http://${window.location.hostname}:${3000}/api/customers`,
  items: `http://${window.location.hostname}:${3000}/api/items`,
  salesQuotes: `http://${window.location.hostname}:${3000}/api/salesQuotes`,
  salesLines: `http://${window.location.hostname}:${3000}/api/salesLines`,
  contacts: `http://${window.location.hostname}:${3000}/api/contacts`,
  resources: `http://${window.location.hostname}:${3000}/api/resources`,
};

function App() {
  const [selectedTab, setSelectedTab] = useState("customers");

  const handleTabChange = (tabName) => setSelectedTab(tabName);

  let content;

  switch (selectedTab) {
    case "customers":
      content = <Customers apiUrls={apiUrls} />;
      break;
    case "items":
      content = <Items apiUrls={apiUrls} />;
      break;
    case "salesQuotes":
      content = <SalesQuotes apiUrls={apiUrls} />;
      break;
    default:
      content = null;
  }

  return (
    <div className="App">
      <Header onTabChange={handleTabChange} selectedTab={selectedTab} />
      {content}
    </div>
  );
}

export default App;
