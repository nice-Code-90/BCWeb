const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
app.use(express.static("frontendStatic"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// BC tenant and Customers data : REPLACE ENV VARIABLES FROM YOUR BUSINESS CENTRAL ENVIRONMENT
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
const sellToContactsAPI = `https://api.businesscentral.dynamics.com/v2.0/${tenantID}/${environment}/api/${companyName}/${userName}/v1.0/companies(${companyID})/contacts`;
const resourcesAPI = `https://api.businesscentral.dynamics.com/v2.0/${tenantID}/${environment}/api/${companyName}/${userName}/v1.0/companies(${companyID})/resources`;

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

    return items;
  } catch (error) {
    console.error("An error occurred when retrieving items:", error);
    throw error;
  }
}
async function getSelltoContacts() {
  try {
    const response = await axios.get(`${sellToContactsAPI}`, {
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    });
    const sellToContacts = response.data;
    return sellToContacts;
  } catch (error) {
    console.error("An error occurred when tertieving sellToContacts:", error);
    throw error;
  }
}

async function getResources() {
  try {
    const response = await axios.get(`${resourcesAPI}`, {
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    });

    const resources = response.data;
    return resources;
  } catch (error) {
    console.error("An error occurred when retrieving resources:", error);
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
//Resources
app.get("/api/resources", async (req, res) => {
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
    const items = await getResources();
    res.json(items);
  } catch (error) {
    console.log("Error at requesting resources data:", error);
    res.status(500).send("Error fetching resources");
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

//sell to Contacts
app.get("/api/contacts", async (req, res) => {
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
    const contacts = await getSelltoContacts();
    res.json(contacts);
  } catch (error) {
    console.log("Error at requesting sell to Contacts data:", error);
    res.status(500).send("Error fetching sell to contacts");
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

//---------------------------------DELETE REQUESTS----------------------------------------//

//Delete certain Sales Line of SQuote
app.delete("/api/DeleteSalesLine", async (req, res) => {
  if (myToken === "") {
    try {
      myToken = await getToken();
    } catch (error) {
      console.log("Error:", error);
    }
  }
  await waitForToken();
  let noOfDeletingLine = req.body.lineNo;
  let docNo = req.body.docNo;

  try {
    const response = await axios.delete(
      `${salesLinesAPI}('Quote','${docNo}',${noOfDeletingLine})`,
      {
        headers: {
          Authorization: `Bearer ${myToken}`,
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );
    console.log("Sales Line deleted:", response.data);
    res.json({ message: "Sales Line deleted" });
  } catch (error) {
    console.log("Error during delete Sales Line:", error);
    res.status(500)("Error deleting Sales Line");
  }
});
//Delete Sales Quote
app.delete("/api/DeleteSalesQuote", async (req, res) => {
  if (myToken === "") {
    try {
      myToken = await getToken();
    } catch (error) {
      console.log("Error:", error);
    }
  }
  await waitForToken();
  let noOfDeletingQuote = req.body.quoteNo;

  try {
    const response = await axios.delete(
      `${salesHeadersAPI}('Quote','${noOfDeletingQuote}')`,
      {
        headers: {
          Authorization: `Bearer ${myToken}`,
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );
    console.log("Sales Quote deleted:", response.data);
    res.json({ message: "Sales Quote deleted" });
  } catch (error) {
    console.log("Error during delete Sales Quote:", error);
    res.status(500)("Error deleting Sales Quote");
  }
});

//-----------------------------------POST REQUESTS-----------------------------------------//

//Post Sales Quotes header

app.post("/api/PostSalesQuotes", async (req, res) => {
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

  let salesQuoteHeader = {
    documentType: "Quote",
    no: "",
    sellToCustomerNo: req.body.sellToCustomerNo,
    selltoContact: req.body.sellToContact,
    documentDate: req.body.documentDate,
    dueDate: req.body.dueDate,
  };

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
