//pointers to html buttons
const customersButton = document.querySelector(".js-customers-button");
const itemsButton = document.querySelector(".js-items-button");
const salesQuotesButton = document.querySelector(".js-salesQuotes-button");

const salesLinesButton = document.querySelector(".js-sales-Lines-button");

//pointers to html body areas
const contentContainer = document.querySelector(".contentContainer");

//Connection datas
const serverHost = window.location.hostname;
const serverPort = window.location.port;
const customersAPI = `http://${serverHost}:${serverPort}/api/customers`;
const itemsAPI = `http://${serverHost}:${serverPort}/api/items`;
const salesQuotesAPI = `http://${serverHost}:${serverPort}/api/salesQuotes`;
const salesLinesAPI = `http://${serverHost}:${serverPort}/api/salesLines`;

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

//prepare sales Quotes data for rendering
let salesQuotes = [];
async function loadSalesQuotes() {
  let data = await fetch(salesQuotesAPI);
  let dataJson = await data.json();
  salesQuotes = dataJson.value;
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

      let salesQuoteInfo = "";

      salesQuoteInfo += `<h2>Document No: ${salesQuote.no}</h2>`;
      salesQuoteInfo += `<p>Document Date: ${salesQuote.documentDate}</p>`;
      salesQuoteInfo += `<p>Due Date: ${salesQuote.dueDate}</p>`;
      salesQuoteInfo += `<p>Posting Date: ${salesQuote.postingDate}</p>`;
      salesQuoteInfo += `<p>Sell To Customer Number: ${salesQuote.sellToCustomerNo}</p>`;
      salesQuoteInfo += `<p>Sell To Customer Name: ${salesQuote.sellToCustomerName}</p>`;
      salesQuoteInfo += `<p>Sell To Contact: ${salesQuote.selltoContact}</p>`;
      salesQuoteInfo += `<p>Amount: ${salesQuote.Amount}</p>`;

      let salesLinesButton = document.createElement("button");
      salesLinesButton.classList.add("js-sales-Lines-button");
      salesLinesButton.textContent = "More Info";

      salesLinesButton.addEventListener("click", async () => {
        await renderSalesLines();
      });
      salesQuoteElement.appendChild(salesLinesButton);
      salesQuoteElement.innerHTML += salesQuoteInfo;
      contentContainer.appendChild(salesQuoteElement);

      // A salesLinesButton-hoz tartozó eseménykezelő
      salesLinesButton = salesQuoteElement.querySelector(
        ".js-sales-Lines-button"
      );
      salesLinesButton.addEventListener("click", async () => {
        await renderSalesLines(salesQuote.no);
      });
    });
  } catch (error) {
    // Csatoljuk a többi információt
    console.error("Error rendering salesQuotes data:", error);
    contentContainer.innerHTML = `<p>Error loading salesQuotes: ${error.message}</p>`;
  }
}
// prepare Sales Lines data for rendering
let salesLines = [];
async function loadSalesLines() {
  try {
    let data = await fetch(salesLinesAPI);
    let dataJson = await data.json();
    salesLines = dataJson.value;
  } catch (error) {
    console.error("Error loading salesLines:", error);
    contentContainer.innerHTML = `<p>Error loading salesLines: ${error.message}</p>`;
  }
}

async function renderSalesLines(salesQuoteNo) {
  try {
    if (salesLines.length === 0) {
      await loadSalesLines();
    }
    contentContainer.innerHTML = "";
    salesLines.forEach((salesLine) => {
      if (salesLine.documentNo === salesQuoteNo) {
        const salesLineElement = document.createElement("div");
        salesLineElement.classList.add("salesLine");

        // Additional information for Sales Lines
        const salesLineInfo = `
        <h2>Description: ${salesLine.description} </h2>
        <p>Document No: ${salesLine.documentNo} </p>
        <p>Line No: ${salesLine.lineNo} </p>
        <p>quantity: ${salesLine.quantity} </p>
        <p>type: ${salesLine.type} </p>
        <p>unit price: ${salesLine.unitPrice}</p>
      `;
        salesLineElement.innerHTML = salesLineInfo;

        contentContainer.appendChild(salesLineElement);
      }
    });
  } catch (error) {
    console.error("Error rendering sales lines data:", error);
    contentContainer.innerHTML = `<p>Error loading sales lines: ${error.message}</p>`;
  }
}
customersButton.addEventListener("click", renderCustomers);
itemsButton.addEventListener("click", renderItems);
salesQuotesButton.addEventListener("click", renderSalesQuotes);
