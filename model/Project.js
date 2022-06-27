const mongoose=require('mongoose');
const Schmea=mongoose.Schema;
ObjectId=Schmea.ObjectId;
const ProjectSchema=new Schmea({
    title:{
        type:String,
        require:[true,"Please Provide title"],

    },
    category:{
        type:String,
        require:[true,"Please Provide category"],

    },
    startDate:{
        type:Date,
        require:[true,"Please Provide Start Date"]
    },
    endDate:{
        type:Date,
        require:[true,"Please Provide End Date"]

    },
    description:{
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
        default:"Not Started"
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

