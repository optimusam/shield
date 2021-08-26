import {Router} from 'express'
import secured from '../lib/middleware/secured.js'
import models from '../models/index.js'
const router  = Router()

const mediaOutlets = [
    {
        name: "NDTV India",
        email: "sameergiri1997@gmail.com"
    },
    {
        name: "Alt News",
        email: "optimusam97@gmail.com"
    },
    {
        name: "The Wire",
        email: "sameergiri.py@gmail.com"
    },
    {
        name: "Zee News(dummy data)",
        email: "sameergiri1997@gmail.com"
    },
    {
        name: "India TV (dummy data)",
        email: "sameergiri1997@gmail.com"
    },
    {
        name: "Aaj Tak(dummy data)",
        email: "sameergiri1997@gmail.com"
    },
    {
        name: "ABP News(dummy data)",
        email: "sameergiri1997@gmail.com"
    }
]

router.get('/dashboard', secured(),  async (req, res) => {
    res.render('dashboard', { title: 'Dashboard', mediaOutlets: mediaOutlets, flash: req.flash('message') })
})

export default router