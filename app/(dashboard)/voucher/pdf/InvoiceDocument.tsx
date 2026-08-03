import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import Header from "./Header";
import Footer from "./Footer";
import InvoiceTable from "./InvoiceTable";
import Summary from "./Summary";
import AmountWords from "./AmountWords";
import Signature from "./Signature";

import { InvoiceData } from "@/types/invoice";
import { numberToWords } from "@/lib/numberToWords";
import HeaderTop from "./HeaderTop";
import InvoiceHeader from "./InvoiceHeader";

interface Props {
  data: InvoiceData;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    position: "relative",
  },

  content: {
    paddingHorizontal: 24,
  },

  subjectContainer: {
    marginTop: 18,
    marginBottom: 15,
  },

  subject: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    textDecoration: "underline",
  },

  note: {
    marginTop: 18,
    fontSize: 10,
    lineHeight: 1.5,
  },
});

export default function InvoiceDocument({ data }: Props) {
  // -----------------------------
  // Calculations
  // -----------------------------

  const subtotal = data.items.reduce(
    (sum, item) => sum + item.unitCost * item.quantity,
    0,
  );

  const vat = (subtotal * data.vatPercent) / 100;

  const grandTotal = subtotal + vat + data.technicalCharge;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}

        {/* <Header reference={data.reference} date={data.date} /> */}

        <HeaderTop />

        <View style={styles.content}>
          <InvoiceHeader reference={data.reference} date={data.date} />

          {/* Subject */}

          <View style={styles.subjectContainer}>
            <Text style={styles.subject}>{data.subject}</Text>
          </View>

          {/* Items */}

          <InvoiceTable items={data.items} />

          {/* Summary */}

          <Summary
            items={data.items}
            vatPercent={data.vatPercent}
            technicalCharge={data.technicalCharge}
          />

          {/* Amount In Words */}

          <AmountWords amount={`${numberToWords(grandTotal)} Taka Only`} />

          {/* Optional Note */}

          <Text style={styles.note}>
            Kindly make the payment within the stipulated period. Thank you for
            choosing Forbit Limited.
          </Text>

          {/* Signature */}

          <Signature
            name={data.signer.name}
            designation={data.signer.designation}
          />
        </View>

        {/* Footer */}

        <Footer />
      </Page>
    </Document>
  );
}
