const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.static('frontend'));

// BC tenant and user datas
const clientId = "clientID"; //CHANGE VARIABLE VALUE TO YOUR clientID
const clientSecret = "clientSecret"; // CHANGE VARIABLE TO YOUR clientSecret
const scope = "https://api.businesscentral.dynamics.com/.default";

const tokenUrl = `https://login.microsoftonline.com/tenantID[CHANGE IT TO YOUR OWN]/oauth2/v2.0/token`; // CHANGE TENANTID TO YOUR tenantId


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

// Get token 
let token='';
app.get("/api/token", async (req, res) => {
  try {
    token = await getToken();
    res.json({ access_token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve token" });
  }
});

// Start
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
