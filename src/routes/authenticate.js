import {Router} from 'express'
import models from '../models'
import {Op} from 'sequelize'


const router = Router()

router.post('/register', async (req, res) => {
    const uname = req.body.username
    const pwd = req.body.password
    const user = await models.User.findOne({
        where: {
            username:{
                [Op.like]: uname
            }
        }
    })
    console.log(user.username)
    if(!user.username) {
        try {
            await models.User.create({
                username: uname,
                password: pwd
            })
            res.json({ message: 'registered successfully' })
        }
        catch (e) {
            res.json({ message: 'unable to register' })
        }
    }
    
    res.json({message: 'username already taken. Enter different username'})
})

export default router