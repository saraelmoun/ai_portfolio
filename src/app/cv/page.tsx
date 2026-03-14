"use client";

import dynamic from "next/dynamic";

const CVPreview = dynamic(() => import("@/components/cv/CVPreview"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400 font-mono text-sm">
          Generation du CV...
        </p>
      </div>
    </div>
  ),
});

export default function CVPage() {
  return <CVPreview />;
}
