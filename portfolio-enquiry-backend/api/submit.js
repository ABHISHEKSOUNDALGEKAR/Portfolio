// api/submit.js
function allowOrigin(req, res) {
  const allowed = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim())
    : [];
  const fallback = 'https://abhisheksoundalgekar.github.io';
  const origin = req.headers.origin || fallback;
  const match = allowed.length ? allowed.includes(origin) : origin === fallback;

  res.setHeader('Access-Control-Allow-Origin', match ? origin : fallback);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = async (req, res) => {
  allowOrigin(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  try {
    const { name, email, phone, message, website } = req.body || {};
    if (website) return res.status(200).json({ ok: true }); // honeypot

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }

    const clean = s => String(s || '').replace(/\r/g, '').trim();
    const now = new Date();
    const ts = now.toISOString().replace(/[:.]/g, '-');
    const slug = clean(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'anon';
    const filename = `user-responses/${ts}--${slug}.txt`;

    const bodyText =
`Name: ${clean(name)}
Email: ${clean(email)}
Phone: ${clean(phone)}
When: ${now.toISOString()}

Message:
${clean(message).slice(0, 10000)}
`;
    const content = Buffer.from(bodyText, 'utf8').toString('base64');

    const repo = process.env.GITHUB_REPO;       // e.g. "ABHISHEKSOUNDALGEKAR/Portfolio"
    const branch = process.env.TARGET_BRANCH || 'main';
    const token = process.env.GITHUB_TOKEN;

    if (!repo || !token) return res.status(500).json({ ok: false, error: 'Server not configured' });

    const gh = await fetch(`https://api.github.com/repos/${repo}/contents/${encodeURIComponent(filename)}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'portfolio-enquiry'
      },
      body: JSON.stringify({
        message: `chore(inbox): add enquiry ${filename}`,
        content,
        branch
      })
    });

    if (!gh.ok) return res.status(500).json({ ok: false, error: await gh.text() });
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || 'error' });
  }
};
