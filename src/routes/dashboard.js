import {Router} from 'express'
import secured from '../lib/middleware/secured'
import models from '../models'
const router  = Router()

router.get('/dashboard', secured(),  async (req, res) => {
    res.render('dashboard', { title: 'Dashboard' })
})

export default router