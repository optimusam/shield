// routes/index.js

var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res) {
  req.session.returnTo = '/dashboard'
  res.render('index', { title: 'Shield Vault' })
})

module.exports = router