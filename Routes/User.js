const createUser=require("../Controller/Auth");


const express=require("express");
const router=express.Router();

router.post('/register',createUser.createUser);
router.get('/login',createUser.login);
router.get('/alluser/:companyId',createUser.protect,createUser.getAllUser);



module.exports=router;

