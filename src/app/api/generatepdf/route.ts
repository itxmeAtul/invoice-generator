import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import fs from "fs";
import handlebars from "handlebars";
import path from "path";
import { headers } from "next/headers";
import { NextApiResponse } from "next";
const IS_PRODUCTION = process.env.NODE_ENV === "production";

export const GET = async () => {
  try {
    return new Response("Hello word", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to fetch all prompts", { status: 500 });
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const getBrowser = () =>
      IS_PRODUCTION
        ? // Connect to browserless so we don't run Chrome on the same hardware in production
          puppeteer.connect({
            browserWSEndpoint:
              "wss://chrome.browserless.io?token=c0c24fcd-0b57-4fa4-a1f8-bd9da19e64dd",
          })
        : // Run the browser locally while in development
          puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
          });

    const { params } = await req.json();

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

    if (tempListOfItems.length <= 10) {
      for (let index = array.length - 1; index <= 10; index++) {
        tempListOfItems.push({});
      }
    }

    let tempInvoiceData = {
      recName: params.recName,
      recAdd: params.recAdd,
      invNo: params.invNo,
      invDate: params.invDate,
      remark: params.remark,
      listOfItems: tempListOfItems,
      grandTotal: params.grandTotal,
    };

    const browser = await getBrowser();

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
    const pdfBuffer: any = await page.pdf({ format: "A4" });

    // Close the browser
    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="generated.pdf"',
      },
    });
    // res.send();
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "PDF generation failed" },
      { status: 500 }
    );
  }
};
