const User=require("../model/admin");

const jwt=require("jsonwebtoken");


exports.createUser=async(req,res)=>{
    try
    {
        const {email,password,isAdmin}=req.body;
        
        if(!email||!password)
        {
            return res.status(400).json({"message":"All Fields Are mandatory"});
        }
        let user=await User.findOne({email:email});
        if(user)
        {
            return res.status(400).json({"message":"User alreasy exist"});
        }

        user=new User;
        user.email=email;
        user.password=password;
        user.isAdmin=isAdmin;
        user.signUpDate=Date.now();
        // user.companyId=req.companyId;

        

        console.log(process.env.SECRET_KEY);
       
        
        await user.save();
        const payload=user.tokenPayload();
       const token= jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:eval(process.env.EXPIRES_IN)});


        return res.status(201).cookie('token',token,{
            expiresIn:eval(process.env.EXPIRES_IN),
            httpOnly:true,
            sameSite:"none"
        }).json({data:payload,token:token,expiresIn:eval(process.env.EXPIRES_IN),message:"User Created"});
        


    }
    catch(err)
    {
        res.status(400).json({error:err.message});
    }
}

exports.updateUserCompany=async(req,res)=>{
    // const dt=user.findBy({email:req?.email||req.userId});
    // console.log(req);
    try{
       const dt=await  User.findByIdAndUpdate({_id:req.userId},{
            companyId:req.companyId,
            isAdmin:true
        })
        console.log(dt);
        res.status(202).json({message:"Company Created",status:"success"});
    }
   
    catch(err)
    {
        res.send(400).json({status:"error",message:err.message});
    }
}

exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        
        if(!email||!password)
        return res.status(404).json({staus:"error",message:"All Fields are mandatory"});
        const dt=await User.findOne({email:email});
        console.log(dt);
        if(!dt)
        return res.status(404).json({status:"error",message:"Email Or Password is wrong"});
        
        if(!await dt.comparePassword(password,dt.password))
        return res.status(404).json({status:"error",message:"Email Or Password is wrong"});

        // console.log(dt);
        const payload=dt.tokenPayload();
        const token=await jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:eval(process.env.EXPIRES_IN)});

        return res.status(200).cookie('token',token,{
            expiresIn:eval(process.env.EXPIRES_IN),
            httpOnly:true,
            sameSite:"none"
        }).json({data:payload,token:token,expiresIn:eval(process.env.EXPIRES_IN),mesage:"Signed In successful"});


        

    }
    catch(err)
    {
        console.log(err);
        return res.status(401).json({status:"error",message:err.message});
    }
}

exports.protect=async (req,res,next)=>{
    try{
    console.log(req.cookies);
    const token=req.cookies?.token||req.headers['token'];
    console.log(token);

    if(!token) return res.status(401).json({message:"You are not Login"})

    const dt=jwt.verify(token,process.env.SECRET_KEY);
    if(!dt)
    {
        res.send(404).json({message:"You are not a valid user"});

    }
    
    next();
}
catch(err)
{
    res.status(400).json({"message":err.message});
}
}


exports.getAllUser=async(req,res)=>{
    try{
    const dt=await User.find({companyId:req.params.companyId});
    res.status(200).json({"data":dt});
    }
    catch(err)
    {
        res.status(400).json({"message":err.message});
    }
}