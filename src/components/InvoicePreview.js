import React from "react";
import { generateInvoiceHTML } from "../utils/helpers";
const InvoicePreview = ({ data, generatePDF }) => {
  return (
    <div className="invoice-preview">
      <div dangerouslySetInnerHTML={{ __html: generateInvoiceHTML(data) }} />
      <button className="download-pdf" onClick={generatePDF}>
        Download PDF
      </button>
    </div>
  );
};

export default InvoicePreview;
