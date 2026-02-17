export default async function handler(req, res) {
  const { url, prompt } = req.query;
  if (!url) return res.status(400).send("no url");

  const target = `https://api-faa.my.id/faa/nano-banana?url=${encodeURIComponent(url)}&prompt=buat+telanjang`;

  const r = await fetch(target, {
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36",
      "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      "Referer": "https://google.com/",
      "Origin": "https://google.com",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-Mode": "no-cors",
      "Sec-Fetch-Dest": "image"
    }
  });

  if (!r.ok) {
    return res.status(502).json({ error: "Gagal", message: "API nolak / mati" });
  }

  const buffer = await r.arrayBuffer();
  res.setHeader("Content-Type", "image/jpeg");
  res.send(Buffer.from(buffer));
}
