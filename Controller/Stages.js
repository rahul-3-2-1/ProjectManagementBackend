const Stages=require("../model/Stages");

exports.addStages=async (req,res,next)=>{
    const {stages}=req.body;
    console.log(stages.length);
    try{
    let stagesId=[];
    
    for(let i=0;i<stages.length;i++)
    {
        const {title,startDate,endDate,description,weight}=stages[i];
        const stg=new Stages;
        stg.title=title;
        stg.weight=weight;
        stg.startDate=new Date(startDate);
        stg.endDate=new Date(endDate);
        stg.description=description;
        stg.projectId=req.projectId;
        const dt =await stg.save();
        stagesId.push(dt._id);
    }
    console.log(stagesId.length);
    req.stagesId=stagesId;
    next();
}
catch(err)
{
    console.log(err);
    res.status(400).json({"message":err.message});
}
}


exports.update=async(req,res,next)=>{
    let id=req.params.projectId;
    const {stagesData}=req.body;

    try{
        let stagesId=[];
        console.log(stagesData);
        for(const [key,value] of  Object.entries(stagesData))
        {
            if(key=="new")
            {
                const {title,startDate,endDate,description,weight}=value;
            const stg=new Stages;
            stg.title=title;
            stg.weight=weight;
            stg.startDate=new Date(startDate);
            stg.endDate=new Date(endDate);
            stg.description=description;
            stg.projectId=id;
            const dt =await stg.save();
            stagesId.push(dt._id);

            }
            else
            {
                const dt=await Stages.findByIdAndUpdate({_id:key},{
                    ...value
                })
            }
        // console.log(key);
            
        }
        // console.log(stagesId.length);
        req.stagesId=stagesId;
        next();
    }
    catch(err)
    {
        console.log(err);
        res.status(400).json({"message":err.message});
    }

}