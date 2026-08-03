export interface InvoiceItem {
  registration: string;
  unitCost: number;
  quantity: number;
}

export interface InvoiceData {
  reference: string;
  date: string;
  subject: string;

  items: InvoiceItem[];

  vatPercent: number;
  technicalCharge: number;

  signer: {
    name: string;
    designation: string;
  };
}
