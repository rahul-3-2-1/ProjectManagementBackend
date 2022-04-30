const express=require("express");
const router=express.Router();
const Project=require("../Controller/Project");
// const updateProject=require("../Controller/Project");
const Auth=require("../Controller/Auth");
const Stages=require("../Controller/Stages");

// console.log(addProject);
router.post('/add',Auth.protect,Project.addProject,Stages.addStages,Project.updateProject);


router.get('/getAllProjects/:userId',Auth.protect,Project.getProjects);
router.get('/singleProject/:projectId',Auth.protect,Project.getProjectById)
router.patch('/update/:projectId',Auth.protect,Stages.update,Project.update);
router.get('/getProjects/:companyId',Auth.protect,Project.getProjectByCompanyId);




module.exports=router;
