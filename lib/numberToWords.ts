const ones = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const tens = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

function convertBelowHundred(num: number): string {
  if (num < 20) return ones[num];

  const ten = Math.floor(num / 10);
  const one = num % 10;

  return `${tens[ten]} ${ones[one]}`.trim();
}

function convertBelowThousand(num: number): string {
  let result = "";

  if (num >= 100) {
    result += `${ones[Math.floor(num / 100)]} Hundred`;

    if (num % 100 !== 0) {
      result += " ";
    }
  }

  result += convertBelowHundred(num % 100);

  return result.trim();
}

export function numberToWords(num: number): string {
  if (num === 0) return "Zero";

  if (!Number.isFinite(num)) {
    return "";
  }

  // Round to nearest integer
  num = Math.round(num);

  let result = "";

  const crore = Math.floor(num / 10000000);
  num %= 10000000;

  const lakh = Math.floor(num / 100000);
  num %= 100000;

  const thousand = Math.floor(num / 1000);
  num %= 1000;

  const hundred = num;

  if (crore) {
    result += `${convertBelowThousand(crore)} Crore `;
  }

  if (lakh) {
    result += `${convertBelowThousand(lakh)} Lakh `;
  }

  if (thousand) {
    result += `${convertBelowThousand(thousand)} Thousand `;
  }

  if (hundred) {
    result += convertBelowThousand(hundred);
  }

  return result.trim().replace(/\s+/g, " ");
}
