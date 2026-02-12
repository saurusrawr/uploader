export default async function handler(req, res) {
  const { prompt, apikey } = req.query;

  // wajib apikey
  if (!apikey) {
    return res.status(403).json({
      status: false,
      creator: "saurus",
      result: "error mungkin kamu belum sigma"
    });
  }

  // cek apikey benar
  if (apikey !== "saurusdev") {
    return res.status(403).json({
      status: false,
      creator: "saurus",
      result: "apikeymu salah wok"
    });
  }

  // wajib prompt
  if (!prompt) {
    return res.status(400).json({
      status: false,
      creator: "saurus",
      result: "error mungkin kamu belum sigma"
    });
  }

  try {
    const url = `https://alipai-api.vercel.app/ai/gemini?apikey=alipaiapikeybaru&prompt=${encodeURIComponent(prompt)}`;

    const r = await fetch(url);
    const data = await r.json();

    if (!data || !data.result) {
      throw new Error("bad response");
    }

    return res.status(200).json({
      status: true,
      creator: "saurus",
      result: data.result
    });

  } catch (e) {
    return res.status(500).json({
      status: false,
      creator: "saurus",
      result: "error mungkin kamu belum sigma"
    });
  }
}
