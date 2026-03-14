import { renderToBuffer } from "@react-pdf/renderer";
import CVDocument from "@/components/cv/CVDocument";
import CVDocumentLBC from "@/components/cv/CVDocumentLBC";
import { getCompanyTheme } from "@/components/cv/companyConfig";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const company = searchParams.get("company") ?? "";
  const theme = getCompanyTheme(company);

  const key = company.toLowerCase().replace(/\s+/g, "");
  const doc = key === "littlebigcode"
    ? <CVDocumentLBC />
    : <CVDocument company={company} />;

  const buffer = await renderToBuffer(doc);
  const uint8 = new Uint8Array(buffer);

  return new Response(uint8, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${theme.fileName}"`,
    },
  });
}
