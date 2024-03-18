// Elemek kiválasztása
const customersBtn = document.querySelector(".js-customers-button");
const itemsBtn = document.querySelector(".js-items-button");
const salesQuotesBtn = document.querySelector(".js-salesQuotes-button");
const salesLinesBtn = document.querySelector(".js-sales-Lines-button");
const contentContainer = document.querySelector(".contentContainer");
const serverHost = window.location.hostname;
const serverPort = window.location.port;
const apiUrls = {
  customers: `http://${serverHost}:${serverPort}/api/customers`,
  items: `http://${serverHost}:${serverPort}/api/items`,
  salesQuotes: `http://${serverHost}:${serverPort}/api/salesQuotes`,
  salesLines: `http://${serverHost}:${serverPort}/api/salesLines`,
};

// Adatok lekérése
async function fetchData(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json.value;
}

// Ügyfelek megjelenítése
async function renderCustomers() {
  try {
    const customers = await fetchData(apiUrls.customers);
    renderData(customers, renderCustomerElement);
  } catch (error) {
    handleRenderError("customers", error);
  }
}

// Elemek megjelenítése
async function renderItems() {
  try {
    const items = await fetchData(apiUrls.items);
    renderData(items, renderItemElement);
  } catch (error) {
    handleRenderError("items", error);
  }
}

// Értékesítési ajánlatok megjelenítése
async function renderSalesQuotes() {
  try {
    const salesQuotes = await fetchData(apiUrls.salesQuotes);
    renderData(salesQuotes, renderSalesQuoteElement);
    renderNewSalesQuoteButton(); // Új értékesítési ajánlat gomb megjelenítése
  } catch (error) {
    handleRenderError("sales quotes", error);
  }
}

// Ügyfelek, elemek és értékesítési ajánlatok megjelenítésének általános függvénye
function renderData(data, renderElementFn) {
  contentContainer.innerHTML = "";
  data.forEach((item) => {
    const element = renderElementFn(item);
    contentContainer.appendChild(element);
  });
}

// Egyedi ügyfél elem létrehozása
function renderCustomerElement(customer) {
  const element = document.createElement("div");
  element.classList.add("customer");
  element.innerHTML = `
    <h2>${customer.name}</h2>
    <p>Customer Number: ${customer.no}</p>
    <p>Address: ${customer.address}${
    customer.address2 ? `, ${customer.address2}` : ""
  }</p>
    <p>City: ${customer.city}, Postcode: ${customer.postCode}</p>
  `;
  return element;
}

// Egyedi elem elem létrehozása
function renderItemElement(item) {
  const element = document.createElement("div");
  element.classList.add("item");
  element.innerHTML = `
    <h2>${item.description}</h2>
    <p>Item Number: ${item.no}</p>
    <p>Description: ${item.description}${
    item.description2 ? `, ${item.description2}` : ""
  }</p>
    <p>Unit Price: ${item.unitPrice}</p>
  `;
  return element;
}

// Egyedi értékesítési ajánlat elem létrehozása
function renderSalesQuoteElement(quote) {
  const element = document.createElement("div");
  element.classList.add("salesQuote");

  const moreInfoBtn = document.createElement("button");
  moreInfoBtn.classList.add("js-sales-Lines-button");
  moreInfoBtn.textContent = "More Info";

  moreInfoBtn.addEventListener("click", async () => {
    await renderSalesLines(quote.no);
  });

  element.appendChild(moreInfoBtn);

  const infoContainer = document.createElement("div");
  infoContainer.innerHTML = `
    <h2>Document No: ${quote.no}</h2>
    <p>Document Date: ${quote.documentDate}</p>
    <p>Due Date: ${quote.dueDate}</p>
    <p>Posting Date: ${quote.postingDate}</p>
    <p>Sell To Customer Number: ${quote.sellToCustomerNo}</p>
    <p>Sell To Customer Name: ${quote.sellToCustomerName}</p>
    <p>Sell To Contact: ${quote.selltoContact}</p>
    <p>Amount: ${quote.Amount}</p>
  `;

  element.appendChild(infoContainer);

  return element;
}

// Új értékesítési ajánlat gomb megjelenítése
function renderNewSalesQuoteButton() {
  const newSalesQuoteButton = document.createElement("button");
  newSalesQuoteButton.classList.add("js-New-salesQuote-button");
  newSalesQuoteButton.textContent = "Add New Sales Quote";
  newSalesQuoteButton.addEventListener("click", newSalesQuote);
  contentContainer.appendChild(newSalesQuoteButton);
}

// Általános hiba kezelése
function handleRenderError(dataType, error) {
  console.error(`Error rendering ${dataType} data:`, error);
  contentContainer.innerHTML = `<p>Error loading ${dataType}: ${error.message}</p>`;
}

// Sales Lines megjelenítése
async function renderSalesLines(salesQuoteNo) {
  try {
    const salesLines = await fetchData(apiUrls.salesLines);
    contentContainer.innerHTML = "";
    renderData(
      salesLines.filter((line) => line.documentNo === salesQuoteNo),
      renderSalesLineElement
    );
    renderNewSalesLineButton(salesQuoteNo);
  } catch (error) {
    handleRenderError("sales lines", error);
  }
}

// Új értékesítési sor gomb megjelenítése
function renderNewSalesLineButton(salesQuoteNo) {
  const newSalesLineButton = document.createElement("button");
  newSalesLineButton.classList.add("js-New-salesLine-button");
  newSalesLineButton.textContent = "Add New Sales Line";
  newSalesLineButton.addEventListener(
    "click",
    async () => await newSalesLine(salesQuoteNo)
  );
  contentContainer.appendChild(newSalesLineButton);
}

// Egyedi értékesítési sor elem létrehozása
function renderSalesLineElement(salesLine) {
  const element = document.createElement("div");
  element.classList.add("salesLine");
  element.innerHTML = `
    <h2>Description: ${salesLine.description}</h2>
    <p>Document No: ${salesLine.documentNo}</p>
    <p>Line No: ${salesLine.lineNo}</p>
    <p>quantity: ${salesLine.quantity}</p>
    <p>type: ${salesLine.type}</p>
    <p>unit price: ${salesLine.unitPrice}</p>
  `;
  return element;
}

// Új értékesítési ajánlat létrehozása
function newSalesQuote() {
  contentContainer.innerHTML = `
    <form action="/api/PostSalesQuotes" method="POST">
      <input type="number" name="sellToCustomerNo" placeholder="Enter Sell to Customer No:" />
      <input type="text" name="sellToContact" placeholder="Enter Sell to Contact name:" />
      <input type="date" name="documentDate" placeholder="Enter Document date:" />
      <input type="date" name="dueDate" placeholder="Enter due Date:" />
      <input type="submit" value="Create New Sales Quote" />
    </form>
  `;
}

// Új értékesítési sor létrehozása
function newSalesLine(salesQuoteNo) {
  contentContainer.innerHTML = `
    <form action="/api/PostSalesLines" method="POST">
      <input type="number" name="documentNo" value="${salesQuoteNo}" readonly>
      <input type="text" name="type" placeholder="Enter SalesLine type of transaction:" />
      <input type="text" name="no" placeholder="Enter SalesLine no:" />
      <input type="description" name="description" placeholder="Enter description" />
      <input type="number" name="quantity" placeholder="Enter quantity:" />
      <input type="number" name="unitPrice" placeholder="Enter unit price:" />
      <input type="submit" value="Create New Sales Line" />
    </form>
  `;
}

// Eseménykezelők hozzáadása a gombokhoz
customersBtn.addEventListener("click", renderCustomers);
itemsBtn.addEventListener("click", renderItems);
salesQuotesBtn.addEventListener("click", renderSalesQuotes);
