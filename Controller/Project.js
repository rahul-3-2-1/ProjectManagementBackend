const Project=require("../model/Project");


exports.addProject=async(req,res,next)=>{

    try{
        const {title,startDate,endDate,discription,members,companyId}=req.body;
        if(!title||!startDate||!endDate||!members.length)
        {
            res.status(400).json({message:"Some fields are empty"});
        }

        const proj=new Project;
        proj.title=title;
        proj.startDate=new Date(startDate);
        proj.endDate=new Date(endDate);
        proj.description=discription||"";
        proj.members=members;
        proj.companyId=companyId;

        const dt=await proj.save();

        req.projectId=dt._id;
        next();



    }
    catch(err)
    {
        res.status(404).json({"message":err.message});
    }



}

exports.updateProject=async(req,res)=>{
    const stagesId=req.stagesId;
    console.log(stagesId);
    try{
    const dt=await Project.findByIdAndUpdate({_id:req.projectId},{
        stages:stagesId
    })

    res.status(202).json({data:dt});
    }
    catch(err)
    {
        console.log(err);
        res.status(400).json({error:err.message});

    }
}


exports.getProjects=async(req,res)=>{

    try{
        
    const data=await Project.find({comapnyId:req.comapnyId}).where('members').in([req.params.userId]);
        res.status(200).json({data:data});

    }
    catch(err)
    {
        res.status(400).json({message:err.message});
    }
}

exports.getProjectByCompanyId=async(req,res)=>{
    try{
        const data=await Project.find({companyId:req.params.companyId}).populate('members');
        res.status(200).json({data,status:"success"});

    }
    catch(err)
    {   
        res.status(400).json({message:err.message,status:"error"});

    }
}
exports.update=async(req,res)=>{
    try{


        console.log(req.stagesId.length);
        const dt=await Project.findByIdAndUpdate({_id:req.params.projectId},{
            ...req.body,
            $addToSet:{stages:req.stagesId}
            

        })
        
        res.status(200).json({data:dt});

    }
    catch(err)
    {
        res.status(400).json({status:"error",message:err.message});
    }
}

exports.getProjectById=async(req,res)=>{
    try{
        const dt=await Project.findById({_id:req.params.projectId}).populate("members stages");
        res.status(200).json({data:dt});

    }
    catch(err)
    {
        res.status(400).json({message:err.message});
    }
}