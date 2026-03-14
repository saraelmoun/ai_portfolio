import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Image,
} from "@react-pdf/renderer";

/* ─── Premium palette ─── */
const C = {
  navy: "#0a1628",
  navyMid: "#162033",
  accent: "#2d7ff9",
  accentSoft: "#5b9cfa",
  white: "#ffffff",
  offWhite: "#f7f9fc",
  text: "#2a3042",
  textMid: "#4a5568",
  textLight: "#8892a4",
  rule: "#dce3ed",
  ruleSoft: "#e8edf5",
};

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: C.text,
    backgroundColor: C.white,
    padding: 0,
  },

  /* ─── Top accent strip ─── */
  accentStrip: {
    height: 3,
    backgroundColor: C.accent,
  },

  /* ─── Header ─── */
  header: {
    backgroundColor: C.navy,
    paddingVertical: 18,
    paddingHorizontal: 36,
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  photo: {
    width: 66,
    height: 66,
    borderRadius: 999,
    objectFit: "cover",
    borderWidth: 2,
    borderColor: C.accent,
  },
  headerInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    marginBottom: 5,
  },
  name: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    letterSpacing: 0.5,
  },
  nameAccent: {
    fontSize: 12,
    fontFamily: "Helvetica-BoldOblique",
    color: C.accent,
  },
  titleText: {
    fontSize: 10.5,
    color: C.accentSoft,
    fontFamily: "Helvetica",
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  contactLink: {
    fontSize: 8,
    color: "#b0bdd0",
    textDecoration: "none",
  },
  contactSep: {
    fontSize: 7.5,
    color: "#3a4a60",
  },

  /* ─── Tagline bar ─── */
  taglineBar: {
    backgroundColor: C.offWhite,
    paddingVertical: 7,
    paddingHorizontal: 36,
    borderBottomWidth: 0.5,
    borderBottomColor: C.ruleSoft,
  },
  taglineText: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Oblique",
    color: C.textMid,
    textAlign: "center",
    letterSpacing: 0.2,
  },

  /* ─── Body ─── */
  body: {
    flexDirection: "row",
    flex: 1,
  },
  mainCol: {
    flex: 1,
    paddingLeft: 36,
    paddingRight: 14,
    paddingTop: 10,
    paddingBottom: 10,
  },
  sideCol: {
    width: 170,
    backgroundColor: C.offWhite,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 10,
    borderLeftWidth: 0.5,
    borderLeftColor: C.ruleSoft,
  },

  /* ─── Section titles ─── */
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    gap: 6,
  },
  sectionAccent: {
    width: 3,
    height: 13,
    backgroundColor: C.accent,
    borderRadius: 1,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: C.navy,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  sectionHeaderSide: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 5,
  },
  sectionAccentSide: {
    width: 2.5,
    height: 11,
    backgroundColor: C.accent,
    borderRadius: 1,
  },
  sectionTitleSide: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: C.navy,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  section: {
    marginBottom: 6,
  },
  sectionSide: {
    marginBottom: 5,
  },

  /* ─── Timeline experience ─── */
  expBlock: {
    flexDirection: "row",
    marginBottom: 1,
  },
  timeline: {
    width: 14,
    alignItems: "center",
    marginRight: 8,
  },
  tlDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: C.white,
    borderWidth: 1.5,
    borderColor: C.accent,
    marginTop: 1,
  },
  tlLine: {
    flex: 1,
    width: 0.8,
    backgroundColor: "#e2e8f0",
    marginTop: 2,
  },
  expContent: {
    flex: 1,
    paddingBottom: 2,
  },
  expTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 1,
  },
  expTitle: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: C.navy,
  },
  expDate: {
    fontSize: 7,
    color: C.accent,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.3,
  },
  expCompany: {
    fontSize: 7.5,
    color: C.textLight,
    fontFamily: "Helvetica-Oblique",
    marginBottom: 2,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 1,
  },
  bulletDot: {
    width: 3,
    height: 3,
    borderRadius: 999,
    backgroundColor: C.accent,
    marginRight: 5,
    marginTop: 3.5,
  },
  bulletText: {
    flex: 1,
    fontSize: 7.5,
    lineHeight: 1.35,
    color: C.textMid,
  },

  /* ─── Education ─── */
  eduDegree: {
    fontSize: 7.5,
    color: C.textMid,
    fontFamily: "Helvetica-Oblique",
  },

  /* ─── Projects ─── */
  projBlock: {
    marginBottom: 3,
  },
  projTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  projTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: C.navy,
  },
  projDate: {
    fontSize: 7,
    color: C.textLight,
  },
  projTechRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
    marginTop: 3,
  },
  projTag: {
    fontSize: 6.5,
    color: C.accent,
    backgroundColor: C.offWhite,
    borderWidth: 0.5,
    borderColor: "#dde4f0",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 8,
  },

  /* ─── Side skills ─── */
  skillGroup: {
    marginBottom: 5,
  },
  skillGroupLabel: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: C.navy,
    marginBottom: 3,
  },
  skillTagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
  },
  skillPill: {
    fontSize: 6.5,
    color: C.textMid,
    backgroundColor: C.white,
    paddingVertical: 2.5,
    paddingHorizontal: 6,
    borderRadius: 3,
    borderWidth: 0.3,
    borderColor: C.rule,
  },

  /* ─── Languages ─── */
  langRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  langName: {
    fontSize: 8,
    color: C.text,
  },
  langPill: {
    fontSize: 6.5,
    color: C.accent,
    borderWidth: 0.5,
    borderColor: C.accent,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 8,
  },

  /* ─── Qualities ─── */
  qualRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
    gap: 5,
  },
  qualDiamond: {
    fontSize: 5,
    color: C.accent,
  },
  qualText: {
    fontSize: 7.5,
    color: C.textMid,
  },

  /* ─── Distinctions ─── */
  distRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
    gap: 6,
  },
  distDiamond: {
    fontSize: 7,
    color: C.accent,
    marginTop: 1,
  },
  distText: {
    flex: 1,
    fontSize: 8,
    color: C.textMid,
    lineHeight: 1.4,
  },
  distBold: {
    fontFamily: "Helvetica-Bold",
    color: C.navy,
  },

  /* ─── QR ─── */
  qrBox: {
    alignItems: "center",
    marginTop: 8,
    backgroundColor: C.white,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  qrLabel: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: C.navy,
    marginBottom: 4,
  },
  qrLink: {
    fontSize: 6.5,
    color: C.accent,
    marginTop: 3,
    textDecoration: "none",
  },
});

/* ─── Components ─── */
function Bullet({ children }: { children: string }) {
  return (
    <View style={s.bulletRow}>
      <View style={s.bulletDot} />
      <Text style={s.bulletText}>{children}</Text>
    </View>
  );
}

function Quality({ children }: { children: string }) {
  return (
    <View style={s.qualRow}>
      <Text style={s.qualDiamond}>&#8226;</Text>
      <Text style={s.qualText}>{children}</Text>
    </View>
  );
}

function SkillGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <View style={s.skillGroup}>
      <Text style={s.skillGroupLabel}>{label}</Text>
      <View style={s.skillTagsRow}>
        {items.map((item) => (
          <Text key={item} style={s.skillPill}>{item}</Text>
        ))}
      </View>
    </View>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CV DOCUMENT — LITTLEBIGCODE — PREMIUM
   ═══════════════════════════════════════════════════════════════ */
export default function CVDocumentLBC() {
  return (
    <Document
      title="CV - Sara El Mountasser"
      author="Sara El Mountasser"
      subject="Candidature - IA & MLOps - LittleBigCode"
    >
      <Page size="A4" style={s.page}>

        {/* ── Accent strip ── */}
        <View style={s.accentStrip} />

        {/* ════════ HEADER ════════ */}
        <View style={s.header}>
          <Image src="/Photo.png" style={s.photo} />
          <View style={s.headerInfo}>
            <View style={s.nameRow}>
              <Text style={s.name}>Sara El Mountasser</Text>
              <Text style={s.nameAccent}>est la.</Text>
            </View>
            <Text style={s.titleText}>
              Ingenieure IA &amp; MLOps — NLP, Transformers &amp; Self-Healing
            </Text>
            <View style={s.contactRow}>
              <Link src="mailto:sara.elmountasser@telecom-paris.fr" style={s.contactLink}>
                sara.elmountasser@telecom-paris.fr
              </Link>
              <Text style={s.contactSep}>|</Text>
              <Text style={s.contactLink}>+33 6 63 61 82 79</Text>
              <Text style={s.contactSep}>|</Text>
              <Link src="https://www.linkedin.com/in/sara-elmountasser/" style={s.contactLink}>
                LinkedIn
              </Link>
              <Text style={s.contactSep}>|</Text>
              <Link src="https://ai-portfolio-two-sepia.vercel.app/" style={s.contactLink}>
                Portfolio
              </Link>
            </View>
          </View>
        </View>

        {/* ── Tagline ── */}
        <View style={s.taglineBar}>
          <Text style={s.taglineText}>
            Concevoir des systemes IA robustes et deployer des pipelines ML en production — de la modelisation au monitoring, avec une approche orientee impact business.
          </Text>
        </View>

        {/* ════════ BODY ════════ */}
        <View style={s.body}>
          {/* ──── MAIN COLUMN ──── */}
          <View style={s.mainCol}>

            {/* ─── EXPERIENCE ─── */}
            <View style={s.section}>
              <View style={s.sectionHeader}>
                <View style={s.sectionAccent} />
                <Text style={s.sectionTitle}>Experience</Text>
              </View>

              <View style={s.expBlock}>
                <View style={s.timeline}>
                  <View style={s.tlDot} />
                  <View style={s.tlLine} />
                </View>
                <View style={s.expContent}>
                  <View style={s.expTopRow}>
                    <Text style={s.expTitle}>Cheffe de Projet</Text>
                    <Text style={s.expDate}>2024 — 2025</Text>
                  </View>
                  <Text style={s.expCompany}>Orange — Lille</Text>
                  <Bullet>Pilotage d&apos;une equipe pluridisciplinaire de 5 experts (Developpeurs, Operationnels, Process Owners).</Bullet>
                  <Bullet>Mise en place d&apos;une gouvernance robuste (comites de pilotage, reporting, indicateurs de performance).</Bullet>
                  <Bullet>Supervision de la redaction des cahiers des charges fonctionnels, du developpement et de la recette fonctionnelle.</Bullet>
                  <Bullet>Negociation avec les parties prenantes pour garantir un financement perenne et justifier l&apos;impact business.</Bullet>
                </View>
              </View>

              <View style={s.expBlock}>
                <View style={s.timeline}>
                  <View style={s.tlDot} />
                  <View style={s.tlLine} />
                </View>
                <View style={s.expContent}>
                  <View style={s.expTopRow}>
                    <Text style={s.expTitle}>Ingenieure Data</Text>
                    <Text style={s.expDate}>2023 — 2024</Text>
                  </View>
                  <Text style={s.expCompany}>Orange — Lille</Text>
                  <Bullet>Animation de reunions de cadrage pour identifier, formaliser et hierarchiser les attentes metiers.</Bullet>
                  <Bullet>Conception d&apos;une base de donnees Access centralisee, consolidant automatiquement les exports du SI.</Bullet>
                  <Bullet>Nettoyage et validation des jeux de donnees (qualite, coherence, exhaustivite).</Bullet>
                  <Bullet>Developpement de tableaux de bord interactifs (Power BI), unifiant plusieurs rapports existants en une solution unique et evolutive.</Bullet>
                </View>
              </View>

              <View style={s.expBlock}>
                <View style={s.timeline}>
                  <View style={s.tlDot} />
                  <View style={{ flex: 1 }} />
                </View>
                <View style={s.expContent}>
                  <View style={s.expTopRow}>
                    <Text style={s.expTitle}>Developpeuse Full-Stack</Text>
                    <Text style={s.expDate}>2022 — 2023</Text>
                  </View>
                  <Text style={s.expCompany}>Orange — Lille</Text>
                  <Bullet>Conception de l&apos;architecture technique d&apos;une application web en Symfony.</Bullet>
                  <Bullet>Developpement backend (calcul des KPI, gestion des roles, historisation des donnees) et interface frontend.</Bullet>
                  <Bullet>Integration d&apos;APIs internes pour l&apos;agregation des donnees SI et automatisation de la mise a jour des indicateurs.</Bullet>
                  <Bullet>Tests automatises (PHPUnit) pour garantir la maintenabilite du code.</Bullet>
                </View>
              </View>
            </View>

            {/* ─── FORMATION ─── */}
            <View style={s.section}>
              <View style={s.sectionHeader}>
                <View style={s.sectionAccent} />
                <Text style={s.sectionTitle}>Formation</Text>
              </View>

              <View style={s.expBlock}>
                <View style={s.timeline}>
                  <View style={s.tlDot} />
                  <View style={s.tlLine} />
                </View>
                <View style={s.expContent}>
                  <View style={s.expTopRow}>
                    <Text style={s.expTitle}>Telecom Paris — IP Paris</Text>
                    <Text style={s.expDate}>2025 — 2026</Text>
                  </View>
                  <Text style={s.eduDegree}>Mastere specialise — IA, Data &amp; MLOps</Text>
                </View>
              </View>

              <View style={s.expBlock}>
                <View style={s.timeline}>
                  <View style={s.tlDot} />
                  <View style={{ flex: 1 }} />
                </View>
                <View style={s.expContent}>
                  <View style={s.expTopRow}>
                    <Text style={s.expTitle}>IMT Nord Europe — Mines-Telecom</Text>
                    <Text style={s.expDate}>2022 — 2025</Text>
                  </View>
                  <Text style={s.eduDegree}>Ingenieure — ML, Computer Vision, Cloud</Text>
                </View>
              </View>
            </View>

            {/* ─── PROJETS ─── */}
            <View style={s.section}>
              <View style={s.sectionHeader}>
                <View style={s.sectionAccent} />
                <Text style={s.sectionTitle}>Projets</Text>
              </View>

              <View style={s.projBlock}>
                <View style={s.projTopRow}>
                  <Text style={s.projTitle}>Prediction Marche Automobile — Renault</Text>
                  <Text style={s.projDate}>2025 — 2026</Text>
                </View>
                <Bullet>Modelisation de series temporelles pour la prediction du marche automobile a partir de bases de donnees europeennes.</Bullet>
                <Bullet>Signal NLP pour capturer les ambivalences politiques comme variables exogenes. Clustering des segments de marche.</Bullet>
                <View style={s.projTechRow}>
                  <Text style={s.projTag}>Time Series</Text>
                  <Text style={s.projTag}>NLP</Text>
                  <Text style={s.projTag}>Clustering</Text>
                  <Text style={s.projTag}>Python</Text>
                </View>
              </View>

              <View style={s.projBlock}>
                <View style={s.projTopRow}>
                  <Text style={s.projTitle}>Pipeline MLOps — Consommation Electrique</Text>
                  <Text style={s.projDate}>2025 — 2026</Text>
                </View>
                <Bullet>Pipeline end-to-end : ingestion event-driven (Kestra), Data Warehouse PostgreSQL (architecture Medallion), modele SARIMA avec tracking MLflow.</Bullet>
                <Bullet>Developpement API FastAPI + dashboard Streamlit. CI/CD/CT (GitHub Actions), monitoring Kibana, detection de data drift (test KS).</Bullet>
                <View style={s.projTechRow}>
                  <Text style={s.projTag}>MLflow</Text>
                  <Text style={s.projTag}>FastAPI</Text>
                  <Text style={s.projTag}>Streamlit</Text>
                  <Text style={s.projTag}>Docker</Text>
                  <Text style={s.projTag}>K3s</Text>
                  <Text style={s.projTag}>PostgreSQL</Text>
                </View>
              </View>
            </View>

            {/* ─── DISTINCTIONS ─── */}
            <View style={s.section}>
              <View style={s.sectionHeader}>
                <View style={s.sectionAccent} />
                <Text style={s.sectionTitle}>Distinctions</Text>
              </View>
              <View style={{ marginBottom: 4 }}>
                <View style={s.expTopRow}>
                  <Text style={s.expTitle}>2e place — Competition Kaggle — Sound Classification</Text>
                  <Text style={s.expDate}>2024</Text>
                </View>
                <Bullet>Classification de sons environnementaux (50 classes) par Deep Learning — accuracy 73% — IMT Nord Europe.</Bullet>
              </View>
              <View>
                <View style={s.expTopRow}>
                  <Text style={s.expTitle}>7e place — Competition Kaggle — Multimodal Action Recognition</Text>
                  <Text style={s.expDate}>2025</Text>
                </View>
                <Bullet>Reconnaissance d&apos;actions multimodales (mouvements corporels + activite plantaire) — accuracy 83% — IMT Nord Europe.</Bullet>
              </View>
            </View>
          </View>

          {/* ──── SIDE COLUMN ──── */}
          <View style={s.sideCol}>

            {/* ─── COMPETENCES ─── */}
            <View style={s.sectionSide}>
              <View style={s.sectionHeaderSide}>
                <View style={s.sectionAccentSide} />
                <Text style={s.sectionTitleSide}>Competences</Text>
              </View>

              <SkillGroup label="IA & Machine Learning" items={["Python", "PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "NLP", "Transformers", "Computer Vision"]} />
              <SkillGroup label="MLOps & Cloud" items={["Docker", "MLflow", "Streamlit", "CI/CD", "GitLab CI", "AWS", "Prometheus", "Grafana"]} />
              <SkillGroup label="Data Engineering" items={["Spark", "Hadoop", "Elasticsearch", "Kibana", "SQL", "Pandas", "ETL"]} />
              <SkillGroup label="Developpement" items={["JavaScript", "React", "Java", "PHP/Symfony", "PHPUnit", "Git"]} />
              <SkillGroup label="Pilotage & Conseil" items={["Agile", "Scrum", "Cadrage", "Reporting", "Equipe"]} />
            </View>

            {/* ─── LANGUES ─── */}
            <View style={s.sectionSide}>
              <View style={s.sectionHeaderSide}>
                <View style={s.sectionAccentSide} />
                <Text style={s.sectionTitleSide}>Langues</Text>
              </View>
              <View style={s.langRow}>
                <Text style={s.langName}>Francais</Text>
                <Text style={s.langPill}>Bilingue</Text>
              </View>
              <View style={s.langRow}>
                <Text style={s.langName}>Anglais</Text>
                <Text style={s.langPill}>C1</Text>
              </View>
            </View>

            {/* ─── QUALITES ─── */}
            <View style={s.sectionSide}>
              <View style={s.sectionHeaderSide}>
                <View style={s.sectionAccentSide} />
                <Text style={s.sectionTitleSide}>Qualites</Text>
              </View>
              <Quality>Rigueur &amp; synthese</Quality>
              <Quality>Communication client</Quality>
              <Quality>Resolution de problemes</Quality>
              <Quality>Autonomie &amp; initiative</Quality>
            </View>

            {/* ─── INTERETS ─── */}
            <View style={s.sectionSide}>
              <View style={s.sectionHeaderSide}>
                <View style={s.sectionAccentSide} />
                <Text style={s.sectionTitleSide}>Interets</Text>
              </View>
              <Quality>Vulgarisation scientifique</Quality>
              <Quality>Theorie de l&apos;optimisation</Quality>
              <Quality>IA generative &amp; creation video</Quality>
              <Quality>Surf</Quality>
            </View>

            {/* ─── PORTFOLIO ─── */}
            <View style={s.qrBox}>
              <Text style={s.qrLabel}>Portfolio interactif</Text>
              <Image src="/qr-portfolio.png" style={{ width: 52, height: 52 }} />
              <Link src="https://ai-portfolio-two-sepia.vercel.app/" style={s.qrLink}>
                ai-portfolio-two-sepia.vercel.app
              </Link>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
