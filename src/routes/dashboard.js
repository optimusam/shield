import {Router} from 'express'
import secured from '../lib/middleware/secured.js'
import models from '../models/index.js'
const router  = Router()

const mediaOutlets = [
    {
        name: "NDTV India",
        email: "legal@ndtv.com"
    },
    {
        name: "Alt News",
        email: "contact@altnews.in"
    },
    {
        name: "The Wire",
        email: "editorial@thewire.in"
    },
    {
        name: "Zee News",
        email: "inews@zeemedia.esselgroup.com "
    },
    {
        name: "India TV",
        email: "mail@indiatvnews.com"
    },
    {
        name: "Aaj Tak",
        email: "info@aajtak.com"
    },
    {
        name: "ABP News",
        email: "kishanr@abpnews.in"
    }
]

router.get('/dashboard', secured(),  async (req, res) => {
    res.render('dashboard', { title: 'Dashboard', mediaOutlets: mediaOutlets, flash: req.flash('message') })
})

export default router