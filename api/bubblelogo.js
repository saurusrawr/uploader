export default async function handler(req, res) {
  var text = req.query.text;
  var apikey = req.query.apikey;

  if (!apikey || apikey !== "saurusdev") {
    return res.status(403).json({ status: false, creator: "saurus", result: "apikeymu salah wok" });
  }

  if (!text) {
    return res.status(400).json({ status: false, creator: "saurus", result: "Masukkan teks" });
  }

  var svgContent = `<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="400" rx="30" fill="#ff69b4" opacity="0.9"/>
    <text x="400" y="230" font-family="Arial Black, sans-serif" font-size="72" font-weight="900" 
          fill="#000" text-anchor="middle" stroke="#ff1493" stroke-width="4" stroke-linejoin="round" dy=".3em">${text}</text>
  </svg>`;

  // Langsung response SVG sebagai image (browser render otomatis)
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).send(svgContent);
}
