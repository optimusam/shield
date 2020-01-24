import {Router} from 'express'
import models from '../models'
import secured from '../lib/middleware/secured'

const router = Router()

router.post('/createFile', secured(), async (req, res) => {
    console.log("here at file")
    const vaultname = req.body.vaultname
    const link = req.body.link
    const username = req.user.user_id
    try {
        await models.File.create({
            vaultname: vaultname, 
            link: link,
            username: username
        })
        res.json({ message: 'Vault Created!' })
    }
    catch (err) {
        res.json({ message: "Error" })
    }
})

// router.post('/createUser', )

export default router
