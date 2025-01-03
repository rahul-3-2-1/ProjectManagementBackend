const express=require("express");
const router=express.Router();
const Project=require("../Controller/Project");
// const updateProject=require("../Controller/Project");
const Auth=require("../Controller/Auth");
const Stages=require("../Controller/Stages");
const Notification=require('../Controller/Notification');

// console.log(addProject);
router.post('/add',Auth.protect,Project.addProject,Stages.addStages,Project.updateProject,Notification.addNotifications);


router.get('/getAllProjects/:userId',Auth.protect,Project.getProjects);
router.get('/singleProject/:projectId',Auth.protect,Project.getProjectById)
router.patch('/update/:projectId',Auth.protect,Stages.update,Project.update);
router.get('/getProjects/:companyId',Auth.protect,Project.getProjectByCompanyId);
router.patch('/updateProject/:id',Auth.protect,Stages.updateStages,Project.editProject);
router.delete('/deleteProject/:id',Auth.protect,Project.deleteProject);





module.exports=router;
