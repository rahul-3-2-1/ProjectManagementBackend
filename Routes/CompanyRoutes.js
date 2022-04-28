const createCompany=require("../Controller/RegisterCompany");
const createUser=require("../Controller/Auth");

const router=require("express").Router();
console.log(createCompany);
router.post('/registerCompany',createUser.protect,createCompany.createCompany,createUser.updateUserCompany);


module.exports=router;