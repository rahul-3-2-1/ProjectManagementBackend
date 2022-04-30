const express=require("express");
const router=express.Router();
const Auth=require("../Controller/Auth");
const Request=require("../Controller/Request")

router.post('/newRequest',Auth.protect,Request.newRequest);
router.patch('/update',Auth.protect,Request.updateRequest);
router.get('/allRequest',Auth.protect,Request.getRequestByCompanyId);