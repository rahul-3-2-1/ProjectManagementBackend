const Project=require("../model/Project");
const Stages=require('../model/Stages');


exports.addProject=async(req,res,next)=>{

    try{
        const {title,startDate,endDate,description,members,companyId,category}=req.body;
        if(!title||!startDate||!endDate||!members.length)
        {
            res.status(400).json({message:"Some fields are empty"});
        }
        req.body.to=members;
        req.body.message="you are added in the project";
        const proj=new Project;
        proj.title=title;
        proj.startDate=new Date(startDate);
        proj.endDate=new Date(endDate);
        proj.description=description||"";
        proj.members=members;
        proj.category=category;
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

exports.updateProject=async(req,res,next)=>{
    const stagesId=req.stagesId;
    console.log(stagesId);
    try{
    const dt=await Project.findByIdAndUpdate({_id:req.projectId},{
        stages:stagesId
    })
    req.data=dt;
    next();
    
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
        let data;
        console.log(req.query);
        if(req.query.members=='true')
        data=await Project.find({companyId:req.params.companyId}).populate('members');
        else
        data=await Project.find({companyId:req.params.companyId});
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

exports.editProject=async(req,res)=>{
    try{
        const {title,startDate,endDate,description,members,companyId,category}=req.body;
        const data= await Project.findByIdAndUpdate({_id:req.params.id},{title,startDate:new Date(startDate),endDate:new Date(endDate),description,members,category,stages:req.stagesId})
        const dtt=await Stages.find({projectId:req.params.id});

    let tot=0;
   let com=0;
    dtt.forEach(item=>{
        if(item.status==='C')
        com+=item?.weight;
        tot+=item?.weight;
    })

    let prog=Math.ceil((com/tot)*100);
    let stat;

    if(prog>0&&prog<100)
    stat='In Progress';
    else if(prog===100)
    stat="Completed";
    else
    {
        stat="Not Started";
    }

    await Project.findByIdAndUpdate({_id:req.params.id},{
        progress:prog,
        status:stat

    })
        res.status(202).json({data,status:"success"});
    }
    catch(err)
    {
        console.log(err);
        res.status(err.statusCode||500).json({status:"error",message:err.mesage||"Something went wrong"});
    }

}

exports.deleteProject=async(req,res,next)=>{
    try{
        const dt=await Project.findByIdAndDelete({_id:req.params.id});
        res.status(200).json({status:"success"});

    }
    catch(err)
    {
        res.status(err.statusCode||500).json({status:"error",message:err.mesage||"Something went wrong"});
    }
}