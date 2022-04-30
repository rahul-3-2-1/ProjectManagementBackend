const Request=require('../model/Request');
const Stages=require('../model/Stages');
const Project=require('../model/Project');

exports.newRequest=async(req,res)=>{
    try{

        const {requestedBy,projectId,stageId,progress,companyId}=req.body;
        const reques=new Request;
        reques.requestedBy=requestedBy;
        reques.projectId=projectId;
        reques.stageId=stageId;
        reques.progress=progress;
        reques.companyId=companyId;
        const dt=await reques.save();

        res.status(202).json({data:dt,status:"success"});
        
    }
    catch(err)
    {
        res.status(404).json({message:err.message,status:"error"});

    }
}


exports.updateRequest=async(req,res)=>{
    try{
    const {stageId,projectId,status,requestId}=req.body;

    const dt=await Request.findByIdAndUpdate({_id:requestId},{
        status:status
    });
    await Stages.findByIdAndUpdate({_id:stageId},{
        status:progress
    })

    const dtt=await Stages.find({projectId:projectId});

    const tot=0;
    const com=0;
    dtt.forEach(item=>{
        if(item.status==='C')
        com+=weight;
        tot+=weight;
    })

    let prog=Math.ceil(com/tot)*100;
    let stat;

    if(prog>0)
    stat='In Progress';
    else if(prog===100)
    stat="Completed";
    else
    {
        stat="Not Started";
    }

    const data=await Project.findByIdAndUpdate({_id:projectId},{
        progress:prog,
        status:stat

    })
    res.status(200).json({message:"Request Updated"});





    }
    catch(err)
    {
        res.status(400).json({message:err.message,status:"error"});
    }

    
}

exports.getRequestByCompanyId=async(req,res)=>{
    try{
    const companyId=req.params.companyId;
    const lim=req.query.limit;
    const dt=await Request.find({companyId:companyId}).sort({requestedAt:"-1"}).limit(lim);
        res.status(200).json({data:dt,status:"success"});


    }
    catch(err)
    {

        res.status(400).json({message:err.message,status:"error"});
    }

}

exports.getRequestByProjectId=async(req,res)=>{
    try{
    const companyId=req.params.companyId;
    const dt=await Request.find({companyId}).sort({requestedAt:"-1"});
    res.status(200).json({data:dt,status:"success"});
    }
    catch(err)
    {
        res.status(400).json({message:err.message,status:"error"});
    }
}