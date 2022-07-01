const createUser=require("../Controller/Auth");


const express=require("express");

const router=express.Router();

router.post('/register',createUser.createUser);
router.post('/login',createUser.login);
router.post('/addUser',createUser.protect,createUser.addUser);
router.get('/alluser/:companyId',createUser.protect,createUser.getAllUser);
router.get('/verify',createUser.verify);

router.post('/uploadUser',createUser.protect,createUser.importUser);
router.patch('/alter/:id',createUser.protect,createUser.alterAdmin);
router.delete('/delete/:id',createUser.protect,createUser.deleteUser);
router.patch('/resetPassword/:id',createUser.protect,createUser.modifyPassword);
router.patch('/updateProfilePic/:id',createUser.protect,createUser.updateProfilePic)


module.exports=router;

