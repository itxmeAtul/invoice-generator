// pages/api/generate-pdf.ts

import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";
import fs from "fs";
import handlebars from "handlebars";
import path from "path";
import Chromium from "chrome-aws-lambda";

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

    let tempListOfItems: any = [];
    let array =
      params.listOfItems && params.listOfItems.length > 0
        ? params.listOfItems
        : [];

    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      tempListOfItems.push({ ...element, srno: index + 1 });
    }

    console.log(tempListOfItems, "tempListOfItems");
    let tempInvoiceData = {
      recName: params.recName,
      recAdd: params.recAdd,
      invNo: params.invNo,
      invDate: params.invDate,
      remark: params.remark,
      listOfItems: tempListOfItems,
      grandTotal: 100,
    };

    const htmlContent = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${params.recName || ""} Bill Invoice</title>
        <style>
          /* Reset some default styles to ensure consistent printing */
          body {
            margin: 0;
            padding: 0;
          }
    
          /* Define A4 paper size (210mm x 297mm) and set margins */
          @page {
            size: A4;
            margin: 10mm;
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
            font-size: 14px;
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
            margin-bottom: 4px;
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
            margin-bottom: 1.4rem;
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
            font-size: 14px;
          }
          .remark {
            border: 2px solid;
            display: flex;
            margin-top: 1.4rem;
            margin-bottom: 1.4rem;
          }
    
          .bank-details {
            font-weight: 600;
          }
    
          .bank-details-section span {
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <!-- First Page -->
        <div class="page">
          <div class="header">
            <div class="compname">${compData.compName || ""}</div>
            <div class="compaddress">
            ${compData.add1 || ""}
            </div>
            <div class="compaddress">${compData.add2 || ""} - ${
      compData.pincode || ""
    }</div>
            <div class="contact">Mobile: ${compData.mobile || ""}</div>
    
            <div class="">${compData.billType || ""}</div>
          </div>
          <div class="content">
            <div class="reciepnt-info">
              <div class="reciepnt-info-section">
                <div>Name : ${params.recName || ""}</div>
                <div>Address : ${params.recAdd || ""}</div>
              </div>
              <div class="reciepnt-info-section">
                <div>Date : ${params.invDate || ""}</div>
                <div>Invoice No : ${params.invNo || ""}</div>
              </div>
            </div>
            <div class="reciepnt-content">
              <table>
                <tr>
                  <th style="width: 15%">Sr No</th>
                  <th style="width: 40%">Particular</th>
                  <th style="width: 15%">Quantity/Size</th>
                  <th style="width: 15%">Rate</th>
                  <th style="width: 15%">Amount</th>
                </tr>
              
                ${
                  params.listOfItems && params.listOfItems.length > 0
                    ? params?.listOfItems?.map((cc: any, i: number) => {
                        console.log(cc, "cc");
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{cc.desc || ""}</td>
                            <td>{cc.qty || ""}</td>
                            <td>{cc.rate || ""}</td>
                            <td>{cc.amt}</td>{" "}
                          </tr>
                        );
                      })
                    : ""
                }
                
                <tr>
                  <td colspan="4" style="font-weight: 600">Grand Total</td>    
                  <td>${params.grandTotal}</td>
                </tr>
              </table>
            </div>
            <div class="remark">
              <div
                class=""
                style="font-weight: 600; padding: 3px 5px; border-right: 2px solid"
              >
                Remarks :
              </div>
              <div style="display: flex; align-items: center; padding: 0px 8px">
                ${params.remark}
              </div>
            </div>
            <div>
              <div class="bank-details">Bank Details</div>
              <div class="bank-details-section">
                <div><span>Account No.</span> ${compData.accNo}</div>
                <div><span>IFSC Code.</span> ${compData.ifsc}</div>
                <div><span>Account Holder Name.</span> ${
                  compData.accountName
                }</div>
                <div><span>Bank Account Name.</span> ${compData.bankName}</div>
    
                <div style="margin-top: 6px;">
                  <span>Note:.</span> ${compData.extraNote}
                </div>
              </div>
            </div>
          </div>
          <div class="footer">Page 1 of 1</div>
        </div>
      </body>
    </html>
    `;

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      // executablePath: "google-chrome-stable",
      executablePath: await Chromium.executablePath,
      headless: true,
    });
    const page = await browser.newPage();

    // Read the Handlebars template file
    const templatePath = path.join(process.cwd(), "template.hbs");
    const templateContent = fs.readFileSync(templatePath, "utf8");

    // Compile the Handlebars template
    const compiledTemplate = handlebars.compile(templateContent);

    const data = {
      compData: compData,
      invoiceData: tempInvoiceData,
    };

    // Set the content to be converted to PDF
    const html = compiledTemplate(data);

    await page.setContent(html);

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
