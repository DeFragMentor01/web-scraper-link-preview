const PORT = 8000
const express = require("express")
const axios = require("axios")
const cheerio = require("cheerio")
const cors = require("cors")

const app = express()

app.use(cors())

const url = "https://www.skysports.com/"

app.get('/', (req, res) => {
    res.json('This is the webscraper')
})

app.get('/results', (req, res) => {
  axios(url)
    .then((response) => {
      const html = response.data
      const $ = cheerio.load(html)
      const articles = []

      $('meta[property="og:url"]', html).each(() => {
        const title = $('meta[property="og:title"]').attr("content")
        const url = $('meta[property="og:url"]').attr("content")
        const description = $('meta[property="og:description"]').attr("content")
        const image = $('meta[property="og:image"]').attr("content")
        articles.push({
          title,
          url,
          description,
          image,
        })
      })
      res.json(articles)
    })
    .catch((err) => {
      console.log("We could not find the site you were looking for.")
    })
})

app.listen(PORT);
