import { NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';

export async function POST(request: Request) {
  try {
    const { mockupData } = await request.json();

    // Create a new PDF document
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    // Collect PDF data chunks
    doc.on('data', buffer => buffers.push(buffer));

    // Write content to the PDF
    doc
      .fontSize(24)
      .text(mockupData.companyName, { align: 'center' })
      .moveDown()
      .fontSize(18)
      .text(mockupData.tagline, { align: 'center' })
      .moveDown()
      .fontSize(14)
      .text(mockupData.description)
      .moveDown(2);

    // Add features
    if (mockupData.features) {
      doc.fontSize(18).text('Key Features', { align: 'left' }).moveDown();
      
      mockupData.features.forEach((feature: any) => {
        doc
          .fontSize(16)
          .text(feature.title)
          .fontSize(14)
          .text(feature.description)
          .moveDown();
      });
    }

    // Finalize the PDF
    doc.end();

    // Wait for the PDF to be generated
    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });
    });

    // Return the PDF as a response
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=pitch-deck.pdf',
      },
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
} 