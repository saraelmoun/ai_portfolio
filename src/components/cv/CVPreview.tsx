"use client";

import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import CVDocument from "./CVDocument";
import Link from "next/link";
import { FiArrowLeft, FiDownload } from "react-icons/fi";

export default function CVPreview() {
  return (
    <div className="min-h-screen bg-[#030712] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-900/30 bg-[#0a1120]">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors font-mono text-sm"
        >
          <FiArrowLeft />
          Retour au portfolio
        </Link>

        <div className="flex items-center gap-4">
          <PDFDownloadLink
            document={<CVDocument />}
            fileName="CV_Sara_El_Mountasser_Orange.pdf"
          >
            {({ loading }) => (
              <button
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-mono text-sm transition-all duration-200 disabled:opacity-50"
                disabled={loading}
              >
                <FiDownload />
                {loading ? "Preparation..." : "Telecharger PDF"}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 p-6">
        <PDFViewer
          width="100%"
          height="100%"
          style={{
            border: "none",
            borderRadius: "12px",
            minHeight: "calc(100vh - 100px)",
          }}
        >
          <CVDocument />
        </PDFViewer>
      </div>
    </div>
  );
}
