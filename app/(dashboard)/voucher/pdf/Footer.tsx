// import { Image, StyleSheet, View } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   container: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },

//   topBorder: {
//     height: 3,
//     backgroundColor: "#1E8E3E",
//   },

//   image: {
//     width: "100%",
//     height: 62,
//     objectFit: "contain",
//   },
// });

// export default function Footer() {
//   return (
//     <View fixed style={styles.container}>
//       <View style={styles.topBorder} />
//       <Image src="/forbit-footer.png" style={styles.image} />
//     </View>
//   );
// }

// import { Image, StyleSheet, View } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     height: 125,
//     marginBottom: 8,
//   },

//   image: {
//     width: "100%",
//     height: "100%",
//   },
// });

// export default function Footer() {
//   return (
//     <View style={styles.container}>
//       <Image src="/forbit-footer.png" style={styles.image} />
//     </View>
//   );
// }

import { Image, StyleSheet, View } from "@react-pdf/renderer";

const FOOTER_HEIGHT = 65;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
  },

  image: {
    width: "100%",
    height: "100%",
  },
});

export default function Footer() {
  return (
    <View fixed style={styles.container}>
      <Image src="/forbit-footer.png" style={styles.image} />
    </View>
  );
}
