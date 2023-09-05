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
          .reciepnt-info {
            display: flex;
            justify-content: space-between;
          }
          .reciepnt-info-section {
            font-size: 16px;
            font-weight: 600;
          }
    
          table,
          td,
          th {
            border: 1px solid;
            text-align: center;
          }
    
          table {
            width: 100%;
            border-collapse: collapse;
          }
        </style>
      </head>
      <body>
        <!-- First Page -->
        <div class="page">
          <div class="header">
            <div class="compname"Atul and More</div>
            <div class="compaddress">
              Kasam Shaikh Chawl No.33, V.L. Sawant Marg, Amboli, Bhardawadi,
              Andheri West,
            </div>
            <div class="compaddress">Mumbai - 400 058</div>
            <div class="contact">Mobile: 9892006037/ 9619990462</div>
    
            <div class="">Bill Invoice</div>
          </div>
          <div class="content">
            <div class="reciepnt-info">
              <div class="reciepnt-info-section">
                <div>Name : Atul More</div>
                <div>Address : Amboli Andheri west</div>
              </div>
              <div class="reciepnt-info-section">
                <div>Date : 25-09-2013</div>
                <div>Invoice No : 250910</div>
              </div>
            </div>
            <div class="reciepnt-content">
              <table>
                <tr>
                  <th>Sr No</th>
                  <th>Particular</th>
                  <th>Quantity/Size</th>
                  <th>Rate</th>
                  <th>Amount</th>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Chairs</td>
                  <td>20</td>
                  <td>10</td>
                  <td>200</td>
                </tr>
              </table>
            </div>
            <div>remark</div>
            <div>bank details</div>
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
      'attachment; filename="generated.pdf"'
    );
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "PDF generation failed" });
  }
};
