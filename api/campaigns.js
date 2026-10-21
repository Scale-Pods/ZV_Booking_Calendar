process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const N8N_URL = process.env.VITE_ROLE_URL || 'https://n8n.srv1010832.hstgr.cloud/webhook/ab8d28de-afb7-416f-aaf1-454949b27c18?action=Campaigns';

export default async function handler(req, res) {
  try {
    const response = await fetch(N8N_URL);
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(502).json({ error: 'Failed to fetch campaigns: ' + (e?.message || e) });
  }
}
