// routes/users.js

import express from 'express'
import secured from '../lib/middleware/secured.js'
var router = express.Router()

/* GET user profile. */
router.get('/user', secured(), function(req, res, next) {
  const { _raw, _json, ...userProfile } = req.user
  res.render('user', {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: 'Profile page'
  })
})

export default router