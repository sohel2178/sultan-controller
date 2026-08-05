import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export async function exportCertificatePDF(
  element: HTMLElement,
  filename = "certificate.pdf",
) {
  const originalBoxShadow = element.style.boxShadow;

  try {
    element.style.boxShadow = "none";

    const dataUrl = await toPng(element, {
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: "#ffffff",
      skipFonts: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
      canvasWidth: element.scrollWidth * 3,
      canvasHeight: element.scrollHeight * 3,
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pageWidth = 210;
    const pageHeight = 297;

    // Actual DOM size
    const elementWidth = element.scrollWidth;
    const elementHeight = element.scrollHeight;

    const ratio = Math.min(
      pageWidth / elementWidth,
      pageHeight / elementHeight,
    );

    const pdfWidth = elementWidth * ratio;
    const pdfHeight = elementHeight * ratio;

    const x = (pageWidth - pdfWidth) / 2;
    const y = (pageHeight - pdfHeight) / 2;

    pdf.addImage(dataUrl, "PNG", x, y, pdfWidth, pdfHeight, undefined, "FAST");

    pdf.save(filename);
  } finally {
    element.style.boxShadow = originalBoxShadow;
  }
}
