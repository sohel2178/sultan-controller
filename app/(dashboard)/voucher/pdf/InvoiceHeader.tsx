import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";

interface InvoiceHeaderProps {
  reference: string;
  date: string;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#444",
    height: 78,
    marginTop: 6,
    marginBottom: 22,
  },

  // Left Side
  left: {
    width: "55%",
    borderRightWidth: 1,
    borderRightColor: "#444",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  invoiceRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  invoiceBox: {
    backgroundColor: "#2E9E45",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
    paddingVertical: 8,
    paddingHorizontal: 22,
  },

  stripes: {
    marginLeft: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  black: {
    width: 8,
    height: 24,
    backgroundColor: "#1F1F1F",
    marginRight: 3,
    transform: "skewX(-20deg)",
  },

  green: {
    width: 6,
    height: 24,
    backgroundColor: "#2E9E45",
    marginRight: 3,
    transform: "skewX(-20deg)",
  },

  // Right Side
  right: {
    width: "45%",
    paddingHorizontal: 18,
    paddingVertical: 10,
  },

  title: {
    fontSize: 13,
    color: "#2E9E45",
    fontWeight: "bold",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    marginBottom: 5,
  },

  label: {
    width: 42,
    fontSize: 11,
  },

  colon: {
    width: 10,
    textAlign: "center",
    fontSize: 11,
  },

  value: {
    fontSize: 11,
  },
});

export default function InvoiceHeader({ reference, date }: InvoiceHeaderProps) {
  return (
    <View style={styles.container}>
      {/* Left */}
      <View style={styles.left}>
        <View style={styles.invoiceRow}>
          <Text style={styles.invoiceBox}>INVOICE</Text>

          <View style={styles.stripes}>
            <View style={styles.black} />
            <View style={styles.black} />
            <View style={styles.black} />

            <View style={styles.green} />
            <View style={styles.green} />
            <View style={styles.green} />
          </View>
        </View>
      </View>

      {/* Right */}
      <View style={styles.right}>
        <Text style={styles.title}>Reference & Submit Date</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Ref</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>{reference}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>{date}</Text>
        </View>
      </View>
    </View>
  );
}
