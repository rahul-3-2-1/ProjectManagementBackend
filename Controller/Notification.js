const Notification=require('../model/Notification');

exports.addNotifications=async(req,res)=>{
    try{
        const {to,message}=req.body;

        const newNot=new Notification();
        const dt=[];
        for(id of to)
        {
            let temp={};
            
            temp.to=id;
            temp.message=message;
            temp.projectId=req?.projectId;
            dt.push(temp);

        }
        const data=await Notification.insertMany(dt);
        console.log(data);
        res.status(202).json({data:req.data});

    }
    catch(err)
    {
        res.status(err.statusCode||500).json({message:err.message||"Something went wrong",status:"error"});

    }

}