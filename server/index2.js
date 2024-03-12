const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.static("frontend"));

// BC tenant and Customers data
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

//FUNCTIONS FOR RETRIEVE DATAS

//Get items
async function getItems() {
  try {
    const response = await axios.get(
      `https://api.businesscentral.dynamics.com/v2.0/${tenantID}/SandBox/api/dynixSoftwareKft/training/v1.0/companies(${companyID})/items`,
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
      `https://api.businesscentral.dynamics.com/v2.0/${tenantID}/SandBox/api/dynixSoftwareKft/training/v1.0/companies(${companyID})/customers`,
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
