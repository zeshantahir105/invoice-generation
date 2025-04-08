import React, { useState } from "react";

const InvoiceForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    clientName: "",
    clientAddress: "",
    itemDescription: "",
    quantity: 1,
    price: 0,
    template: "detailed",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
          <label>Client Name:</label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
          <label>Client Address:</label>
          <input
            type="text"
            name="clientAddress"
            value={formData.clientAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
          <label>Item Description:</label>
          <input
            type="text"
            name="itemDescription"
            value={formData.itemDescription}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
          <label>Template:</label>
          <select
            name="template"
            value={formData.template}
            onChange={handleChange}
          >
            <option value="detailed">Detailed Invoice</option>
            <option value="summary">Summary Invoice</option>
          </select>
        </div>
      </div>
      <button type="submit">Generate Invoice</button>
    </form>
  );
};

export default InvoiceForm;
