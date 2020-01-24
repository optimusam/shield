import {Router} from 'express'
import secured from '../lib/middleware/secured'
import models from '../models'
const router  = Router()

router.get('/dashboard', secured(),  async (req, res) => {
    const user_id = req.user.user_id
    const userInDB = await models.User.findOne({
        where: { username: user_id }
    })
    
    if (!userInDB) {
        try {
            await models.User.create({
                name: req.user.displayName,
                picture: req.user.picture,
                username: req.user.user_id,
                lastLogin: new Date()
            })
        }
        catch(err) {
            console.error('could not fetch current user')
        }
    }
    else {
        try {
            await userInDB.update({ lastLogin: new Date() })
        }
        catch (err) {
            console.error('could not update last login')
        }
    }
    
    res.render('dashboard', {
        title: 'Dashboard',
    })
})

export default router