import {Router} from 'express'
import models from '../models/index.js'
import secured from '../lib/middleware/secured.js'

const router = Router()

router.post('/file', secured(), async (req, res) => {
    const vaultname = req.body.vaultname
    const link = req.body.link
    const emailTo  = req.body.emailTo
    try {
        if(emailTo.length != 3) {
            throw new Error("Please select 3 media houses");
        }
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
        req.flash('message', err.message)
        res.redirect('/dashboard')
        // res.json({ message: "Error ->" + err })
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
