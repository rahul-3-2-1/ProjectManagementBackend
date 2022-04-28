const Company=require("../model/Company");


exports.createCompany=async(req,res,next)=>{

    const {name,users}=req.body;
    console.log(name)
    try{
    if(!name||!users)
    {
        return res.status(400).json({message:"All Fields are mandatory"});

    }
    const company=new Company;
    company.name=name;
    company.users=users;
    company.currentUsers=1;
    company.owners=req.body.owners;
    console.log(req.owner);
    const dt=await company.save();
    // console.log(dt);
    req.companyId=dt._id;
    req.userId=req.body.owners[0],
    req.isAdmin=true;
    next();
    // res.status(202).json({data:dt});
   
}
catch(err)
{
    res.status(401).json({message:err.message});
}
    // next();
}