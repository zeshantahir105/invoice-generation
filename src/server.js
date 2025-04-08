const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const { generateInvoiceHTML } = require("./utils/helpers");

const app = express();

app.use(cors()); // Enable CORS

app.use(express.json());

app.post("/api/generate-pdf", async (req, res) => {
  const { invoiceData } = req.body;

  // Validate invoiceData
  if (!invoiceData) {
    return res.status(400).json({ error: "invoiceData is required" });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const html = generateInvoiceHTML(invoiceData);

    if (!html) {
      return res.status(400).json({ error: "template is not set" });
    }

    await page.setContent(html);

    await page.evaluate(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    );

    const pdf = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=invoice.pdf");
    res.end(pdf);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
});

app.listen(3002, () => {
  console.log("Server running on http://localhost:3002");
});
