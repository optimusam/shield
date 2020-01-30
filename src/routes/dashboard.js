import {Router} from 'express'
import secured from '../lib/middleware/secured'
import models from '../models'
const router  = Router()

router.get('/dashboard', secured(),  async (req, res) => {

    const files = await models.File.findAll({
        where: {
            userId: req.user.userId
        },
        include: [models.FileQueue]
    })
    
    res.render('dashboard', {
        title: 'Dashboard',
        files: files
    })
})

export default router