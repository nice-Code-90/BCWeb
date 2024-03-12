const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.static("frontend"));

// BC tenant and Customers data
const userName = "[REPLACE WITH YOUR USERNAME]";
const companyName = "[REPLACE WITH YOUR COMPANY NAME]";
const environment = "[REPLACE WITH YOUR ENVIRONMENT NAME]";
const clientId = "[REPLACE WITH YOUR CLIENT ID]";
const clientSecret = "[REPLACE WITH YOUR CLIENTSECRET]";
const scope = "https://api.businesscentral.dynamics.com/.default";
const tenantID = "[REPLACE WITH YOUR TENANT ID]";
const companyID = "[REPLACE WITH YOUR COMPANY ID]";
const tokenUrl = `https://login.microsoftonline.com/${tenantID}/oauth2/v2.0/token`;

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
      `https://api.businesscentral.dynamics.com/v2.0/${tenantID}/SandBox/api/${companyName}/${userName}/v1.0/companies(${companyID})/salesLines?$filter=documentType eq 'Quote'`,
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
      `https://api.businesscentral.dynamics.com/v2.0/${tenantID}/SandBox/api/${companyName}/${userName}/v1.0/companies(${companyID})/salesHeaders?$filter=documentType eq 'Quote'`,
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
    const response = await axios.get(
      `https://api.businesscentral.dynamics.com/v2.0/${tenantID}/${environment}/api/${companyName}/${userName}/v1.0/companies(${companyID})/items`,
      {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      }
    );

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
    const response = await axios.get(
      `https://api.businesscentral.dynamics.com/v2.0/${tenantID}/${environment}/api/${companyName}/${userName}/v1.0/companies(${companyID})/customers`,
      {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      }
    );

    const customers = response.data;
    console.log("Ügyfelek:", customers);
    return customers;
  } catch (error) {
    console.error("An error occurred when retrieving customers:", error);
    throw error;
  }
}

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

// Start
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
