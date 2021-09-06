const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../model/Url');

router.post('/shorten', async (req, res) => {
  const { urlLonga } = req.body;
  const baseUrl = config.get('baseUrl');

  // Checa se a base URL é válida
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('URL inválida');
  }

  // Cria a url code
  const urlCode = shortid.generate();

  // Check a url
  if (validUrl.isUri(urlLonga)) {
    try {
      let url = await Url.findOne({ urlLoga });

      if (url) {
        res.json(url);
      } else {
        const urlCurta = baseUrl + '/' + urlCode;

        url = new Url({
          urlLonga,
          urlCurta,
          urlCode,
          date: new Date()
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  }
});

module.exports = router;
