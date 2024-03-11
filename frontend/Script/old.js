// Token lekérés
let myToken = '';

fetch('http://localhost:3000')
  .then(data => data.json())
  .then(data => {
    myToken = data.access_token; // Itt mentjük el a választ a változóba
    console.log('A token:', myToken);
    // Itt kezeld a választ
  })
  .catch(error => {
    console.log('A kérés sikertelen', error);
  });


// API hívások
async function makeApiCall(url) {
  try {
    const token = await getToken();

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log('API Response:', data);
  } catch (error) {
    console.error('Error making API call:', error.message);
  }
}

// Példa API hívások
const customerApiUrl = `https://api.businesscentral.dynamics.com/v2.0/${tenantId}/SandBox/api/dynixSoftwareKft/training/v1.0/companies(cdc0674c-031c-ee11-8f6e-6045bd8d0635)/customers`;
const itemsApiUrl = `https://api.businesscentral.dynamics.com/v2.0/${tenantId}/SandBox/api/dynixSoftwareKft/training/v1.0/companies(cdc0674c-031c-ee11-8f6e-6045bd8d0635)/items`;
const salesHeadersApiUrl = `https://api.businesscentral.dynamics.com/v2.0/${tenantId}/SandBox/api/dynixSoftwareKft/training/v1.0/companies(cdc0674c-031c-ee11-8f6e-6045bd8d0635)/salesHeaders?$filter=documentType%20eq%20%27Quote%27`;
const salesLinesApiUrl = `https://api.businesscentral.dynamics.com/v2.0/${tenantId}/SandBox/api/dynixSoftwareKft/training/v1.0/companies(cdc0674c-031c-ee11-8f6e-6045bd8d0635)/salesLines?$filter=documentType%20eq%20%27Quote%27`;

makeApiCall(customerApiUrl);
makeApiCall(itemsApiUrl);
makeApiCall(salesHeadersApiUrl);
makeApiCall(salesLinesApiUrl);
