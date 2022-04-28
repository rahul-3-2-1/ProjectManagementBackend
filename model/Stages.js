const mongoose=require("mongoose");
const Project = require("./Project");
const Schema=mongoose.Schema;
ObjectId=Schema.ObjectId;

const StageSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    weight:{
        type:Number,
        default:1,
    },
    projectId:{
        type:ObjectId,
        ref:"Project"
    },
    discription:{
        type:String,

    },
    status:{
        type:String,
        default:"N"
    },
    startDate:{
        type:Date,
        
    },
    endDate:{
        type:Date,
    }


})

module.exports=mongoose.model("Stages",StageSchema);