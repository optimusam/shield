// routes/index.js

import express from 'express'
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res) {
  req.session.returnTo = '/dashboard'
  res.render('index', { title: 'Shield Vault' })
})

export default router
