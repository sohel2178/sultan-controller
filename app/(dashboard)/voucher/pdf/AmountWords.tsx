import { StyleSheet, Text, View } from "@react-pdf/renderer";
import AmountIcon from "./AmountIcon";

interface Props {
  amount: string;
}

const GREEN = "#2E9E45";

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  iconContainer: {
    width: 52,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 2,
  },

  content: {
    flex: 1,
    marginLeft: 6,
  },

  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },

  amount: {
    fontSize: 12,
    fontWeight: "bold",
    color: GREEN,
    lineHeight: 1.4,
  },
});

export default function AmountWords({ amount }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <AmountIcon />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Amount in Words:</Text>

        <Text style={styles.amount}>{amount}</Text>
      </View>
    </View>
  );
}
