import { useState } from "react";

const layers = [
  {
    id: "detect",
    label: "DÉTECTION",
    color: "#00d4ff",
    bg: "rgba(0,212,255,0.08)",
    border: "rgba(0,212,255,0.4)",
    nodes: [
      { id: "fg", icon: "🔥", title: "Fortigate", sub: "DHCP lease event\nSyslog / API polling\nDHCP new lease hook" },
      { id: "arp", icon: "📡", title: "ARP Watch", sub: "Docker: arpwatch\nNouvel équipement sur le LAN\nMAC address capture" },
      { id: "nmap", icon: "🔍", title: "Nmap Scanner", sub: "Docker: nmap\nScan actif des sous-réseaux\nCron toutes les 15min" },
    ],
  },
  {
    id: "enrich",
    label: "ENRICHISSEMENT",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.4)",
    nodes: [
      { id: "os", icon: "🖥️", title: "OS Fingerprinting", sub: "Nmap -O / -sV\nType: PC, mobile, tablet\nOS: Windows, Linux, iOS..." },
      { id: "net", icon: "🌐", title: "Infos Réseau", sub: "IP, MAC, hostname\nPorts ouverts, services\nVLAN (via Fortigate API)" },
      { id: "oui", icon: "🏭", title: "OUI / MAC Lookup", sub: "Base IEEE locale\nFabricant → type équipement\nEx: Apple → mobile/mac" },
      { id: "ldap", icon: "👤", title: "LDAP / AD", sub: "Hostname → utilisateur\nDomaine, OU, groupe\nPropriétaire de la machine" },
      { id: "snmp", icon: "📊", title: "SNMP", sub: "Pour switchs/routeurs\nInterface, vitesse, config\nCommunity string ro" },
    ],
  },
  {
    id: "orchestrate",
    label: "ORCHESTRATION",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.4)",
    nodes: [
      { id: "n8n", icon: "⚡", title: "n8n (Docker)", sub: "Workflow engine\nTriggers + logique métier\nRègles de classification" },
      { id: "ansible", icon: "🤖", title: "Ansible", sub: "Playbook d'inventaire\nDéploiement agents GLPI\nRemédiation auto" },
      { id: "fusion", icon: "📦", title: "GLPI Agent", sub: "(ex-FusionInventory)\nAgent sur les machines\nInventaire complet auto" },
    ],
  },
  {
    id: "glpi",
    label: "GLPI",
    color: "#fb923c",
    bg: "rgba(251,146,60,0.08)",
    border: "rgba(251,146,60,0.4)",
    nodes: [
      { id: "api", icon: "🔌", title: "REST API GLPI", sub: "Création / MAJ asset\nAffectation utilisateur\nLien domaine, réseau" },
      { id: "asset", icon: "🗄️", title: "Asset GLPI", sub: "Type auto-détecté\nTous les champs remplis\nHistorique des modifs" },
      { id: "notif", icon: "🔔", title: "Notifications", sub: "Alerte nouvel équipement\nEmail / Slack webhook\nTicket auto si inconnu" },
    ],
  },
];

const flows = [
  { from: "fg", to: "n8n", label: "webhook syslog" },
  { from: "arp", to: "n8n", label: "new MAC event" },
  { from: "nmap", to: "n8n", label: "scan results JSON" },
  { from: "n8n", to: "os", label: "" },
  { from: "n8n", to: "net", label: "" },
  { from: "n8n", to: "oui", label: "" },
  { from: "n8n", to: "ldap", label: "" },
  { from: "n8n", to: "snmp", label: "" },
  { from: "os", to: "api", label: "" },
  { from: "net", to: "api", label: "" },
  { from: "oui", to: "api", label: "" },
  { from: "ldap", to: "api", label: "" },
  { from: "snmp", to: "api", label: "" },
  { from: "ansible", to: "fusion", label: "déploie" },
  { from: "fusion", to: "api", label: "inventaire complet" },
  { from: "api", to: "asset", label: "" },
  { from: "api", to: "notif", label: "" },
];

const techStack = [
  { cat: "Détection", items: ["Fortigate Syslog/API", "arpwatch (Docker)", "nmap (Docker)", "netdisco (optionnel)"] },
  { cat: "Enrichissement", items: ["nmap -O (OS fingerprint)", "IEEE OUI database", "OpenLDAP / AD query", "SNMP v2/v3", "Fortigate REST API"] },
  { cat: "Orchestration", items: ["n8n self-hosted (Docker)", "Ansible + playbooks", "GLPI Agent (ex-FusionInventory)", "Redis (queue events)"] },
  { cat: "GLPI", items: ["GLPI 10.x (Docker)", "Plugin FusionInventory", "REST API /apirest.php", "Webhooks sortants"] },
  { cat: "Infrastructure", items: ["Docker Compose", "GitHub Actions CI/CD", "Nginx reverse proxy", "Watchtower (auto-update)"] },
];

export default function App() {
  const [active, setActive] = useState(null);
  const [tab, setTab] = useState("workflow");

  const allNodes = layers.flatMap(l => l.nodes.map(n => ({ ...n, layerColor: l.color })));
  const activeNode = allNodes.find(n => n.id === active);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0e1a",
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      color: "#e2e8f0",
      padding: "24px",
    }}>
      {/* Header */}
      <div style={{ marginBottom: "32px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
          <span style={{ fontSize: "22px" }}>🔧</span>
          <h1 style={{ margin: 0, fontSize: "18px", fontWeight: 700, letterSpacing: "0.05em", color: "#f8fafc" }}>
            GLPI NETWORK AUTOMATION
          </h1>
          <span style={{
            background: "rgba(0,212,255,0.15)", color: "#00d4ff",
            fontSize: "10px", padding: "2px 8px", borderRadius: "4px",
            border: "1px solid rgba(0,212,255,0.3)", letterSpacing: "0.1em"
          }}>WORKFLOW v1.0</span>
        </div>
        <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>
          Fortigate · Docker · Ansible · n8n · GLPI REST API
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "24px" }}>
        {[["workflow", "⚡ Workflow"], ["stack", "📦 Stack"], ["docker", "🐋 Docker Compose"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            background: tab === id ? "rgba(255,255,255,0.08)" : "transparent",
            border: `1px solid ${tab === id ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)"}`,
            color: tab === id ? "#f8fafc" : "#64748b",
            padding: "6px 16px", borderRadius: "6px", cursor: "pointer",
            fontSize: "12px", fontFamily: "inherit", letterSpacing: "0.03em",
            transition: "all 0.15s"
          }}>{label}</button>
        ))}
      </div>

      {tab === "workflow" && (
        <div>
          {/* Layers */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {layers.map((layer, li) => (
              <div key={layer.id}>
                {/* Arrow between layers */}
                {li > 0 && (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "28px", gap: "8px" }}>
                    <div style={{ width: "120px", height: "1px", background: "rgba(255,255,255,0.08)" }} />
                    <span style={{ color: "#334155", fontSize: "16px" }}>▼</span>
                    <div style={{ width: "120px", height: "1px", background: "rgba(255,255,255,0.08)" }} />
                  </div>
                )}
                <div style={{
                  background: layer.bg,
                  border: `1px solid ${layer.border}`,
                  borderRadius: "12px", padding: "16px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                    <div style={{ width: "3px", height: "16px", background: layer.color, borderRadius: "2px" }} />
                    <span style={{ fontSize: "11px", fontWeight: 700, color: layer.color, letterSpacing: "0.15em" }}>
                      {layer.label}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {layer.nodes.map(node => (
                      <div key={node.id}
                        onClick={() => setActive(active === node.id ? null : node.id)}
                        style={{
                          background: active === node.id ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)",
                          border: `1px solid ${active === node.id ? layer.color : "rgba(255,255,255,0.08)"}`,
                          borderRadius: "8px", padding: "12px 14px",
                          cursor: "pointer", minWidth: "160px", flex: "1",
                          transition: "all 0.15s",
                          boxShadow: active === node.id ? `0 0 12px ${layer.color}30` : "none",
                        }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                          <span style={{ fontSize: "16px" }}>{node.icon}</span>
                          <span style={{ fontSize: "13px", fontWeight: 600, color: "#f1f5f9" }}>{node.title}</span>
                        </div>
                        <div style={{ fontSize: "11px", color: "#64748b", lineHeight: "1.6", whiteSpace: "pre-line" }}>
                          {node.sub}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Flow summary */}
          <div style={{
            marginTop: "20px", background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "16px"
          }}>
            <div style={{ fontSize: "11px", color: "#475569", marginBottom: "10px", letterSpacing: "0.1em", fontWeight: 700 }}>
              FLUX DE DONNÉES
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {[
                ["Fortigate DHCP", "→", "n8n trigger", "#00d4ff"],
                ["arpwatch", "→", "n8n trigger", "#00d4ff"],
                ["nmap scan", "→", "n8n trigger", "#00d4ff"],
                ["n8n", "→", "enrichissement parallèle", "#a78bfa"],
                ["Ansible", "→", "déploie GLPI Agent", "#34d399"],
                ["GLPI Agent", "→", "inventaire complet", "#34d399"],
                ["tous enrichissements", "→", "GLPI REST API", "#fb923c"],
                ["GLPI API", "→", "asset + notification", "#fb923c"],
              ].map(([a, arrow, b, c], i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "6px", padding: "5px 10px", fontSize: "11px",
                  display: "flex", alignItems: "center", gap: "6px"
                }}>
                  <span style={{ color: c }}>{a}</span>
                  <span style={{ color: "#334155" }}>{arrow}</span>
                  <span style={{ color: "#94a3b8" }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "stack" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
          {techStack.map(({ cat, items }) => {
            const colors = { "Détection": "#00d4ff", "Enrichissement": "#a78bfa", "Orchestration": "#34d399", "GLPI": "#fb923c", "Infrastructure": "#f59e0b" };
            const c = colors[cat] || "#94a3b8";
            return (
              <div key={cat} style={{
                background: `rgba(255,255,255,0.02)`,
                border: `1px solid rgba(255,255,255,0.07)`,
                borderTop: `2px solid ${c}`,
                borderRadius: "8px", padding: "16px"
              }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: c, letterSpacing: "0.12em", marginBottom: "12px" }}>
                  {cat.toUpperCase()}
                </div>
                {items.map(item => (
                  <div key={item} style={{
                    fontSize: "12px", color: "#94a3b8", padding: "5px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    display: "flex", alignItems: "center", gap: "8px"
                  }}>
                    <span style={{ color: c, fontSize: "8px" }}>◆</span>
                    {item}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {tab === "docker" && (
        <div style={{
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "10px", padding: "20px", overflowX: "auto"
        }}>
          <div style={{ fontSize: "11px", color: "#34d399", letterSpacing: "0.1em", marginBottom: "14px", fontWeight: 700 }}>
            docker-compose.yml — Stack complète
          </div>
          <pre style={{
            margin: 0, fontSize: "11px", lineHeight: "1.7", color: "#94a3b8",
            whiteSpace: "pre-wrap", fontFamily: "inherit"
          }}>{`services:

  # ── GLPI ─────────────────────────────────
  glpi:
    image: diouxx/glpi
    restart: unless-stopped
    ports: ["80:80"]
    environment:
      TIMEZONE: Europe/Paris
    volumes:
      - glpi_data:/var/www/html/glpi
    depends_on: [mariadb]

  mariadb:
    image: mariadb:10.11
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: glpi
      MYSQL_USER: glpi
      MYSQL_PASSWORD: glpipass
    volumes:
      - db_data:/var/lib/mysql

  # ── ORCHESTRATION ────────────────────────
  n8n:
    image: n8nio/n8n
    restart: unless-stopped
    ports: ["5678:5678"]
    environment:
      N8N_BASIC_AUTH_ACTIVE: "true"
      N8N_BASIC_AUTH_USER: admin
      N8N_BASIC_AUTH_PASSWORD: changeme
      WEBHOOK_URL: http://n8n:5678
    volumes:
      - n8n_data:/home/node/.n8n

  # ── DÉTECTION ────────────────────────────
  arpwatch:
    image: ffeldhaus/arpwatch
    restart: unless-stopped
    network_mode: host          # accès direct au LAN
    cap_add: [NET_ADMIN, NET_RAW]
    environment:
      INTERFACE: eth0
      WEBHOOK_URL: http://n8n:5678/webhook/arpwatch

  nmap-scheduler:
    image: instrumentisto/nmap
    restart: unless-stopped
    entrypoint: /bin/sh
    command: >
      -c "while true; do
        nmap -sn -oJ /output/scan.json 192.168.1.0/24;
        curl -X POST http://n8n:5678/webhook/nmap
          -H 'Content-Type: application/json'
          -d @/output/scan.json;
        sleep 900;
      done"
    volumes:
      - nmap_output:/output

  # ── UTILITAIRES ──────────────────────────
  redis:
    image: redis:7-alpine
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    restart: unless-stopped
    ports: ["443:443"]
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./certs:/etc/nginx/certs

volumes:
  glpi_data:
  db_data:
  n8n_data:
  nmap_output:`}</pre>
        </div>
      )}
    </div>
  );
}
