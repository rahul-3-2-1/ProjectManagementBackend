const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const bcrypt=require('bcrypt');
const adminSchema=new Schema({
    name:{
        type:String,
        require:[true,"please tell us user name"],
        minLength:3,
        maxLength:20,
    },
    email:{
        type:String,
        require:[true,"Please Enter Email"],
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,"Please Provide a Password"],
        

    },
    companyId:{
        type:Schema.ObjectId,
       
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

adminSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,2);
    next();
})
adminSchema.methods.comparePassword=async function(pass1,pass2){
    const dt= await bcrypt.compare(pass1.toString(),pass2);
    console.log(dt);
    return dt;
}
adminSchema.methods.tokenPayload=function(){
    return{
        user_id:this._id,
        email:this.email,
        isAdmin:this.isAdmin,
        companyId:this.companyId
    }
}


module.exports=mongoose.model("User",adminSchema);