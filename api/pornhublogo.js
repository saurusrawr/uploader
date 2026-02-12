export default async function handler(req, res) {
  if (!req.query.apikey) {
    return res.status(403).json({
      status: false,
      creator: "saurus",
      result: "error mungkin kamu belum sigma"
    })
  }

  if (req.query.apikey !== "saurusdev") {
    return res.status(403).json({
      status: false,
      creator: "saurus",
      result: "apikeymu salah wok"
    })
  }

  if (!req.query.text1 || !req.query.text2) {
    return res.status(400).json({
      status: false,
      creator: "saurus",
      result: "teksnya mana jir"
    })
  }

  try {
    let axios = require("axios")
    let cheerio = require("cheerio")
    let FormData = require("form-data")

    let url = "https://en.ephoto360.com/create-pornhub-style-logos-online-free-549.html"

    let page = await axios.get(url, {
      headers: { "user-agent": "Mozilla/5.0" }
    })

    let $ = cheerio.load(page.data)
    let token = $("input[name=token]").val()
    let build_server = $("input[name=build_server]").val()
    let build_server_id = $("input[name=build_server_id]").val()

    let form = new FormData()
    form.append("text[]", req.query.text1)
    form.append("text[]", req.query.text2)
    form.append("token", token)
    form.append("build_server", build_server)
    form.append("build_server_id", build_server_id)

    let submit = await axios.post(url, form, {
      headers: {
        ...form.getHeaders(),
        cookie: page.headers["set-cookie"].join("; "),
        "user-agent": "Mozilla/5.0"
      }
    })

    let $$ = cheerio.load(submit.data)
    let json = JSON.parse($$("input[name=form_value_input]").val())

    let result = await axios.post(
      "https://en.ephoto360.com/effect/create-image",
      new URLSearchParams(json),
      {
        headers: {
          cookie: page.headers["set-cookie"].join("; "),
          "user-agent": "Mozilla/5.0"
        }
      }
    )

    return res.status(200).json({
      status: true,
      creator: "saurus",
      result: build_server + result.data.image
    })

  } catch (e) {
    return res.status(500).json({
      status: false,
      creator: "saurus",
      result: "error mungkin kamu belum sigma"
    })
  }
      }
