import { jsPDF, GState } from 'jspdf';
import type { BrochurePage } from '@/types';

const PAGE_WIDTH = 210; // A4, mm
const PAGE_HEIGHT = 297;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

/** Downscales + re-encodes via canvas so the generated PDF stays a reasonable download size. */
function toJpegDataUrl(img: HTMLImageElement, maxWidth = 1400): string {
  const scale = Math.min(1, maxWidth / img.naturalWidth);
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth * scale;
  canvas.height = img.naturalHeight * scale;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', 0.82);
}

/** Builds a real, downloadable PDF from the brochure pages — full-bleed photo per page, cover-cropped like the on-screen viewer, with a heading/body scrim to match. */
export async function generateBrochurePdf(pages: BrochurePage[]): Promise<jsPDF> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    if (i > 0) doc.addPage();

    const img = await loadImage(page.image);
    const dataUrl = toJpegDataUrl(img);

    // Cover-fit crop (matches the viewer's object-cover), clipped to the page bounds.
    const scale = Math.max(PAGE_WIDTH / img.naturalWidth, PAGE_HEIGHT / img.naturalHeight);
    const drawWidth = img.naturalWidth * scale;
    const drawHeight = img.naturalHeight * scale;
    const x = (PAGE_WIDTH - drawWidth) / 2;
    const y = (PAGE_HEIGHT - drawHeight) / 2;

    doc.saveGraphicsState();
    doc.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT);
    doc.clip();
    doc.discardPath();
    doc.addImage(dataUrl, 'JPEG', x, y, drawWidth, drawHeight);
    doc.restoreGraphicsState();

    // Bottom scrim for text legibility over the photo.
    doc.saveGraphicsState();
    doc.setGState(new GState({ opacity: 0.55 }));
    doc.setFillColor(10, 10, 10);
    doc.rect(0, PAGE_HEIGHT - 90, PAGE_WIDTH, 90, 'F');
    doc.restoreGraphicsState();

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`${String(i + 1).padStart(2, '0')} / ${String(pages.length).padStart(2, '0')}`, 15, PAGE_HEIGHT - 68);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);
    doc.text(page.heading, 15, PAGE_HEIGHT - 50);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    const bodyLines = doc.splitTextToSize(page.body, PAGE_WIDTH - 30);
    doc.text(bodyLines, 15, PAGE_HEIGHT - 38);
  }

  return doc;
}
