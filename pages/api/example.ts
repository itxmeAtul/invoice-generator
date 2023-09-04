// pages/api/generate-pdf.ts

import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { params } = req.body;
    let compData = {
      compName: "REDCLIP EVENT AND ENTERTAINMENT",
      add1: "Kasam Shaikh Chawl No. 33, V. L. Sawant Marg, Amboli, Bhardawadi, Andheri West",
      add2: "Mumbai",
      pincode: "400 058",
      mobile: "9892006037 / 9619990462",
      billType: "Bill Invoice",
      accNo: "6110110002915",
      ifsc: "BKID0000061",
      bankName: "Bank of India",
      accountName: "Mayur Maruti Patil",
      extraNote:
        "** Cheque should be issued in the name of Mr. Mayur Maruti Patil",
    };
    console.log(params, "cadad");

    const htmlContent = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>A4 Size Printable Paper</title>
    <style>
      /* Reset some default styles to ensure consistent printing */
      body {
        margin: 0;
        padding: 0;
      }

      /* Define A4 paper size (210mm x 297mm) and set margins */
      @page {
        size: A4;
        margin: 20mm 10mm;
      }

      /* Create a container div for the content */
      .page {
        width: 100%;
        max-width: 100%;
        padding: 20px;
        box-sizing: border-box;
        page-break-after: always; /* Ensure each section starts on a new page */
      }

      /* Header style */
      .header {
        text-align: center;
        font-size: 24px;
        margin-bottom: 20px;
      }

      /* Content style */
      .content {
        font-size: 16px;
        line-height: 1.5;
      }

      /* Footer style */
      .footer {
        text-align: center;
        font-size: 14px;
        margin-top: 20px;
      }
      .compname {
        color: red;
        text-decoration: underline;
        margin-bottom: 1rem;
      }

      .compaddress {
        font-size: 16px;
        font-weight: 600;
      }
      .contact {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 1rem;
      }
    </style>
  </head>
  <body>
    <!-- First Page -->
    <div class="page">
      <div class="header">
        <div class="compname">${compData?.compName}</div>
        <div class="compaddress">
          Kasam Shaikh Chawl No.33, V.L. Sawant Marg, Amboli, Bhardawadi,
          Andheri West,
        </div>
        <div class="compaddress">Mumbai - 400 058</div>
        <div class="contact">Mobile: 9892006037/ 9619990462</div>

        <div class="">Bill Invoice</div>
      </div>
      <div class="content">
        <p>
          This is the content of the first page. You can add your text, images,
          and other content here.
        </p>
      </div>
      <div class="footer">Page 1 of 1</div>
    </div>
  </body>
</html>
`;

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--headless"],
    });
    const page = await browser.newPage();

    // Set the content to be converted to PDF
    await page.setContent(htmlContent);

    // Generate the PDF
    const pdfBuffer = await page.pdf({ format: "A4" });

    // Close the browser
    await browser.close();

    // Send the PDF as a response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="generated-pdf.pdf"'
    );
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "PDF generation failed" });
  }
};
