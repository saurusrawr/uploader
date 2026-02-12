export default async function handler(req, res) {
  const { text, apikey } = req.query;

  if (!apikey || apikey !== "saurusdev") {
    return res.status(403).json({
      status: false,
      creator: "saurus",
      result: "apikeymu salah wok"
    });
  }

  if (!text) {
    return res.status(400).json({
      status: false,
      creator: "saurus",
      result: "Masukkan teks untuk gambar"
    });
  }

  try {
    // encode text ke URL
    const encodedText = encodeURIComponent(text);

    // template image statis, bisa diganti sesuka hati
    const templateUrl = "https://raw.githubusercontent.com/alifalfarel25-commits/dat4/main/uploads/alip-clutch-1770001033541.jpg";

    // buat URL PNG overlay via placeholder SVG
    const imageUrl = `https://dummyimage.com/800x400/000/fff.png&text=${encodedText}`;

    return res.status(200).json({
      status: true,
      creator: "saurus",
      result: imageUrl
    });

  } catch (e) {
    return res.status(500).json({
      status: false,
      creator: "saurus",
      result: "Terjadi error saat generate gambar"
    });
  }
}
