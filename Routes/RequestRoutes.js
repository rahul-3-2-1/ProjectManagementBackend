const express=require("express");
const router=express.Router();
const Auth=require("../Controller/Auth");
const Request=require("../Controller/Request");
const { route } = require("./User");

router.post('/newRequest',Auth.protect,Request.newRequest);
router.patch('/update',Auth.protect,Request.updateRequest);
router.get('/allRequest/:companyId',Auth.protect,Request.getRequestByCompanyId);

router.get('/getRequest/:projectId',Auth.protect,Request.getRequestByProjectId);
router.get('/getRequestMadeByUser/:userId',Auth.protect,Request.getRequestMadeByUser);

router.get('/getRequestMade/:id',Auth.protect,Request.getRequestMadePerDay);

module.exports=router;