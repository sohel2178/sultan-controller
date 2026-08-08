// import { toPng } from "html-to-image";
// import jsPDF from "jspdf";

// export async function exportCertificatePDF(
//   element: HTMLElement,
//   filename = "certificate.pdf",
// ) {
//   const originalBoxShadow = element.style.boxShadow;

//   try {
//     element.style.boxShadow = "none";

//     const dataUrl = await toPng(element, {
//       pixelRatio: 2,
//       cacheBust: true,
//       backgroundColor: "#ffffff",
//       skipFonts: false,
//       width: element.scrollWidth,
//       height: element.scrollHeight,
//       canvasWidth: element.scrollWidth * 3,
//       canvasHeight: element.scrollHeight * 3,
//     });

//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//       compress: true,
//     });

//     const pageWidth = 210;
//     const pageHeight = 297;

//     // Actual DOM size
//     const elementWidth = element.scrollWidth;
//     const elementHeight = element.scrollHeight;

//     const ratio = Math.min(
//       pageWidth / elementWidth,
//       pageHeight / elementHeight,
//     );

//     const pdfWidth = elementWidth * ratio;
//     const pdfHeight = elementHeight * ratio;

//     const x = (pageWidth - pdfWidth) / 2;
//     const y = (pageHeight - pdfHeight) / 2;

//     pdf.addImage(dataUrl, "PNG", x, y, pdfWidth, pdfHeight, undefined, "FAST");

//     pdf.save(filename);
//   } finally {
//     element.style.boxShadow = originalBoxShadow;
//   }
// }

import { toPng } from "html-to-image";
import jsPDF from "jspdf";

async function waitForImages(element: HTMLElement) {
  const images = Array.from(element.querySelectorAll("img"));

  await Promise.all(
    images.map(async (img) => {
      if (img.complete && img.naturalWidth > 0) {
        return;
      }

      await new Promise<void>((resolve) => {
        img.addEventListener("load", () => resolve(), {
          once: true,
        });

        img.addEventListener("error", () => resolve(), {
          once: true,
        });
      });
    }),
  );
}

async function waitForFonts() {
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }
}

async function nextFrame() {
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

export async function exportCertificatePDF(
  element: HTMLElement,
  filename = "certificate.pdf",
) {
  const originalBoxShadow = element.style.boxShadow;

  try {
    // Wait for fonts
    await waitForFonts();

    // Wait for images
    await waitForImages(element);

    // Wait for browser layout
    await nextFrame();
    await nextFrame();

    element.style.boxShadow = "none";

    // IMPORTANT:
    // Use actual rendered dimensions
    const rect = element.getBoundingClientRect();

    const width = Math.round(rect.width);
    const height = Math.round(rect.height);

    console.log("PDF element:", {
      width,
      height,
      scrollWidth: element.scrollWidth,
      scrollHeight: element.scrollHeight,
    });

    const dataUrl = await toPng(element, {
      backgroundColor: "#ffffff",

      cacheBust: true,

      width,
      height,

      pixelRatio: 2,

      style: {
        margin: "0",
        boxShadow: "none",
      },
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pageWidth = 210;
    const pageHeight = 297;

    const ratio = Math.min(pageWidth / width, pageHeight / height);

    const pdfWidth = width * ratio;
    const pdfHeight = height * ratio;

    const x = (pageWidth - pdfWidth) / 2;
    const y = (pageHeight - pdfHeight) / 2;

    pdf.addImage(dataUrl, "PNG", x, y, pdfWidth, pdfHeight, undefined, "FAST");

    pdf.save(filename);
  } finally {
    element.style.boxShadow = originalBoxShadow;
  }
}
