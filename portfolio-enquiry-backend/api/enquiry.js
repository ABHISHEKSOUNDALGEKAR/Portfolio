// api/enquiry.js  (Vercel Node.js Serverless Function - CommonJS)
const ALLOWED_ORIGINS = [
  "https://abhisheksoundalgekar.github.io",  // your GitHub Pages site
  "http://localhost:5173"                     // dev preview (optional)
];

function setCors(res, origin) {
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    // default to your GitHub Pages origin
    res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGINS[0]);
  }
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  try { return JSON.parse(raw); } catch { return {}; }
}

module.exports = async (req, res) => {
  const origin = req.headers.origin;
  setCors(res, origin);

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const OWNER  = process.env.OWNER;           // e.g. ABHISHEKSOUNDALGEKAR
  const REPO   = process.env.REPO;            // e.g. Portfolio
  const TOKEN  = process.env.GITHUB_TOKEN;    // classic token with repo scope
  const BRANCH = process.env.BRANCH || "main";

  if (!OWNER || !REPO || !TOKEN) {
    return res.status(500).json({ error: "Missing GitHub env vars (OWNER, REPO, GITHUB_TOKEN)" });
  }

  try {
    const body = await readJsonBody(req);
    const { name = "", email = "", phone = "", message = "", trap = "" } = body;

    // Honeypot (bots fill hidden field)
    if (trap) return res.status(200).json({ ok: true });

    // Basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      return res.status(400).json({ error: "name, email, and message are required" });
    }
    if (message.length > 10000) {
      return res.status(400).json({ error: "message too long (10,000 char max)" });
    }

    const ua = req.headers["user-agent"] || "";
    const ip = (req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "").toString();

    const now = new Date();
    const ts  = now.toISOString().replace(/[:.]/g, "-");
    const safeName = name.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "") || "anon";

    const filePath = `user-responses/${ts}-${safeName}.md`;
    const md = [
      "---",
      `name: "${name.replace(/"/g, '\\"')}"`,
      `email: "${email.replace(/"/g, '\\"')}"`,
      `phone: "${(phone || "").replace(/"/g, '\\"')}"`,
      `date: "${now.toISOString()}"`,
      `ip: "${ip.replace(/"/g, '\\"')}"`,
      `userAgent: "${ua.replace(/"/g, '\\"')}"`,
      "---",
      "",
      message
    ].join("\n");

    const content = Buffer.from(md, "utf8").toString("base64");

    const ghRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(filePath)}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: `chore(enquiry): ${name} <${email}>`,
        content,
        branch: BRANCH
      })
    });
    const ALLOWED_ORIGINS = [
  "https://abhisheksoundalgekar.github.io",
  "http://localhost:5173",
  "https://portfolio-enquiry-backend-8othqmz13.vercel.app" // add this
];

    const data = await ghRes.json();
    if (!ghRes.ok) {
      return res.status(500).json({ error: "GitHub write failed", details: data });
    }

    return res.status(201).json({
      ok: true,
      path: filePath,
      url: data.content?.html_url || null
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
