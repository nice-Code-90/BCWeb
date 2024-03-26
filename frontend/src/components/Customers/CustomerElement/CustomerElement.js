function CustomerElement({ customer }) {
  return (
    <div className="customer">
      <h2>{customer.name}</h2>
      <p>Customer Number: {customer.no}</p>
      <p>
        Address: {customer.address}
        {customer.address2 ? `, ${customer.address2}` : ""}
      </p>
      <p>
        City: {customer.city}, Postcode: {customer.postCode}
      </p>
    </div>
  );
}

export default CustomerElement;
