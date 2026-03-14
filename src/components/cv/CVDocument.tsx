import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Image,
} from "@react-pdf/renderer";

/* ─── Color palette ─── */
const C = {
  black: "#1a1a2e",
  dark: "#16213e",
  white: "#ffffff",
  lightGray: "#f8f9fa",
  gray: "#6c757d",
  darkGray: "#343a40",
  orange: "#FF7900",
  orangeLight: "#FF9A40",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 8.5,
    color: C.darkGray,
    paddingTop: 0,
    paddingBottom: 20,
    paddingHorizontal: 0,
  },

  /* ─── Header ─── */
  header: {
    backgroundColor: C.black,
    color: C.white,
    paddingVertical: 18,
    paddingHorizontal: 36,
  },
  headerName: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    marginBottom: 3,
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 10,
    color: C.orangeLight,
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
    flexDirection: "row",
    gap: 14,
    flexWrap: "wrap",
  },
  contactItem: {
    fontSize: 7.5,
    color: "#dee2e6",
  },
  contactLink: {
    fontSize: 7.5,
    color: C.orangeLight,
    textDecoration: "none",
  },

  /* ─── Body layout ─── */
  body: {
    flexDirection: "row",
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
    backgroundColor: C.lightGray,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 14,
  },

  /* ─── Section ─── */
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: C.black,
    marginBottom: 6,
    paddingBottom: 2,
    borderBottomWidth: 2,
    borderBottomColor: C.orange,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  sectionTitleSide: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: C.black,
    marginBottom: 5,
    paddingBottom: 2,
    borderBottomWidth: 1.5,
    borderBottomColor: C.orange,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  section: {
    marginBottom: 10,
  },

  /* ─── Experience ─── */
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 1,
  },
  expTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: C.dark,
  },
  expCompany: {
    fontSize: 8.5,
    color: C.orange,
    fontFamily: "Helvetica-Bold",
    marginBottom: 1,
  },
  expDate: {
    fontSize: 7,
    color: C.gray,
    fontFamily: "Helvetica-Oblique",
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 1.5,
    paddingLeft: 4,
  },
  bullet: {
    width: 4,
    fontSize: 8,
    color: C.orange,
    marginRight: 4,
  },
  bulletText: {
    flex: 1,
    fontSize: 8,
    lineHeight: 1.35,
    color: C.darkGray,
  },

  /* ─── Education ─── */
  eduHighlightMain: {
    fontSize: 8,
    color: C.orange,
    fontFamily: "Helvetica-Bold",
    marginBottom: 1,
  },
  eduDegreeMain: {
    fontSize: 8.5,
    color: C.darkGray,
    marginBottom: 2,
    fontFamily: "Helvetica-Oblique",
  },

  /* ─── Skills sidebar ─── */
  skillCategory: {
    marginBottom: 7,
  },
  skillCategoryTitle: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: C.dark,
    marginBottom: 2,
  },
  skillTag: {
    fontSize: 7,
    color: C.darkGray,
    backgroundColor: C.white,
    paddingVertical: 1.5,
    paddingHorizontal: 4,
    borderRadius: 2,
    marginRight: 2,
    marginBottom: 2,
  },
  skillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  /* ─── Languages ─── */
  langRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  langName: {
    fontSize: 7.5,
    color: C.darkGray,
  },
  langLevel: {
    fontSize: 7,
    color: C.gray,
    fontFamily: "Helvetica-Oblique",
  },

  /* ─── Interests ─── */
  interestText: {
    fontSize: 7.5,
    color: C.darkGray,
    lineHeight: 1.4,
  },

  /* ─── Project ─── */
  projectTitle: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: C.dark,
    marginBottom: 1,
  },
  projectTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 1,
    marginBottom: 5,
  },
  projectTag: {
    fontSize: 6.5,
    color: C.orange,
    borderWidth: 0.5,
    borderColor: C.orange,
    paddingVertical: 1,
    paddingHorizontal: 3,
    borderRadius: 2,
    marginRight: 2,
    marginBottom: 1,
  },
});

/* ─── Bullet component ─── */
function Bullet({ children }: { children: string }) {
  return (
    <View style={styles.bulletPoint}>
      <Text style={styles.bullet}>&#8226;</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CV DOCUMENT — 1 PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function CVDocument() {
  return (
    <Document
      title="CV - Sara El Mountasser"
      author="Sara El Mountasser"
      subject="Candidature Stage IA & MLOps - Orange"
    >
      <Page size="A4" style={styles.page}>
        {/* ════════ HEADER ════════ */}
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
            {/* Photo cercle */}
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
                <Text style={{ fontSize: 12, color: C.orange, fontFamily: "Helvetica-BoldOblique" }}>est là.</Text>
              </View>
              <Text style={styles.headerTitle}>
                Ingenieure IA & MLOps | Specialiste NLP, Transformers & Self-Healing
              </Text>
              <Text style={styles.headerTagline}>
                Passionnee par les modeles predictifs, l&apos;automatisation intelligente et la remediation de code.
              </Text>
              <View style={styles.headerContact}>
                <Link src="mailto:sara.elmountasser@telecom-paris.fr" style={styles.contactLink}>
                  sara.elmountasser@telecom-paris.fr
                </Link>
                <Text style={styles.contactItem}>+33 6 63 61 82 79</Text>
                <Link src="https://www.linkedin.com/in/sara-elmountasser/" style={styles.contactLink}>
                  LinkedIn
                </Link>
                <Link src="https://ai-portfolio-two-sepia.vercel.app/" style={styles.contactLink}>
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
              <Text style={styles.sectionTitle}>Formation</Text>

              <View style={styles.expHeader}>
                <View>
                  <Text style={styles.expTitle}>Telecom Paris — Institut Polytechnique de Paris</Text>
                </View>
                <Text style={styles.expDate}>2025 — 2026</Text>
              </View>
              <Text style={styles.eduDegreeMain}>Mastère spécialisé — Expert en Intelligence Artificielle, Data & MLOps</Text>
              <View style={{ marginBottom: 7 }} />

              <View style={styles.expHeader}>
                <View>
                  <Text style={styles.expTitle}>IMT Nord Europe — Institut Mines-Telecom</Text>
                </View>
                <Text style={styles.expDate}>2022 — 2025</Text>
              </View>
              <Text style={styles.eduDegreeMain}>Diplome d&apos;Ingenieure — Machine Learning, Computer Vision, Cloud</Text>
            </View>

            {/* ─── EXPERIENCES ─── */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experiences Professionnelles</Text>

              {/* Exp 1 */}
              <View style={styles.expHeader}>
                <View>
                  <Text style={styles.expTitle}>Developpeuse Web Full-Stack</Text>
                  <Text style={styles.expCompany}>Orange — Lille</Text>
                </View>
                <Text style={styles.expDate}>2022 — 2023</Text>
              </View>
              <Bullet>Conception de l&apos;architecture technique d&apos;une application web en Symfony.</Bullet>
              <Bullet>Developpement backend (calcul des KPI, gestion des roles, historisation des donnees) et interface frontend.</Bullet>
              <Bullet>Integration d&apos;APIs internes pour l&apos;agregation des donnees SI et automatisation de la mise a jour des indicateurs.</Bullet>
              <Bullet>Tests automatises (PHPUnit) pour garantir la maintenabilite du code.</Bullet>
              <View style={{ marginBottom: 7 }} />

              {/* Exp 2 */}
              <View style={styles.expHeader}>
                <View>
                  <Text style={styles.expTitle}>Ingenieure Data</Text>
                  <Text style={styles.expCompany}>Orange — Lille</Text>
                </View>
                <Text style={styles.expDate}>2023 — 2024</Text>
              </View>
              <Bullet>Animation de reunions de cadrage pour identifier, formaliser et hierarchiser les attentes metiers.</Bullet>
              <Bullet>Conception d&apos;une base de donnees Access centralisee, consolidant automatiquement les exports du SI.</Bullet>
              <Bullet>Nettoyage et validation des jeux de donnees (qualite, coherence, exhaustivite).</Bullet>
              <Bullet>Developpement de tableaux de bord interactifs (Power BI), unifiant plusieurs rapports existants en une solution unique et evolutive.</Bullet>
              <View style={{ marginBottom: 7 }} />

              {/* Exp 3 */}
              <View style={styles.expHeader}>
                <View>
                  <Text style={styles.expTitle}>Cheffe de Projet</Text>
                  <Text style={styles.expCompany}>Orange — Lille</Text>
                </View>
                <Text style={styles.expDate}>2024 — 2025</Text>
              </View>
              <Bullet>Pilotage d&apos;une equipe pluridisciplinaire de 5 experts (Developpeurs, Operationnels, Process Owners).</Bullet>
              <Bullet>Mise en place d&apos;une gouvernance robuste (comites de pilotage, reporting, indicateurs de performance).</Bullet>
              <Bullet>Supervision de la redaction des cahiers des charges fonctionnels, du developpement et de la recette fonctionnelle.</Bullet>
              <Bullet>Negociation avec les parties prenantes pour garantir un financement perenne et justifier l&apos;impact business.</Bullet>
            </View>

            {/* ─── PROJET ─── */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projets Academiques</Text>

              <View style={styles.expHeader}>
                <View>
                  <Text style={styles.projectTitle}>Prediction du Marche Automobile — Renault (Fil Rouge)</Text>
                </View>
                <Text style={styles.expDate}>2025 — 2026</Text>
              </View>
              <Bullet>Modelisation de series temporelles pour la prediction du marche automobile a partir de bases de donnees europeennes.</Bullet>
              <Bullet>Signal NLP pour capturer les ambivalences politiques comme variables exogenes. Clustering des segments de marche.</Bullet>
              <View style={styles.projectTags}>
                <Text style={styles.projectTag}>Time Series</Text>
                <Text style={styles.projectTag}>NLP</Text>
                <Text style={styles.projectTag}>Clustering</Text>
                <Text style={styles.projectTag}>Python</Text>
              </View>

              <View style={styles.expHeader}>
                <View>
                  <Text style={styles.projectTitle}>Pipeline MLOps — Prediction Consommation Electrique (Linky)</Text>
                </View>
                <Text style={styles.expDate}>2025 — 2026</Text>
              </View>
              <Bullet>Pipeline end-to-end : ingestion event-driven (Kestra), Data Warehouse PostgreSQL (architecture Medallion), modele SARIMA avec tracking MLflow.</Bullet>
              <Bullet>Developpement API FastAPI + dashboard Streamlit. CI/CD/CT (GitHub Actions), monitoring Kibana, detection de data drift (test KS).</Bullet>
              <View style={styles.projectTags}>
                <Text style={styles.projectTag}>MLflow</Text>
                <Text style={styles.projectTag}>FastAPI</Text>
                <Text style={styles.projectTag}>Streamlit</Text>
                <Text style={styles.projectTag}>Docker</Text>
                <Text style={styles.projectTag}>K3s</Text>
                <Text style={styles.projectTag}>PostgreSQL</Text>
              </View>
            </View>

            {/* ─── DISTINCTION ─── */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Distinction</Text>
              <View style={styles.expHeader}>
                <View>
                  <Text style={styles.projectTitle}>2e place — Competition Kaggle — Sound Classification</Text>
                </View>
                <Text style={styles.expDate}>2024</Text>
              </View>
              <Bullet>Classification de sons environnementaux (50 classes) par Deep Learning — accuracy 73% — IMT Nord Europe.</Bullet>
              <View style={{ marginBottom: 5 }} />
              <View style={styles.expHeader}>
                <View>
                  <Text style={styles.projectTitle}>7e place — Competition Kaggle — Multimodal Action Recognition</Text>
                </View>
                <Text style={styles.expDate}>2025</Text>
              </View>
              <Bullet>Reconnaissance d&apos;actions multimodales (mouvements corporels + activite plantaire) — accuracy 83% — IMT Nord Europe.</Bullet>
            </View>
          </View>

          {/* ──── SIDE COLUMN ──── */}
          <View style={styles.sideCol}>

            {/* ─── COMPETENCES ─── */}
            <View style={styles.section}>
              <Text style={styles.sectionTitleSide}>Competences</Text>

              <View style={styles.skillCategory}>
                <Text style={styles.skillCategoryTitle}>IA & Machine Learning</Text>
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
                <Text style={styles.skillCategoryTitle}>MLOps & Cloud</Text>
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
                <Text style={styles.skillCategoryTitle}>Big Data</Text>
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
                <Text style={styles.skillCategoryTitle}>Dev & Tests</Text>
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
              <Text style={styles.sectionTitleSide}>Langues</Text>
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
              <Text style={styles.sectionTitleSide}>Qualites</Text>
              <Text style={styles.interestText}>
                Curiosite technique{"\n"}
                Resolution de problemes{"\n"}
                Agile / Scrum{"\n"}
                Autonomie & initiative
              </Text>
            </View>

            {/* ─── CENTRES D'INTERET ─── */}
            <View style={styles.section}>
              <Text style={styles.sectionTitleSide}>Centres d&apos;interet</Text>
              <Text style={styles.interestText}>
                Vulgarisation scientifique{"\n"}
                Theorie de l&apos;optimisation (convergence){"\n"}
                Creation video & IA generative{"\n"}
                Surf
              </Text>
            </View>

            {/* ─── PORTFOLIO QR ─── */}
            <View style={{
              marginTop: 4,
              alignItems: "center",
              backgroundColor: C.white,
              borderRadius: 6,
              paddingVertical: 8,
              paddingHorizontal: 10,
              borderWidth: 1.5,
              borderColor: C.orange,
            }}>
              <Text style={{
                fontSize: 8,
                fontFamily: "Helvetica-Bold",
                color: C.black,
                marginBottom: 2,
                textAlign: "center",
              }}>
                Mon portfolio interactif
              </Text>
              <Text style={{
                fontSize: 6.5,
                color: C.gray,
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
                color: C.orange,
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
