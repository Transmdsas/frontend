import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Svg,
  Image,
  G,
} from "@react-pdf/renderer";
import logo from "../../../assets/logo.svg";
import { Holder } from "../../../store/holders/types";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    paddingTop: 30,
    paddingBottom: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  logo: {
    width: 200,
    height: 50,
    marginBottom: 20,
  },
});

// Create Document Component
export const HolderPDFView = ({ holderData }: any) => {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.section}>
          <Image src={logo} style={styles.logo}/>
          <Text>LGOO</Text>
        </View>
        <View style={styles.section}>
          <Text>ya deberia tener logo</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
};
