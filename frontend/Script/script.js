//pointers to html buttons
const customerButton = document.querySelector(".js-customers-button");
const itemsButton = document.querySelector(".js-items-button");
const salesQuotesButton = document.querySelector(".js-salesQuotes-button");

//pointers to html body areas
const contentContainer = document.querySelector(".contentContainer");
//Connection datas
const serverHost = window.location.hostname;
const serverPort = window.location.port;
const customersAPI = `http://${serverHost}:${serverPort}/api/customers`;
const itemsAPI = `http://${serverHost}:${serverPort}/api/items`;
const salesQuotesAPI = `http://${serverHost}:${serverPort}/api/salesQuotes`;
const salesLinesAPI = `http://${serverHost}:${serverPort}/api/salesLines`;

//prepare sales Quotes data for rendering
let salesQuotes = [];
async function loadSalesQuotes() {
  let data = await fetch(salesQuotesAPI);
  let dataJson = await data.json();
  salesQuotes = dataJson.value;
}

// Load and render Sales Lines for the selected Sales Quote
async function loadAndRenderSalesLines(quoteNumber) {
  try {
    // Load Sales Lines for the selected Sales Quote
    let data = await fetch(
      `${salesLinesAPI}?filter=Document_No eq ${quoteNumber}`
    );
    let dataJson = await data.json();
    const salesLines = dataJson.value;

    // Render Sales Lines
    renderSalesLines(salesLines);
  } catch (error) {
    console.error("Error loading salesLines data:", error);
    contentContainer.innerHTML = `<p>Error loading salesLines: ${error.message}</p>`;
  }
}

// Render Sales Lines
function renderSalesLines(salesLines) {
  contentContainer.innerHTML = "";
  salesLines.forEach((salesLine) => {
    const salesLineElement = document.createElement("div");
    salesLineElement.classList.add("salesLine");

    // Additional information for Sales Lines
    const salesLineInfo = `
        <h2>Sales Line Number: ${salesLine.lineNumber}</h2>
        <p>Item Number: ${salesLine.itemNo}</p>
        <p>Description: ${salesLine.description}</p>
        <p>Unit Price: ${salesLine.unitPrice}</p>
        <p>Quantity: ${salesLine.quantity}</p>
      `;
    salesLineElement.innerHTML = salesLineInfo;

    contentContainer.appendChild(salesLineElement);
  });
}

async function renderSalesQuotes() {
  try {
    if (salesQuotes.length === 0) {
      await loadSalesQuotes();
    }

    contentContainer.innerHTML = "";
    salesQuotes.forEach((salesQuote) => {
      const salesQuoteElement = document.createElement("div");
      salesQuoteElement.classList.add("salesQuote");

      // Hyperlink for Sales Lines
      const salesLinesLink = document.createElement("a");
      salesLinesLink.href = "#"; // Placeholder, actual href set later
      salesLinesLink.textContent = `Quote Number: ${salesQuote.no}`;
      salesLinesLink.addEventListener("click", () =>
        loadAndRenderSalesLines(salesQuote.no)
      );
      salesQuoteElement.appendChild(salesLinesLink);

      const salesQuoteInfo = `
        
        <h2>Quote Number: ${salesQuote.no}</h2>
        <p>Document Type: ${salesQuote.documentType}</p>
        <p>Document Date: ${salesQuote.documentDate}</p>
        <p>Due Date: ${salesQuote.dueDate}</p>
        <p>Posting Date: ${salesQuote.postingDate}</p>
        <p>Sell To Customer Number: ${salesQuote.sellToCustomerNo}</p>
        <p>Sell To Customer Name: ${salesQuote.sellToCustomerName}</p>
        <p>Sell To Contact: ${salesQuote.selltoContact}</p>
        <p>Amount: ${salesQuote.Amount}</p>
      `;
      salesQuoteElement.innerHTML = salesQuoteInfo;
      contentContainer.appendChild(salesQuoteElement);
    });
  } catch (error) {
    console.error("Error rendering salesQuotes data:", error);
    contentContainer.innerHTML = `<p>Error loading salesQuotes: ${error.message}</p>`;
  }
}

//prepare items data for rendering
let items = [];
async function loadItems() {
  let data = await fetch(itemsAPI);
  let dataJson = await data.json();
  items = dataJson.value;
}

async function renderItems() {
  try {
    if (items.length === 0) {
      await loadItems();
    }

    contentContainer.innerHTML = "";
    items.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("item");

      const itemInfo = `
          <h2>${item.description}</h2>
          <p>Item Number: ${item.no}</p>
          <p>Description: ${item.description}${
        item.description2 ? `, ${item.description2}` : ""
      }</p>
          <p>Unit Price: ${item.unitPrice}</p>
        `;
      itemElement.innerHTML = itemInfo;

      contentContainer.appendChild(itemElement);
    });
  } catch (error) {
    console.error("Error rendering items data:", error);
    contentContainer.innerHTML = `<p>Error loading items: ${error.message}</p>`;
  }
}

//prepare customers data for rendering
let customers = [];
async function loadCustomers() {
  let data = await fetch(customersAPI);
  let dataJson = await data.json();
  customers = dataJson.value;
}

async function renderCustomers() {
  try {
    if (customers.length === 0) {
      await loadCustomers();
    }

    contentContainer.innerHTML = "";
    customers.forEach((customer) => {
      const customerElement = document.createElement("div");
      customerElement.classList.add("customer");

      const customerInfo = `
        <h2>${customer.name}</h2>
        <p>Customer Number: ${customer.no}</p>
        <p>Address: ${customer.address}${
        customer.address2 ? `, ${customer.address2}` : ""
      }</p>
        <p>City: ${customer.city}, Postcode: ${customer.postCode}</p>
      `;
      customerElement.innerHTML = customerInfo;

      contentContainer.appendChild(customerElement);
    });
  } catch (error) {
    console.error("Error rendering customer data:", error);
    contentContainer.innerHTML = `<p>Error loading customers: ${error.message}</p>`;
  }
}

customerButton.addEventListener("click", renderCustomers);
itemsButton.addEventListener("click", renderItems);
salesQuotesButton.addEventListener("click", renderSalesQuotes);
