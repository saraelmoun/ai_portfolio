import { renderToBuffer } from "@react-pdf/renderer";
import CVDocument from "@/components/cv/CVDocument";

export async function GET() {
  const buffer = await renderToBuffer(<CVDocument />);
  const uint8 = new Uint8Array(buffer);

  return new Response(uint8, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'inline; filename="CV_Sara_El_Mountasser_Orange.pdf"',
    },
  });
}
