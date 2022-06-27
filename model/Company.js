const mongoose=require("mongoose");
const Schema=mongoose.Schema;
ObjectId=Schema.ObjectId;
const companySchema=new Schema({
    name:{
        type:String,
        minlength:3,
        // maxlength:20,
        
    },
    users:{
        type:Number,
        default:0
    },
    currentUsers:{
        type:Number,
    
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    owners:[
       { type:ObjectId,ref:"User"}
       
    ]
   
})


module.exports=mongoose.model("Company",companySchema);