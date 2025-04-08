const generateInvoiceHTML = (invoiceData) => {
  if (!invoiceData.template) {
    throw new Error("Template is required");
  }

  const {
    template,
    clientName,
    clientAddress,
    itemDescription,
    quantity,
    price,
  } = invoiceData;

  const items = [
    {
      itemDescription,
      quantity,
      price,
    },
  ];

  const styles = `
    <style>
      .invoice-template {
        font-family: Arial, sans-serif;
        color: #333;
        padding: 30px;
      }
      .section {
        margin-bottom: 15px;
      }
      .bold {
        font-weight: bold;
      }
      .items-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
        th {
          background-color: #f2f2f2 !important;
        }
      }
      .items-table th, .items-table td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      .items-table th {
        background-color: #f2f2f2 !important;
      }
      h1, h2, h3 {
        color: #0056b3;
        }
      .invoice-title {
        margin-top: 0px !important;
      }
    </style>
  `;

  switch (template) {
    case "detailed":
      // Detailed Invoice Template
      return `
        ${styles}
        <div id="invoice" class="invoice-template">
          <h1 class = "invoice-title" >Invoice Details</h1>
          <div class="section">
            <span class="bold">Client Name:</span>
            <span>${clientName}</span>
          </div>
          <div class="section">
            <span class="bold">Client Address:</span>
            <span>${clientAddress}</span>
          </div>
          <table class="items-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              ${items
                .map(
                  (item) => `
                    <tr>
                      <td>${item.itemDescription}</td>
                      <td>${item.quantity}</td>
                      <td>$${item.price}</td>
                      <td>$${item.price * item.quantity}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      `;
    case "summary":
      // Summary Invoice Template
      return `
        ${styles}
        <div id="invoice" class="invoice-template">
          <h1>Invoice Summary</h1>
          <p>${clientName} from ${clientAddress} has purchased ${
        items.length
      } item(s) for $${items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )}.</p>
          ${items
            .map(
              (item) => `
                <p><span class="bold">Description:</span> ${item.itemDescription}</p>
              `
            )
            .join("")}
        </div>
      `;
    default:
      return "";
  }
};

module.exports = { generateInvoiceHTML };
