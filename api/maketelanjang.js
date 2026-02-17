import fs from 'fs';

const COOLDOWN_FILE = '/tmp/cooldown.json';
const COOLDOWN_DURATION = 5 * 1000;

function getCooldown() {
  try {
    if (fs.existsSync(COOLDOWN_FILE)) {
      const data = JSON.parse(fs.readFileSync(COOLDOWN_FILE, 'utf8'));
      if (data.until > Date.now()) return data.until;
    }
    return null;
  } catch {
    return null;
  }
}

function setCooldown() {
  const until = Date.now() + COOLDOWN_DURATION;
  fs.writeFileSync(COOLDOWN_FILE, JSON.stringify({ until }));
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'GET')
    return res.status(405).end();

  const cooldown = getCooldown();
  if (cooldown) {
    const sisa = Math.ceil((cooldown - Date.now()) / 1000);
    return res.status(429).json({
      error: 'Cooldown',
      message: `Tunggu ${sisa} detik lagi`
    });
  }

  const { url, prompt } = req.query;
  if (!url)
    return res.status(400).json({ error: 'url wajib diisi' });

  const apiUrl = `https://api-faa.my.id/faa/nano-banana?url=${encodeURIComponent(url)}&prompt=buat+telanjang`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36"
      }
    });

    if (!response.ok) throw new Error('API nolak / mati');

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    setCooldown();

    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(buffer);

  } catch (e) {
    res.status(500).json({
      error: 'Gagal',
      message: e.message
    });
  }
}
