import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { InvoiceItem } from "@/types/invoice";

interface Props {
  items: InvoiceItem[];
}

const styles = StyleSheet.create({
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#333",
    marginTop: 20,
  },

  header: {
    flexDirection: "row",
    backgroundColor: "#1f8d3b",
    color: "#fff",
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#333",
  },

  cell: {
    padding: 6,
    fontSize: 10,
    borderRightWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
  },

  sl: {
    width: "10%",
    textAlign: "center",
  },

  reg: {
    width: "40%",
  },

  cost: {
    width: "25%",
    textAlign: "right",
  },

  qty: {
    width: "10%",
    textAlign: "center",
  },

  total: {
    width: "15%",
    textAlign: "right",
    borderRightWidth: 0,
  },
});

export default function InvoiceTable({ items }: Props) {
  return (
    <View style={styles.table}>
      <View style={styles.header}>
        <Text style={[styles.cell, styles.sl]}>SL</Text>
        <Text style={[styles.cell, styles.reg]}>Vehicle Registration</Text>
        <Text style={[styles.cell, styles.cost]}>Unit Cost</Text>
        <Text style={[styles.cell, styles.qty]}>Qty</Text>
        <Text style={[styles.cell, styles.total]}>Total</Text>
      </View>

      {items.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={[styles.cell, styles.sl]}>{index + 1}</Text>

          <Text style={[styles.cell, styles.reg]}>{item.registration}</Text>

          <Text style={[styles.cell, styles.cost]}>
            {item.unitCost.toLocaleString()}
          </Text>

          <Text style={[styles.cell, styles.qty]}>{item.quantity}</Text>

          <Text style={[styles.cell, styles.total]}>
            {(item.unitCost * item.quantity).toLocaleString()}
          </Text>
        </View>
      ))}
    </View>
  );
}
