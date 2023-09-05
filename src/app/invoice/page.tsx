"use client";
import React from "react";
export interface itemsData {
  key: number;
  desc: string;
  qty: number;
  amt: number;
  isEdit: boolean;
}

export default function Page() {
  const [pdfLink, setPdfLink] = React.useState<any>();
  const [showError, setShowError] = React.useState(false);
  const [tableData, setTableData] = React.useState<Array<itemsData>>([]);
  const [formValues, setFormValues] = React.useState({
    recName: "",
    recAdd: "",
    invNo: "",
    invDate: "",
    remark: "",
  });
  const [totalCost, setTotalCost] = React.useState(0);
  const [refresh, setRefresh] = React.useState(false);

  function onAddItem(params: any) {
    let tempTableData: any = [...tableData];
    if (
      tempTableData.filter((xx: itemsData) => xx.isEdit === true).length > 0
    ) {
      setShowError(true);
    } else {
      tempTableData.push({
        key: Math.random() * 100,
        desc: "",
        qty: "",
        amt: "",
        isEdit: true,
      });
      setTableData(tempTableData);
    }
  }

  function deleteRecord(key: number) {
    setTableData([...tableData].filter((xx: itemsData) => xx.key !== key));
    setRefresh(!refresh);
  }

  function onEditSave(key: number) {
    let tempTableData: any = [...tableData];
    let index = tableData.findIndex((xx: itemsData) => xx.key === key);

    tempTableData[index].isEdit = false;
    setTableData(tempTableData);
    setRefresh(!refresh);
  }

  function onEditClick(key: number) {
    let tempTableData: any = [...tableData];
    let index = tableData.findIndex((xx: itemsData) => xx.key === key);

    tempTableData[index].isEdit = true;
    setTableData(tempTableData);
  }

  React.useEffect(() => {
    // console.log(data, "data");
    let temptotalCost = 0;
    temptotalCost = tableData.reduce(
      (acc, curr: any) => acc + parseFloat(curr.amt ? curr.amt : 0),
      0
    );

    setTotalCost(temptotalCost);
  }, [refresh]);

  async function handleSave() {
    setPdfLink(null);
    let finalData = {
      recName: formValues.recName,
      recAdd: formValues.recAdd,
      invNo: formValues.invNo,
      invDate: formValues.invDate,
      remark: formValues.remark,
      listOfItems: tableData,
      grandTotal: totalCost,
    };
    generatePDF(finalData);
    console.log(finalData, "finalData");
  }

  const generatePDF = async (invoicedata: any) => {
    try {
      const response = await fetch("/api/example", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ params: invoicedata }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        console.log("url", url);
        // const box = document.createElement("a");
        setPdfLink(url);
        // if (url) {
        //   box.href = url;
        //   // box.download = "generated-pdf.pdf";
        //   box.download = "generated.pdf";
        //   document.body.appendChild(box);
        //   box.click();
        // }
      } else {
        console.error("PDF generation failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const DeleteIcon = () => {
    return (
      <svg
        width="35px"
        height="35px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 20.75H7C6.27065 20.75 5.57118 20.4603 5.05546 19.9445C4.53973 19.4288 4.25 18.7293 4.25 18V6C4.25 5.27065 4.53973 4.57118 5.05546 4.05546C5.57118 3.53973 6.27065 3.25 7 3.25H14.5C14.6988 3.25018 14.8895 3.32931 15.03 3.47L19.53 8C19.6707 8.14052 19.7498 8.33115 19.75 8.53V18C19.75 18.7293 19.4603 19.4288 18.9445 19.9445C18.4288 20.4603 17.7293 20.75 17 20.75ZM7 4.75C6.66848 4.75 6.35054 4.8817 6.11612 5.11612C5.8817 5.35054 5.75 5.66848 5.75 6V18C5.75 18.3315 5.8817 18.6495 6.11612 18.8839C6.35054 19.1183 6.66848 19.25 7 19.25H17C17.3315 19.25 17.6495 19.1183 17.8839 18.8839C18.1183 18.6495 18.25 18.3315 18.25 18V8.81L14.19 4.75H7Z"
          fill="#000"
        />
        <path
          d="M16.75 20H15.25V13.75H8.75V20H7.25V13.5C7.25 13.1685 7.3817 12.8505 7.61612 12.6161C7.85054 12.3817 8.16848 12.25 8.5 12.25H15.5C15.8315 12.25 16.1495 12.3817 16.3839 12.6161C16.6183 12.8505 16.75 13.1685 16.75 13.5V20Z"
          fill="#000"
        />
        <path
          d="M12.47 8.75H8.53001C8.3606 8.74869 8.19311 8.71403 8.0371 8.64799C7.88109 8.58195 7.73962 8.48582 7.62076 8.36511C7.5019 8.24439 7.40798 8.10144 7.34437 7.94443C7.28075 7.78741 7.24869 7.61941 7.25001 7.45V4H8.75001V7.25H12.25V4H13.75V7.45C13.7513 7.61941 13.7193 7.78741 13.6557 7.94443C13.592 8.10144 13.4981 8.24439 13.3793 8.36511C13.2604 8.48582 13.1189 8.58195 12.9629 8.64799C12.8069 8.71403 12.6394 8.74869 12.47 8.75Z"
          fill="#000"
        />
      </svg>
    );
  };

  const GenerateIcon = () => {
    return (
      <div className="mr-2">
        <svg
          width="35px"
          height="35px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 12C20 7.58172 16.4183 4 12 4M12 20C14.5264 20 16.7792 18.8289 18.2454 17"
            stroke="#fff"
            strokeWidth="1.5"
            stroke-linecap="round"
          />
          <path
            d="M4 12H14M14 12L11 9M14 12L11 15"
            stroke="#fff"
            strokeWidth="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    );
  };

  return (
    <>
      {true && (
        <>
          <main className="flex min-h-screen p-4 flex-col items-center justify-between  sm:p-6 md:p-8 xs:p-4">
            <div className="w-full max-w-2xl p-4  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 md:mt-10">
              <div className="relative z-0 w-full mb-6 group flex justify-center">
                <div className="relative  overflow-hidden font-bold text-xl ">
                  Invoice Generator
                </div>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  value={formValues.recName}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={(e) =>
                    setFormValues({ ...formValues, recName: e.target.value })
                  }
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Reciepent Name
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={formValues.recAdd}
                  onChange={(e) =>
                    setFormValues({ ...formValues, recAdd: e.target.value })
                  }
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Reciepent Address
                </label>
              </div>

              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={formValues.invDate}
                    onChange={(e) =>
                      setFormValues({ ...formValues, invDate: e.target.value })
                    }
                  />
                  <label
                    htmlFor="floating_first_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Invoice Date
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={formValues.invNo}
                    onChange={(e) =>
                      setFormValues({ ...formValues, invNo: e.target.value })
                    }
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Invoice No.
                  </label>
                </div>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <input
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={formValues.remark}
                  onChange={(e) =>
                    setFormValues({ ...formValues, remark: e.target.value })
                  }
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Remark
                </label>
              </div>

              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-300 border dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" colSpan={9} className="px-6 py-3  ">
                        List of items
                      </th>
                      <th scope="col" className="px-6 py-3  ">
                        <p
                          data-modal-target="defaultModal"
                          data-modal-toggle="defaultModal"
                          onClick={onAddItem}
                          className="cursor-pointer text-blue-500"
                        >
                          Add Item
                        </p>
                        {/* <button
                    
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                  >
                    Toggle modal
                  </button> */}
                      </th>
                    </tr>
                    <tr className="border border-black-700">
                      <th scope="col" colSpan={1} className="px-6 py-3">
                        #
                      </th>
                      <th scope="col" colSpan={6} className="px-6 py-3">
                        Particular
                      </th>
                      <th scope="col" colSpan={1} className="px-6 py-3">
                        Quantity/Size
                      </th>
                      <th scope="col" colSpan={1} className="px-6 py-3">
                        Amount
                      </th>
                      <th scope="col" colSpan={1} className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.length > 0 ? (
                      tableData.map((ele: any, idx: number) => {
                        return (
                          <tr
                            key={idx}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          >
                            <td colSpan={1} className="px-6 py-4">
                              {idx + 1}
                            </td>
                            <td colSpan={6} className="px-6 py-4">
                              {ele.isEdit ? (
                                <input
                                  type="text"
                                  value={ele.desc}
                                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  onChange={(e) => {
                                    let tempTableData: any = [...tableData];
                                    let index = tableData.findIndex(
                                      (xx: any) => xx.key === ele.key
                                    );
                                    tempTableData[index].desc = e.target.value;
                                    setTableData(tempTableData);
                                  }}
                                />
                              ) : (
                                `${ele.desc}`
                              )}
                            </td>
                            <td colSpan={1} className="px-6 py-4">
                              {ele.isEdit ? (
                                <input
                                  type="number"
                                  value={ele.qty}
                                  // pattern="[0-9]{5}"
                                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  onChange={(e) => {
                                    let tempTableData: any = [...tableData];
                                    let index = tableData.findIndex(
                                      (xx: any) => xx.key === ele.key
                                    );

                                    tempTableData[index].qty = e.target.value;
                                    setTableData(tempTableData);
                                  }}
                                />
                              ) : (
                                `${ele.qty}`
                              )}
                            </td>
                            <td colSpan={1} className="px-6 py-4">
                              {ele.isEdit ? (
                                <input
                                  type="number"
                                  value={ele.amt}
                                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  onChange={(e) => {
                                    let tempTableData: any = [...tableData];
                                    let index = tableData.findIndex(
                                      (xx: any) => xx.key === ele.key
                                    );

                                    tempTableData[index].amt = e.target.value;
                                    setTableData(tempTableData);
                                  }}
                                />
                              ) : (
                                `${ele.amt}`
                              )}
                            </td>
                            <td colSpan={1} className="px-6 py-4 flex">
                              {!ele.isEdit ? (
                                <>
                                  <p
                                    className="mr-3 cursor-pointer"
                                    onClick={() => deleteRecord(ele.key)}
                                  >
                                    Delete
                                  </p>
                                  <p
                                    className="cursor-pointer"
                                    onClick={() => onEditClick(ele.key)}
                                  >
                                    Edit
                                  </p>
                                </>
                              ) : (
                                <p
                                  className="cursor-pointer"
                                  onClick={() => onEditSave(ele.key)}
                                >
                                  save
                                  {/* <svg
                                    className=""
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M14 3h2.997v5h-2.997v-5zm9 1v20h-22v-24h17.997l4.003 4zm-17 5h12v-7h-12v7zm14 4h-16v9h16v-9z" />
                                  </svg> */}
                                </p>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="bg-white border-b text-center dark:bg-gray-800 dark:border-gray-700">
                        <td colSpan={10} className="px-6 py-4">
                          Nothing to display
                        </td>
                      </tr>
                    )}
                    <tr>
                      <th scope="col" colSpan={8} className="px-6 py-3  ">
                        Grand Total
                      </th>
                      <th scope="col" colSpan={2} className="px-6 py-3  ">
                        {totalCost}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="relative z-0 w-full mt-6  text-center ">
                <button
                  type="submit"
                  onClick={handleSave}
                  className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <GenerateIcon />
                  Generate PDF
                </button>
              </div>
              {showError && (
                <div
                  className="flex  p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 inline w-5 h-5 mr-3 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">Error!</span> Save data before
                    adding new entry
                  </div>
                  <button
                    type="button"
                    className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                    data-dismiss-target="#alert-2"
                    aria-label="Close"
                    onClick={() => {
                      setShowError(false);
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              )}

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
        </>
      )}
    </>
  );
}
