const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  urlCode: String,
  urlLonga: String,
  urlCurta: String,
  date: { type: String, default: Date.now }
});

module.exports = mongoose.model('Url', urlSchema);