export interface CompanyTheme {
  key: string;
  displayName: string;
  accent: string;
  accentLight: string;
  headerBg: string;
  headerDark: string;
  sidebarBg: string;
  tagline: string;
  subject: string;
  fileName: string;
}

const companies: Record<string, CompanyTheme> = {
  orange: {
    key: "orange",
    displayName: "Orange",
    accent: "#FF7900",
    accentLight: "#FF9A40",
    headerBg: "#1a1a2e",
    headerDark: "#16213e",
    sidebarBg: "#f8f9fa",
    tagline:
      "Passionnee par les modeles predictifs, l'automatisation intelligente et la remediation de code.",
    subject: "Candidature Stage IA & MLOps - Orange",
    fileName: "CV_Sara_El_Mountasser_Orange.pdf",
  },
  littlebigcode: {
    key: "littlebigcode",
    displayName: "LittleBigCode",
    accent: "#2d5a87",
    accentLight: "#6b9cc6",
    headerBg: "#0f172a",
    headerDark: "#1e293b",
    sidebarBg: "#f1f5f9",
    tagline:
      "Passionnee par l'IA appliquee, le code auto-reparateur et les pipelines MLOps de nouvelle generation.",
    subject: "Candidature - IA & MLOps - LittleBigCode",
    fileName: "CV_Sara_El_Mountasser_LittleBigCode.pdf",
  },
};

const defaultTheme: CompanyTheme = {
  key: "default",
  displayName: "",
  accent: "#10b981",
  accentLight: "#34d399",
  headerBg: "#1a1a2e",
  headerDark: "#16213e",
  sidebarBg: "#f8f9fa",
  tagline:
    "Passionnee par les modeles predictifs, l'automatisation intelligente et la remediation de code.",
  subject: "CV - Sara El Mountasser",
  fileName: "CV_Sara_El_Mountasser.pdf",
};

export function getCompanyTheme(name: string): CompanyTheme {
  const key = name.toLowerCase().replace(/\s+/g, "");
  return companies[key] ?? defaultTheme;
}

export const knownCompanies = Object.values(companies).map(
  (c) => c.displayName,
);
