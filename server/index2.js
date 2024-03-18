const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.static("frontend"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// BC tenant and Customers data
//REPLACE THESE DATAS WITH YOUR OWN BC ENVIRONMENT VARIABLES
const userName = "";
const companyName = "";
const environment = "";
const clientId = "";
const clientSecret = "";
const scope = "https://api.businesscentral.dynamics.com/.default";
const tenantID = "";
const companyID = "";
const tokenUrl = `https://login.microsoftonline.com/${tenantID}/oauth2/v2.0/token`;

// API endpoints for BC datas
const customersAPI = `https://api.businesscentral.dynamics.com/v2.0/${tenantID}/${environment}/api/${companyName}/${userName}/v1.0/companies(${companyID})/customers`;
const salesLinesAPI = `https://api.businesscentral.dynamics.com/v2.0/${tenantID}/SandBox/api/${companyName}/${userName}/v1.0/companies(${companyID})/salesLines`;
const salesHeadersAPI = `https://api.businesscentral.dynamics.com/v2.0/${tenantID}/SandBox/api/${companyName}/${userName}/v1.0/companies(${companyID})/salesHeaders`;
const itemsAPI = `https://api.businesscentral.dynamics.com/v2.0/${tenantID}/${environment}/api/${companyName}/${userName}/v1.0/companies(${companyID})/items`;

// Acces token
async function getToken() {
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
    scope: scope,
  });

  const response = await axios.post(tokenUrl, body.toString(), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data.access_token;
}

let myToken = "";

async function waitForToken() {
  while (myToken === "") {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // function for first API calls: waiting for token
  }
}

//FUNCTIONS FOR RETRIEVE DATAS

//Get Sales Lines
async function getSalesLines() {
  try {
    const response = await axios.get(
      `${salesLinesAPI}?$filter=documentType eq 'Quote'`,
      {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      }
    );

    const salesLines = response.data;
    console.log("Sales Lines:", salesLines);

    return salesLines;
  } catch (error) {
    console.error("An error occurred when retrieving Sales Lines:", error);
    throw error;
  }
}

//Get Sales Quotes
async function getSalesQuotes() {
  try {
    const response = await axios.get(
      `${salesHeadersAPI}?$filter=documentType eq 'Quote'`,
      {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      }
    );

    const salesQuotes = response.data;
    console.log("Sales Quotes:", salesQuotes);

    return salesQuotes;
  } catch (error) {
    console.error("An error occurred when retrieving Sales Quotes:", error);
    throw error;
  }
}

//Get items
async function getItems() {
  try {
    const response = await axios.get(`${itemsAPI}`, {
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    });

    const items = response.data;
    console.log("Items:", items);

    return items;
  } catch (error) {
    console.error("An error occurred when retrieving items:", error);
    throw error;
  }
}

//Get customers
async function getCustomers() {
  try {
    const response = await axios.get(`${customersAPI}`, {
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    });

    const customers = response.data;
    console.log("Ügyfelek:", customers);
    return customers;
  } catch (error) {
    console.error("An error occurred when retrieving customers:", error);
    throw error;
  }
}

//Post Sales Quotes Headers

//ENDPOINTS

//Sales Lines
app.get("/api/salesLines", async (req, res) => {
  if (myToken === "") {
    (async () => {
      try {
        myToken = await getToken();
        console.log("token:", myToken);
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  }
  await waitForToken();

  try {
    const salesLines = await getSalesLines();
    res.json(salesLines);
  } catch (error) {
    console.log("Error at requesting Sales Lines data:", error);
    res.status(500).send("Error fetching sales lines");
  }
});

//Sales Quotes
app.get("/api/salesQuotes", async (req, res) => {
  if (myToken === "") {
    (async () => {
      try {
        myToken = await getToken();
        console.log("token:", myToken);
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  }
  await waitForToken();

  try {
    const salesQuotes = await getSalesQuotes();
    res.json(salesQuotes);
  } catch (error) {
    console.log("Error at requesting Sales Quotes data:", error);
    res.status(500).send("Error fetching sales quotes");
  }
});

//Items
app.get("/api/items", async (req, res) => {
  if (myToken === "") {
    (async () => {
      try {
        myToken = await getToken();
        console.log("token:", myToken);
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  }
  await waitForToken();

  try {
    const items = await getItems();
    res.json(items);
  } catch (error) {
    console.log("Error at requesting items data:", error);
    res.status(500).send("Error fetching items");
  }
});

//Customers
app.get("/api/customers", async (req, res) => {
  if (myToken === "") {
    (async () => {
      try {
        myToken = await getToken();
        console.log("token:", myToken);
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  }
  await waitForToken();

  try {
    const customers = await getCustomers();
    res.json(customers);
  } catch (error) {
    console.log("Error at requesting customers data:", error);
    res.status(500).send("Error fetching customers");
  }
});

//-----------------------------------POST REQUESTS-----------------------------------------//

//Post Sales Quotes header

app.post("/api/PostSalesQuotes", async (req, res) => {
  if (myToken === "") {
    (async () => {
      try {
        myToken = await getToken();
        console.log("Token:", myToken);
      } catch (error) {
        console.log("Error:", error);
      }
    })();
  }
  await waitForToken();

  let salesQuoteHeader = {
    documentType: "Quote",
    no: "",
    sellToCustomerNo: req.body.sellToCustomerNo,
    selltoContact: req.body.sellToContact,
    documentDate: req.body.documentDate,
    dueDate: req.body.dueDate,
  };
  console.log(salesQuoteHeader);

  try {
    const response = await axios.post(salesHeadersAPI, salesQuoteHeader, {
      headers: {
        Authorization: `Bearer ${myToken}`,
        "Content-Type": "application/json",
        Accept: "*/*",
        Connection: "keep-alive",
        "Accept-Encoding": "gzip, deflate, br",
      },
    });

    console.log("Sales Quote created:", response.data);
    res.json({ message: "Sales Quote created succesfully!" });
  } catch (error) {
    console.error("Error creating Sales Quote:", error);
    res.status(500).send("Error creating Sales Quote");
  }
});

//Post Sales Quote Line
app.post("/api/PostSalesLines", async (req, res) => {
  if (myToken === "") {
    (async () => {
      try {
        myToken = await getToken();
      } catch (error) {
        console.log("Error:", error);
      }
    })();
  }
  await waitForToken();
  let salesQuoteLine = {
    documentType: "Quote",
    documentNo: req.body.documentNo,
    type: req.body.type,
    no: req.body.no,
    description: req.body.description,
    quantity: parseInt(req.body.quantity, 10),
    unitPrice: parseInt(req.body.unitPrice, 10),
  };
  console.log(salesQuoteLine);

  try {
    const response = await axios.post(salesLinesAPI, salesQuoteLine, {
      headers: {
        Authorization: `Bearer ${myToken}`,
        "Content-Type": "application/json",
        Accept: "*/*",
        Connection: "keep-alive",
        "Accept-Encoding": "gzip, deflate, br",
      },
    });

    console.log("Sales Line created:", response.data);
    res.json({ message: "Sales Line Created Succesfully!" });
  } catch (error) {
    console.error("Error creating sales Line:", error);
    res.status(500).send("Error creating Sales Quote");
  }
});

// Start
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
