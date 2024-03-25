import React from "react";

function Header({ onTabChange, selectedTab }) {
  const tabs = ["customers", "items", "salesQuotes"];

  return (
    <header>
      <h1>Business Central Sales Quotes manager</h1>
      <nav>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={selectedTab === tab ? "active" : ""}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Header;
