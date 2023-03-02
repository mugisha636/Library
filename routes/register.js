const express =require ('express')
const registerCont=require('../controller/registerController')

const router=express.Router()

router.post('/create',registerCont)
router.get('/getAll',(req,res)=>{
    res.send('jjjjj') 
})


module.exports= router