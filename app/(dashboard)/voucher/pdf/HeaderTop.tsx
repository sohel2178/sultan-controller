import { Image, StyleSheet, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 125,
    marginBottom: 8,
  },

  image: {
    width: "100%",
    height: "100%",
  },
});

export default function HeaderTop() {
  return (
    <View style={styles.container}>
      <Image src="/forbit-header.png" style={styles.image} />
    </View>
  );
}
