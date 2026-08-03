import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
  family: "Poppins",
  fonts: [
    {
      src: "/fonts/Poppins-Regular.ttf",
    },
    {
      src: "/fonts/Poppins-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

export const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingHorizontal: 30,
    paddingBottom: 90, // Reserve space for footer
    backgroundColor: "#FFFFFF",
    position: "relative",
    fontSize: 11,
  },
});
