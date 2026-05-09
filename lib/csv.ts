"use client";

import Papa from "papaparse";

const normalizeNumber = (num: string) => {
  let clean = num.replace(/\D/g, ""); // remove spaces, symbols

  // remove country code if exists
  clean = clean.replace(/^(\+?88)/, "");

  console.log("Cleaned number:", clean, clean.length);

  // 👇 if 10 digit → add leading 0
  if (clean.length === 10) {
    clean = "0" + clean;
  }

  return clean;
};

export function parseCSV(file: File): Promise<any[]> {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const formatted = results.data.map((row: any) => ({
          mobile_number: normalizeNumber(row.mobile_number),
          number_of_vehicle: Number(row.number_of_vehicle),
          amount: Number(row.amount),
        }));
        resolve(formatted);
      },
    });
  });
}
