import { Router } from 'express'
import secured from '../lib/middleware/secured'
import models from '../models'
const router = Router()

router.get('/vault', secured(), async (req, res) => {

    const files = await models.File.findAll({
        where: {
            userId: req.user.userId
        },
        include: [models.FileQueue]
    })

    res.render('vault', {
        title: 'My Vaults',
        files: files
    })
})

export default router