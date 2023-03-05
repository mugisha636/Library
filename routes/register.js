const express =require ('express')
const register=require('../controller/registerController');
const AuthValidation = require('../validators/authValidation');





const router=express.Router()

router.post('/create',AuthValidation.verifySignup, register.registerUser )
router.post('/login',register.login)

router.get('/users', register.getUsers)
router.get('/users/:userId', register.oneUser)
router.delete('/users/:userId', register.deleteUser)
router.put('/users/:userId', register.updateUser)




module.exports= router