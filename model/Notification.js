const mongoose=require("mongoose");
const Schema=mongoose.Schema;
ObjectId=Schema.ObjectId;
const notificationSchema=new Schema({
    to:{
        type:ObjectId,
        ref:"User",
       
        
    },
    form:{
        type:ObjectId,
        res:"User"
    },
   read:{
        type:Boolean,
        default:false
    
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    message:{
        type:String,


    },
    type:{
        type:String,
        default:"User"
    },
    projectId:{
        type:ObjectId,
        ref:"Project"
    }
   
})


module.exports=mongoose.model("Notification",notificationSchema);