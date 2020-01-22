import models from '../models'

import {Router} from 'express'

const router = Router()

router.get('/', async (req, res) => {
    const users = await models.User.findAll({
        attributes: ['username']
    })
    res.json(users)
})

export default router