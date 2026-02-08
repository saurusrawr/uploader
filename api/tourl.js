import fetch from "node-fetch";

export default async function handler(req, res) {
  if(req.method !== "POST") return res.status(405).json({ status:false, message:"Method tidak diizinkan" });

  try {
    const { file } = req.body;
    if(!file) return res.json({ status:false, message:"Tidak ada file dikirim" });

    // TOKEN langsung di file (jangan share publik)
    const GITHUB_TOKEN = "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"; 
    const GITHUB_REPO = "username/saurusrawr.github.io"; // ganti username/repo-mu
    const fileName = `${Date.now()}.png`;

    const r = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${fileName}`, {
      method: "PUT",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "Upload via Vercel",
        content: file.split(",")[1] // hapus "data:image/png;base64,"
      })
    });

    const j = await r.json();

    if(j.content && j.content.download_url){
      return res.json({ status:true, url:j.content.download_url });
    } else {
      return res.json({ status:false, message:"Gagal bre, mungkin kamu belum sigma" });
    }
  } catch(e){
    return res.json({ status:false, message:"Gagal bre, mungkin kamu belum sigma" });
  }
    }
