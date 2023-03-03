const express =require ('express')
const register=require('../controller/registerController');





const router=express.Router()

router.post('/create',register.registerUser)
router.get('/users', register.getUsers)
router.get('/users/:userId', register.oneUser)
router.delete('/users/:userId', register.deleteUser)



module.exports= router