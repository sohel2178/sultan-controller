import { StyleSheet, Text, View } from "@react-pdf/renderer";

interface Props {
  name: string;
  designation: string;
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    width: 220,
  },

  thanks: {
    fontSize: 12,
    marginBottom: 40,
  },

  line: {
    width: 160,
    borderTopWidth: 2,
    borderTopColor: "#2E9E45",
    marginBottom: 8,
  },

  name: {
    color: "#2E9E45",
    fontWeight: "bold",
    fontSize: 14,
  },

  designation: {
    marginTop: 3,
    fontSize: 12,
  },

  company: {
    marginTop: 4,
    fontSize: 13,
    color: "#2E9E45",
    fontWeight: "bold",
  },
});

export default function Signature({ name, designation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.thanks}>Thanking You,</Text>

      <View style={styles.line} />

      <Text style={styles.name}>{name}</Text>

      <Text style={styles.designation}>{designation}</Text>

      <Text style={styles.company}>Forbit Limited</Text>
    </View>
  );
}
