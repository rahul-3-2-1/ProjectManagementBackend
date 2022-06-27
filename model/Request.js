const mongoose=require('mongoose');
const Schema=mongoose.Schema;
ObjectId=Schema.ObjectId;

const RequestSchema=new Schema({
    requestedBy:{
        type:ObjectId,
        ref:"User"
    },
    stageId:{
        type:ObjectId,
        ref:"Stages"
    },
    projectId:{
        type:ObjectId,
        ref:"Project"
    },
    companyId:{
        type:ObjectId,
        ref:"Company"

    },
    requestedAt:{
        type:Date,
        default:Date.now()

    },
    status:{
        type:String,
        deafult:"N",
        

    },
    approve:{
        type:String,
        default:"NA"

    }



})


module.exports=mongoose.model("Request",RequestSchema);

