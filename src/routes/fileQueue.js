import { Router } from 'express'
import models from '../models/index.js'
import secured from '../lib/middleware/secured.js'

const router = Router()

router.post('/queue/:id', secured(), async (req, res) => {
    const vaultId = req.params.id
    let sendAt = new Date()
    sendAt.setDate(sendAt.getDate() + 7)

    try {
        await models.FileQueue.create({
            sendAt: sendAt,
            userId: req.user.userId,
            fileId: vaultId
        })
        res.json({message: 'File Enqueued.'})
    }
    catch (err) {
        res.json({message: 'Unable to Enqueue the file to be sent.'})
    }
})

router.delete('/queue/:id', secured(), async(req, res) => {
    const vaultId = req.params.id
    try {
        await models.FileQueue.destroy({
            where: {
                fileId: vaultId,
                userId: req.user.userId
            }
        })
        res.json({message: 'Unqueued successfully'})
    }
    catch (err) {
        res.json({err: 'Unable to Unqueue'})
    }
})

export default router