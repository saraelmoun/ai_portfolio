import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Image,
} from "@react-pdf/renderer";
import { getCompanyTheme } from "./companyConfig";

/* ─── Static colors (non-themed) ─── */
const S = {
  white: "#ffffff",
  gray: "#6c757d",
  darkGray: "#343a40",
};

/* ─── Static layout styles ─── */
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 8.5,
    color: S.darkGray,
    paddingTop: 0,
    paddingBottom: 20,
    paddingHorizontal: 0,
  },
  header: {
    color: S.white,
    paddingVertical: 18,
    paddingHorizontal: 36,
  },
  headerName: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: S.white,
    marginBottom: 3,
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 10,
    marginBottom: 6,
    fontFamily: "Helvetica-Bold",
  },
  headerTagline: {
    fontSize: 8,
    color: "#adb5bd",
    lineHeight: 1.4,
    marginBottom: 8,
  },
  headerContact: {
    flexDirection: "row" as const,
    gap: 14,
    flexWrap: "wrap" as const,
  },
  contactItem: {
    fontSize: 7.5,
    color: "#dee2e6",
  },
  contactLink: {
    fontSize: 7.5,
    textDecoration: "none" as const,
  },
  body: {
    flexDirection: "row" as const,
    flex: 1,
  },
  mainCol: {
    flex: 1,
    paddingRight: 14,
    paddingLeft: 36,
    paddingTop: 12,
  },
  sideCol: {
    width: 175,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 14,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
    paddingBottom: 2,
    borderBottomWidth: 2,
    textTransform: "uppercase" as const,
    letterSpacing: 1,
  },
  sectionTitleSide: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    marginBottom: 5,
    paddingBottom: 2,
    borderBottomWidth: 1.5,
    textTransform: "uppercase" as const,
    letterSpacing: 0.8,
  },
  section: {
    marginBottom: 10,
  },
  expHeader: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "flex-start" as const,
    marginBottom: 1,
  },
  expTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
  },
  expCompany: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    marginBottom: 1,
  },
  expDate: {
    fontSize: 7,
    color: S.gray,
    fontFamily: "Helvetica-Oblique",
  },
  bulletPoint: {
    flexDirection: "row" as const,
    marginBottom: 1.5,
    paddingLeft: 4,
  },
  bullet: {
    width: 4,
    fontSize: 8,
    marginRight: 4,
  },
  bulletText: {
    flex: 1,
    fontSize: 8,
    lineHeight: 1.35,
    color: S.darkGray,
  },
  eduDegreeMain: {
    fontSize: 8.5,
    color: S.darkGray,
    marginBottom: 2,
    fontFamily: "Helvetica-Oblique",
  },
  skillCategory: {
    marginBottom: 7,
  },
  skillCategoryTitle: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  skillTag: {
    fontSize: 7,
    color: S.darkGray,
    backgroundColor: S.white,
    paddingVertical: 1.5,
    paddingHorizontal: 4,
    borderRadius: 2,
    marginRight: 2,
    marginBottom: 2,
  },
  skillRow: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
  },
  langRow: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    marginBottom: 2,
  },
  langName: {
    fontSize: 7.5,
    color: S.darkGray,
  },
  langLevel: {
    fontSize: 7,
    color: S.gray,
    fontFamily: "Helvetica-Oblique",
  },
  interestText: {
    fontSize: 7.5,
    color: S.darkGray,
    lineHeight: 1.4,
  },
  projectTitle: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    marginBottom: 1,
  },
  projectTags: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    marginTop: 1,
    marginBottom: 5,
  },
  projectTag: {
    fontSize: 6.5,
    borderWidth: 0.5,
    paddingVertical: 1,
    paddingHorizontal: 3,
    borderRadius: 2,
    marginRight: 2,
    marginBottom: 1,
  },
});

/* ─── Bullet component ─── */
function Bullet({ children, accent }: { children: string; accent: string }) {
  return (
    <View style={styles.bulletPoint}>
      <Text style={[styles.bullet, { color: accent }]}>&#8226;</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CV DOCUMENT — 1 PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function CVDocument({ company = "" }: { company?: string }) {
  const t = getCompanyTheme(company);
  const accent = t.accent;
  const accentLight = t.accentLight;

  return (
    <Document
      title="CV - Sara El Mountasser"
      author="Sara El Mountasser"
      subject={t.subject}
    >
      <Page size="A4" style={styles.page}>
        {/* ════════ HEADER ════════ */}
        <View style={[styles.header, { backgroundColor: t.headerBg }]}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
            <Image
              src="/Photo.png"
              style={{
                width: 72,
                height: 72,
                borderRadius: 999,
                objectFit: "cover",
              }}
            />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "baseline", gap: 10, marginBottom: 3 }}>
                <Text style={styles.headerName}>SARA EL MOUNTASSER</Text>
                <Text style={{ fontSize: 12, color: accent, fontFamily: "Helvetica-BoldOblique" }}>est là.</Text>
              </View>
              <Text style={[styles.headerTitle, { color: accentLight }]}>
                Ingenieure IA &amp; MLOps | Specialiste NLP, Transformers &amp; Self-Healing
              </Text>
              <Text style={styles.headerTagline}>
                {t.tagline}
              </Text>
              <View style={styles.headerContact}>
                <Link src="mailto:sara.elmountasser@telecom-paris.fr" style={[styles.contactLink, { color: accentLight }]}>
                  sara.elmountasser@telecom-paris.fr
                </Link>
                <Text style={styles.contactItem}>+33 6 63 61 82 79</Text>
                <Link src="https://www.linkedin.com/in/sara-elmountasser/" style={[styles.contactLink, { color: accentLight }]}>
                  LinkedIn
                </Link>
                <Link src="https://ai-portfolio-two-sepia.vercel.app/" style={[styles.contactLink, { color: accentLight }]}>
                  Portfolio
                </Link>
              </View>
            </View>
          </View>
        </View>

        {/* ════════ BODY ════════ */}
        <View style={styles.body}>
          {/* ──── MAIN COLUMN ──── */}
          <View style={styles.mainCol}>

            {/* ─── FORMATION ─── */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: t.headerBg, borderBottomColor: accent }]}>Formation</Text>

              <View style={styles.expHeader}>
                <View>
                  <Text style={[styles.expTitle, { color: t.headerDark }]}>Telecom Paris — Institut Polytechnique de Paris</Text>
                </View>
                <Text style={styles.expDate}>2025 — 2026</Text>
              </View>
              <Text style={styles.eduDegreeMain}>Mastère spécialisé — Expert en Intelligence Artificielle, Data &amp; MLOps</Text>
              <View style={{ marginBottom: 7 }} />

              <View style={styles.expHeader}>
                <View>
                  <Text style={[styles.expTitle, { color: t.headerDark }]}>IMT Nord Europe — Institut Mines-Telecom</Text>
                </View>
                <Text style={styles.expDate}>2022 — 2025</Text>
              </View>
              <Text style={styles.eduDegreeMain}>Diplome d&apos;Ingenieure — Machine Learning, Computer Vision, Cloud</Text>
            </View>

            {/* ─── EXPERIENCES ─── */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: t.headerBg, borderBottomColor: accent }]}>Experiences Professionnelles</Text>

              {/* Exp 1 */}
              <View style={styles.expHeader}>
                <View>
                  <Text style={[styles.expTitle, { color: t.headerDark }]}>Developpeuse Web Full-Stack</Text>
                  <Text style={[styles.expCompany, { color: accent }]}>Orange — Lille</Text>
                </View>
                <Text style={styles.expDate}>2022 — 2023</Text>
              </View>
              <Bullet accent={accent}>Conception de l&apos;architecture technique d&apos;une application web en Symfony.</Bullet>
              <Bullet accent={accent}>Developpement backend (calcul des KPI, gestion des roles, historisation des donnees) et interface frontend.</Bullet>
              <Bullet accent={accent}>Integration d&apos;APIs internes pour l&apos;agregation des donnees SI et automatisation de la mise a jour des indicateurs.</Bullet>
              <Bullet accent={accent}>Tests automatises (PHPUnit) pour garantir la maintenabilite du code.</Bullet>
              <View style={{ marginBottom: 7 }} />

              {/* Exp 2 */}
              <View style={styles.expHeader}>
                <View>
                  <Text style={[styles.expTitle, { color: t.headerDark }]}>Ingenieure Data</Text>
                  <Text style={[styles.expCompany, { color: accent }]}>Orange — Lille</Text>
                </View>
                <Text style={styles.expDate}>2023 — 2024</Text>
              </View>
              <Bullet accent={accent}>Animation de reunions de cadrage pour identifier, formaliser et hierarchiser les attentes metiers.</Bullet>
              <Bullet accent={accent}>Conception d&apos;une base de donnees Access centralisee, consolidant automatiquement les exports du SI.</Bullet>
              <Bullet accent={accent}>Nettoyage et validation des jeux de donnees (qualite, coherence, exhaustivite).</Bullet>
              <Bullet accent={accent}>Developpement de tableaux de bord interactifs (Power BI), unifiant plusieurs rapports existants en une solution unique et evolutive.</Bullet>
              <View style={{ marginBottom: 7 }} />

              {/* Exp 3 */}
              <View style={styles.expHeader}>
                <View>
                  <Text style={[styles.expTitle, { color: t.headerDark }]}>Cheffe de Projet</Text>
                  <Text style={[styles.expCompany, { color: accent }]}>Orange — Lille</Text>
                </View>
                <Text style={styles.expDate}>2024 — 2025</Text>
              </View>
              <Bullet accent={accent}>Pilotage d&apos;une equipe pluridisciplinaire de 5 experts (Developpeurs, Operationnels, Process Owners).</Bullet>
              <Bullet accent={accent}>Mise en place d&apos;une gouvernance robuste (comites de pilotage, reporting, indicateurs de performance).</Bullet>
              <Bullet accent={accent}>Supervision de la redaction des cahiers des charges fonctionnels, du developpement et de la recette fonctionnelle.</Bullet>
              <Bullet accent={accent}>Negociation avec les parties prenantes pour garantir un financement perenne et justifier l&apos;impact business.</Bullet>
            </View>

            {/* ─── PROJET ─── */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: t.headerBg, borderBottomColor: accent }]}>Projets Academiques</Text>

              <View style={styles.expHeader}>
                <View>
                  <Text style={[styles.projectTitle, { color: t.headerDark }]}>Prediction du Marche Automobile — Renault (Fil Rouge)</Text>
                </View>
                <Text style={styles.expDate}>2025 — 2026</Text>
              </View>
              <Bullet accent={accent}>Modelisation de series temporelles pour la prediction du marche automobile a partir de bases de donnees europeennes.</Bullet>
              <Bullet accent={accent}>Signal NLP pour capturer les ambivalences politiques comme variables exogenes. Clustering des segments de marche.</Bullet>
              <View style={styles.projectTags}>
                <Text style={[styles.projectTag, { color: accent, borderColor: accent }]}>Time Series</Text>
                <Text style={[styles.projectTag, { color: accent, borderColor: accent }]}>NLP</Text>
                <Text style={[styles.projectTag, { color: accent, borderColor: accent }]}>Clustering</Text>
                <Text style={[styles.projectTag, { color: accent, borderColor: accent }]}>Python</Text>
              </View>

              <View style={styles.expHeader}>
                <View>
                  <Text style={[styles.projectTitle, { color: t.headerDark }]}>Pipeline MLOps — Prediction Consommation Electrique (Linky)</Text>
                </View>
                <Text style={styles.expDate}>2025 — 2026</Text>
              </View>
              <Bullet accent={accent}>Pipeline end-to-end : ingestion event-driven (Kestra), Data Warehouse PostgreSQL (architecture Medallion), modele SARIMA avec tracking MLflow.</Bullet>
              <Bullet accent={accent}>Developpement API FastAPI + dashboard Streamlit. CI/CD/CT (GitHub Actions), monitoring Kibana, detection de data drift (test KS).</Bullet>
              <View style={styles.projectTags}>
                <Text style={[styles.projectTag, { color: accent, borderColor: accent }]}>MLflow</Text>
                <Text style={[styles.projectTag, { color: accent, borderColor: accent }]}>FastAPI</Text>
                <Text style={[styles.projectTag, { color: accent, borderColor: accent }]}>Streamlit</Text>
                <Text style={[styles.projectTag, { color: accent, borderColor: accent }]}>Docker</Text>
                <Text style={[styles.projectTag, { color: accent, borderColor: accent }]}>K3s</Text>
                <Text style={[styles.projectTag, { color: accent, borderColor: accent }]}>PostgreSQL</Text>
              </View>
            </View>

            {/* ─── DISTINCTION ─── */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: t.headerBg, borderBottomColor: accent }]}>Distinction</Text>
              <View style={styles.expHeader}>
                <View>
                  <Text style={[styles.projectTitle, { color: t.headerDark }]}>2e place — Competition Kaggle — Sound Classification</Text>
                </View>
                <Text style={styles.expDate}>2024</Text>
              </View>
              <Bullet accent={accent}>Classification de sons environnementaux (50 classes) par Deep Learning — accuracy 73% — IMT Nord Europe.</Bullet>
              <View style={{ marginBottom: 5 }} />
              <View style={styles.expHeader}>
                <View>
                  <Text style={[styles.projectTitle, { color: t.headerDark }]}>7e place — Competition Kaggle — Multimodal Action Recognition</Text>
                </View>
                <Text style={styles.expDate}>2025</Text>
              </View>
              <Bullet accent={accent}>Reconnaissance d&apos;actions multimodales (mouvements corporels + activite plantaire) — accuracy 83% — IMT Nord Europe.</Bullet>
            </View>
          </View>

          {/* ──── SIDE COLUMN ──── */}
          <View style={[styles.sideCol, { backgroundColor: t.sidebarBg }]}>

            {/* ─── COMPETENCES ─── */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitleSide, { color: t.headerBg, borderBottomColor: accent }]}>Competences</Text>

              <View style={styles.skillCategory}>
                <Text style={[styles.skillCategoryTitle, { color: t.headerDark }]}>IA &amp; Machine Learning</Text>
                <View style={styles.skillRow}>
                  <Text style={styles.skillTag}>Python</Text>
                  <Text style={styles.skillTag}>Scikit-learn</Text>
                  <Text style={styles.skillTag}>TensorFlow</Text>
                  <Text style={styles.skillTag}>PyTorch</Text>
                  <Text style={styles.skillTag}>XGBoost</Text>
                  <Text style={styles.skillTag}>NLP</Text>
                  <Text style={styles.skillTag}>Transformers</Text>
                  <Text style={styles.skillTag}>Computer Vision</Text>
                </View>
              </View>

              <View style={styles.skillCategory}>
                <Text style={[styles.skillCategoryTitle, { color: t.headerDark }]}>MLOps &amp; Cloud</Text>
                <View style={styles.skillRow}>
                  <Text style={styles.skillTag}>Docker</Text>
                  <Text style={styles.skillTag}>MLflow</Text>
                  <Text style={styles.skillTag}>Streamlit</Text>
                  <Text style={styles.skillTag}>CI/CD</Text>
                  <Text style={styles.skillTag}>GitLab CI</Text>
                  <Text style={styles.skillTag}>AWS</Text>
                  <Text style={styles.skillTag}>Prometheus</Text>
                  <Text style={styles.skillTag}>Grafana</Text>
                </View>
              </View>

              <View style={styles.skillCategory}>
                <Text style={[styles.skillCategoryTitle, { color: t.headerDark }]}>Big Data</Text>
                <View style={styles.skillRow}>
                  <Text style={styles.skillTag}>Hadoop</Text>
                  <Text style={styles.skillTag}>Spark</Text>
                  <Text style={styles.skillTag}>Elasticsearch</Text>
                  <Text style={styles.skillTag}>Kibana</Text>
                  <Text style={styles.skillTag}>Zookeeper</Text>
                  <Text style={styles.skillTag}>SQL</Text>
                  <Text style={styles.skillTag}>Pandas</Text>
                  <Text style={styles.skillTag}>ETL</Text>
                </View>
              </View>

              <View style={styles.skillCategory}>
                <Text style={[styles.skillCategoryTitle, { color: t.headerDark }]}>Dev &amp; Tests</Text>
                <View style={styles.skillRow}>
                  <Text style={styles.skillTag}>JavaScript</Text>
                  <Text style={styles.skillTag}>React</Text>
                  <Text style={styles.skillTag}>Java</Text>
                  <Text style={styles.skillTag}>PHP/Symfony</Text>
                  <Text style={styles.skillTag}>PHPUnit</Text>
                  <Text style={styles.skillTag}>Git</Text>
                </View>
              </View>
            </View>

            {/* ─── LANGUES ─── */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitleSide, { color: t.headerBg, borderBottomColor: accent }]}>Langues</Text>
              <View style={styles.langRow}>
                <Text style={styles.langName}>Francais</Text>
                <Text style={styles.langLevel}>Bilingue</Text>
              </View>
              <View style={styles.langRow}>
                <Text style={styles.langName}>Anglais</Text>
                <Text style={styles.langLevel}>Courant (C1)</Text>
              </View>
            </View>

            {/* ─── QUALITES ─── */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitleSide, { color: t.headerBg, borderBottomColor: accent }]}>Qualites</Text>
              <Text style={styles.interestText}>
                Curiosite technique{"\n"}
                Resolution de problemes{"\n"}
                Agile / Scrum{"\n"}
                Autonomie &amp; initiative
              </Text>
            </View>

            {/* ─── CENTRES D'INTERET ─── */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitleSide, { color: t.headerBg, borderBottomColor: accent }]}>Centres d&apos;interet</Text>
              <Text style={styles.interestText}>
                Vulgarisation scientifique{"\n"}
                Theorie de l&apos;optimisation (convergence){"\n"}
                Creation video &amp; IA generative{"\n"}
                Surf
              </Text>
            </View>

            {/* ─── PORTFOLIO QR ─── */}
            <View style={{
              marginTop: 4,
              alignItems: "center",
              backgroundColor: S.white,
              borderRadius: 6,
              paddingVertical: 8,
              paddingHorizontal: 10,
              borderWidth: 1.5,
              borderColor: accent,
            }}>
              <Text style={{
                fontSize: 8,
                fontFamily: "Helvetica-Bold",
                color: t.headerBg,
                marginBottom: 2,
                textAlign: "center",
              }}>
                Mon portfolio interactif
              </Text>
              <Text style={{
                fontSize: 6.5,
                color: S.gray,
                marginBottom: 6,
                textAlign: "center",
              }}>
                Cliquez ou scannez
              </Text>
              <Image
                src="/qr-portfolio.png"
                style={{ width: 64, height: 64 }}
              />
              <Link src="https://ai-portfolio-two-sepia.vercel.app/" style={{
                fontSize: 6.5,
                color: accent,
                fontFamily: "Helvetica-Bold",
                marginTop: 4,
                textDecoration: "none",
              }}>
                ai-portfolio-two-sepia.vercel.app
              </Link>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
