export default async function handler(req, res) {
  try {
    let { text, apikey } = req.query

    if (!apikey) {
      return res.status(403).json({
        status: false,
        creator: "saurus",
        result: "no apikey"
      })
    }

    if (apikey !== "saurusdev") {
      return res.status(403).json({
        status: false,
        creator: "saurus",
        result: "apikey salah"
      })
    }

    if (!text) {
      return res.status(400).json({
        status: false,
        creator: "saurus",
        result: "no text"
      })
    }

    let axios = require("axios")
    let { createCanvas, loadImage } = require("canvas")

    let imgUrl = "https://raw.githubusercontent.com/alifalfarel25-commits/dat4/main/uploads/alip-clutch-1770001033541.jpg"

    let response = await axios.get(imgUrl, { responseType: "arraybuffer" })
    let buffer = Buffer.from(response.data)

    let img = await loadImage(buffer)
    let canvas = createCanvas(img.width, img.height)
    let ctx = canvas.getContext("2d")

    ctx.drawImage(img, 0, 0, img.width, img.height)

    let areaX = img.width * 0.56
    let areaY = img.height * 0.28
    let areaWidth = img.width * 0.36
    let areaHeight = img.height * 0.32

    let fontSize = img.height * 0.11
    ctx.font = `${fontSize}px Arial`
    ctx.fillStyle = "#000"
    ctx.textAlign = "left"
    ctx.textBaseline = "top"

    let words = text.split(" ")
    let lines = []
    let line = ""

    for (let word of words) {
      let testLine = line ? `${line} ${word}` : word
      let testWidth = ctx.measureText(testLine).width

      if (testWidth > areaWidth && line) {
        lines.push(line)
        line = word
      } else {
        line = testLine
      }
    }
    if (line) lines.push(line)

    while (lines.length * fontSize * 1.25 > areaHeight) {
      fontSize -= 2
      ctx.font = `${fontSize}px Arial`

      let tmpLines = []
      let tmpLine = ""
      for (let word of words) {
        let testLine = tmpLine ? `${tmpLine} ${word}` : word
        let testWidth = ctx.measureText(testLine).width

        if (testWidth > areaWidth && tmpLine) {
          tmpLines.push(tmpLine)
          tmpLine = word
        } else {
          tmpLine = testLine
        }
      }
      if (tmpLine) tmpLines.push(tmpLine)
      lines = tmpLines
    }

    let lineHeight = fontSize * 1.25

    ctx.shadowColor = "rgba(0,0,0,0.22)"
    ctx.shadowBlur = 2
    ctx.shadowOffsetX = 1
    ctx.shadowOffsetY = 1
    ctx.globalAlpha = 0.95

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], areaX, areaY + i * lineHeight)
    }

    ctx.globalAlpha = 1

    let out = canvas.toBuffer("image/png")

    res.setHeader("Content-Type", "image/png")
    res.send(out)

  } catch (e) {
    res.status(500).json({
      status: false,
      creator: "saurus",
      result: e.message
    })
  }
}
