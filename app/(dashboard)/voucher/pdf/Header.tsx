import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";

interface HeaderProps {
  reference: string;
  date: string;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  logo: {
    width: "100%",
    height: 75,
    objectFit: "contain",
  },

  background: {
    width: "100%",
    height: 95,
    marginTop: 8,
    objectFit: "cover",
  },

  infoContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#444",
    marginTop: -2,
  },

  left: {
    flex: 1.2,
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRightWidth: 1,
    borderRightColor: "#444",
  },

  invoiceText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2f8f3d",
  },

  right: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },

  title: {
    fontSize: 13,
    color: "#2f8f3d",
    fontWeight: "bold",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    marginBottom: 4,
  },

  label: {
    width: 45,
    fontSize: 11,
  },

  colon: {
    width: 10,
    fontSize: 11,
  },

  value: {
    fontSize: 11,
  },
});

export default function Header({ reference, date }: HeaderProps) {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image src="/forbit-logo.png" style={styles.logo} />

      {/* Green/Black Artwork */}
      <Image src="/forbit-background.png" style={styles.background} />

      {/* Invoice Box */}
      <View style={styles.infoContainer}>
        <View style={styles.left}>
          <Text style={styles.invoiceText}>INVOICE</Text>
        </View>

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
    </View>
  );
}
