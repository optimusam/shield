import {Router} from 'express'
import models from '../models'
import secured from '../lib/middleware/secured'

const router = Router()

router.post('/file', secured(), async (req, res) => {
    const vaultname = req.body.vaultname
    const link = req.body.link
    const emailTo  = req.body.emailTo
    try {
        await models.File.create({
            vaultname: vaultname, 
            link: link,
            userId: req.user.userId,
            emailTo: emailTo
        })
        req.flash('message', 'Vault Created')
        res.redirect('/dashboard')
    }
    catch (err) {
        res.json({ message: "Error" })
    }
})

router.delete('/file/:id', secured(), async(req, res) => {
    const vaultId = req.params.id
    try {
        await models.File.destroy({
            where: {
                id: vaultId,
                userId: req.user.userId
            }
        })
        res.json({message: 'Deleted successfully'})
    }
    catch(err) {
        res.json({message: err.message})
    }
})

export default router
