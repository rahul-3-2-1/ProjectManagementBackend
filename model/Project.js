const mongoose=require('mongoose');
const Schmea=mongoose.Schema;
ObjectId=Schmea.ObjectId;
const ProjectSchema=new Schmea({
    title:{
        type:String,
        require:[true,"Please Provide title"],

    },
    startDate:{
        type:Date,
        require:[true,"Please Provide Start Date"]
    },
    endDate:{
        type:Date,
        require:[true,"Please Provide End Date"]

    },
    discription:{
        type:String
    },
    stages:[
        {type:ObjectId,ref:"Stages"}
    ],
    progress:{
        type:Number,
        default:0

    },
    status:{
        type:String,
        default:"N"
    },
    members:[
        {type:ObjectId,ref:"User"}
    ],
    companyId:{
        type:ObjectId,
        ref:"Company"
    }
})

module.exports=mongoose.model("Project",ProjectSchema);

