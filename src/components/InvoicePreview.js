import React, { useState } from "react";
import { generateInvoiceHTML } from "../utils/helpers";
const InvoicePreview = ({ data, generatePDF }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    await generatePDF();
    setIsDownloading(false);
  };

  return (
    <div className="invoice-preview">
      <div dangerouslySetInnerHTML={{ __html: generateInvoiceHTML(data) }} />
      <button className="download-pdf" onClick={handleDownload}>
        {isDownloading ? "Downloading..." : "Download PDF"}
      </button>
    </div>
  );
};

export default InvoicePreview;
