import { describe, it, expect } from "vitest";
import { waitFor } from "@testing-library/react";
import { Document, Page, Text, pdf, StyleSheet } from "@react-pdf/renderer";

const htmlToPdf = async () => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  const document = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text>Test</Text>
      </Page>
    </Document>
  );

  return await pdf(document).toBlob();
};

describe("HtmlToPdf", () => {
  it("should generate pdf", async () => {
    await waitFor(async () => {
      const blob = await htmlToPdf();
      console.log(blob);
      expect(blob).toBeDefined();
    });
  });
});