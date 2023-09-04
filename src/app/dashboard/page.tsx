"use client";
import React from "react";

export default function Page() {
  const [pdfLink, setPdfLink] = React.useState<any>();
  const generatePDF = async () => {
    try {
      const response = await fetch("/api/example", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ params: { compName: "Red CLip event" } }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdfLink(url);
        console.log(url, "da");
      } else {
        console.error("PDF generation failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <h1>Hello, Next.js! Dashboard</h1>
        <button
          onClick={() => {
            generatePDF();
          }}
        >
          {" "}
          click me
        </button>

        {pdfLink && (
          <div>
            <p>Click below to download the generated PDF:</p>
            <a href={pdfLink} download="generated-pdf.pdf">
              Download PDF
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
