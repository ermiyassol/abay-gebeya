//CSV File - text/csv', '__.csv'
//EXCEL File - 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, '__.xlsx'
"use client";
import * as xlsx from "xlsx";

export const downloadFile = (data: any, type: string, fileName: string) => {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const convertJsonToCsv = (data: any) => {
  const workbook = xlsx.utils.book_new();
  const sheet = xlsx.utils.json_to_sheet(data);
  xlsx.utils.book_append_sheet(workbook, sheet, "Sheet 1");
  const csvData = xlsx.utils.sheet_to_csv(sheet);
  return csvData;
};
