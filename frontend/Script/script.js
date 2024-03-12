//pointers to html buttons
const customerButton = document.querySelector(".js-customers-button");
const itemsButton = document.querySelector("js-items-button");
const salesQuotesButton = document.querySelector("js-salesQuotes-button");

//pointers to html body areas
const customerContainer = document.querySelector(".customersContainer");

const customersAPI = "http://localhost:3000/api/customers";

let customers = [];
async function loadCustomers() {
  let data = await fetch(customersAPI);
  let dataJson = await data.json();
  customers = dataJson.value;
}

function renderCustomers() {
  if (customers.length === 0) {
    loadCustomers()
      .then(() => {
        customerContainer.innerHTML = "";
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

          customerContainer.appendChild(customerElement);
        });
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
        const customerContainer = document.querySelector(".customersContainer");
        customerContainer.innerHTML = `<p>Error loading customers: ${error.message}</p>`;
      });
  } else {
    customerContainer.innerHTML = ""; // Clear previous content
  }
}

customerButton.addEventListener("click", renderCustomers);
