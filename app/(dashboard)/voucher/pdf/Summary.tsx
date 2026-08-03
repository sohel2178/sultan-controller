import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { InvoiceItem } from "@/types/invoice";

interface Props {
  items: InvoiceItem[];
  vatPercent: number;
  technicalCharge: number;
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    marginTop: 15,
    marginLeft: "auto",
    borderWidth: 1,
    borderColor: "#333",
  },

  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#333",
  },

  label: {
    flex: 1,
    padding: 7,
    fontSize: 10,
  },

  value: {
    width: 90,
    padding: 7,
    textAlign: "right",
    fontSize: 10,
    borderLeftWidth: 1,
    borderColor: "#333",
  },

  totalRow: {
    flexDirection: "row",
    backgroundColor: "#1f8d3b",
    color: "#fff",
    fontWeight: "bold",
  },
});

export default function Summary({ items, vatPercent, technicalCharge }: Props) {
  const subtotal = items.reduce((sum, i) => sum + i.unitCost * i.quantity, 0);

  const vat = (subtotal * vatPercent) / 100;

  const grand = subtotal + vat + technicalCharge;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>{subtotal.toLocaleString()}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>VAT ({vatPercent}%)</Text>
        <Text style={styles.value}>{vat.toLocaleString()}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Technical Charge</Text>
        <Text style={styles.value}>{technicalCharge.toLocaleString()}</Text>
      </View>

      <View style={styles.totalRow}>
        <Text style={styles.label}>Grand Total</Text>
        <Text style={styles.value}>{grand.toLocaleString()}</Text>
      </View>
    </View>
  );
}
