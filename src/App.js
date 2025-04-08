import React, { useState } from "react";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/InvoicePreview";
import "./App.css";

function App() {
  const [invoiceData, setInvoiceData] = useState(null);

  const handleFormSubmit = (data) => {
    setInvoiceData(data);
  };

  const generatePDF = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ invoiceData }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob(); // 👈 read it as blob
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "invoice.pdf";
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("There was a problem downloading the invoice.");
    }
  };

  return (
    <div className="App">
      <h1>Invoice Generator</h1>
      <InvoiceForm onFormSubmit={handleFormSubmit} />
      {invoiceData && (
        <div>
          <InvoicePreview data={invoiceData} generatePDF={generatePDF} />
        </div>
      )}
    </div>
  );
}

export default App;
