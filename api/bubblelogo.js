export default function handler(req, res) {
  var text = req.query.text;
  var apikey = req.query.apikey;

  if (!apikey || apikey !== "saurusdev") {
    return res.status(403).json({ status: false, creator: "saurus", result: "apikeymu salah wok" });
  }

  if (!text) {
    return res.status(400).json({ status: false, creator: "saurus", result: "Masukkan teks untuk gambar" });
  }

  var encodedText = encodeURIComponent(text);
  var imageUrl = "https://dummyimage.com/800x400/ff69b4/000.png&font=kelvinch&text=" + encodedText;

  return res.status(200).json({
    status: true,
    creator: "saurus",
    result: imageUrl
  });
}
