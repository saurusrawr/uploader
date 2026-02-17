import axios from "axios"

export async function handler(req, res) {
  const query =
    req.method === "GET"
      ? req.query.query
      : req.body?.query

  if (!query || typeof query !== "string") {
    return res.status(400).json({
      status: false,
      error: "Query parameter is required",
    })
  }

  try {
    const responseSearch = await axios.post(
      "https://www.muslimai.io/api/search",
      { query },
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36",
          "Referer": "https://www.muslimai.io/",
        },
        timeout: 30000,
      }
    )

    const content = responseSearch.data?.[0]?.content
    if (!content) {
      return res.status(404).json({
        status: false,
        error: "No data found",
      })
    }

    const prompt = `Use the following passages to answer the query in Indonesian:\n\n${query}\n\n${content}`

    const responseAnswer = await axios.post(
      "https://www.muslimai.io/api/answer",
      { prompt },
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36",
          "Referer": "https://www.muslimai.io/",
        },
        timeout: 30000,
      }
    )

    return res.status(200).json({
      status: true,
      data: responseAnswer.data,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    return res.status(500).json({
      status: false,
      error: err.message || "API error",
    })
  }
}
