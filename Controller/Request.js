const Request = require("../model/Request");
const Stages = require("../model/Stages");
const Project = require("../model/Project");
const Notification=require("../model/Notification");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.newRequest = async (req, res) => {
  try {
    const { requestedBy, projectId, stageId, status, companyId } = req.body;
    const reques = new Request();
    reques.requestedBy = requestedBy;
    reques.projectId = projectId;
    reques.stageId = stageId;
    reques.status = status;
    reques.companyId = companyId;
    const dt = await reques.save();

    const data = await Stages.findByIdAndUpdate(
      { _id: stageId },
      {
        request: "R",
      }
    );
    console.log(data);
    const newNt=new Notification();
    newNt.from=requestedBy;
    newNt.message="Updated Project",


    res.status(202).json({ data: dt, status: "success" });
  } catch (err) {
    res.status(404).json({ message: err.message, status: "error" });
  }
};

exports.updateRequest = async (req, res) => {
  try {
    const { stageId, projectId, status, approve, requestId } = req.body;

    const dt = await Request.findByIdAndUpdate(
      { _id: requestId },
      {
        approve: approve,
        requestedAt: Date.now(),
      }
    );
    //  let dcd={};

    await Stages.findByIdAndUpdate(
      { _id: stageId },
      {
        status: status,
        request: "N",
      }
    );

    const dtt = await Stages.find({ projectId: projectId });

    let tot = 0;
    let com = 0;
    dtt.forEach((item) => {
      if (item.status === "C") com += item?.weight;
      tot += item?.weight;
    });

    let prog = Math.ceil((com / tot) * 100);
    let stat;

    if (prog > 0 && prog < 100) stat = "In Progress";
    else if (prog === 100) stat = "Completed";
    else {
      stat = "Not Started";
    }

    const data = await Project.findByIdAndUpdate(
      { _id: projectId },
      {
        progress: prog,
        status: stat,
      }
    );
    res.status(200).json({ message: "Request Updated" });
  } catch (err) {
    res.status(400).json({ message: err.message, status: "error" });
  }
};

exports.getRequestByCompanyId = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const lim = req.query.limit;
    const dt = await Request.find({ companyId: companyId })
      .sort({ requestedAt: "-1" })
      .limit(lim)
      .populate("projectId requestedBy stageId");
    res.status(200).json({ data: dt, status: "success" });
  } catch (err) {
    res.status(400).json({ message: err.message, status: "error" });
  }
};

exports.getRequestByProjectId = async (req, res) => {
  try {
    const id = req.params.projectId;
    console.log(id);
    const dt = await Request.find({ projectId:id }).populate("stageId").sort({ requestedAt: "-1" });
    console.log(dt)
    res.status(200).json({ data: dt, status: "success" });

  } catch (err) {
    res.status(400).json({ message: err.message, status: "error" });
  }
};


exports.getRequestMadePerDay = async (req, res) => {
  try {
    const endDate = new Date().getTime();
    // endDate=

    const startDate = endDate - 7 * (24 * 60 * 60 * 1000);
   
    // console.log(dt);

    const id = req.params.id;
    const dailyData = await Request.aggregate([
      { $match:
         { companyId: ObjectId(id),
            requestedAt:{
                $gte:new Date(startDate),
                $lte:new Date(endDate)
            }

        
        },
        
         
        },
      {
        $addFields: {
          day: {
            $dayOfWeek: "$requestedAt",
          },
          date:{
            $dayOfMonth: "$requestedAt"
          }
        },
      },
      {
        $group: {
          _id: "$date",
          
          total: { $sum: 1 },
        },
      },
      {
          $sort:{
              date:1
          }
      }
    ]);

    console.log(dailyData);
    res.status(200).json({
      status: "success",
      data: dailyData,
    });
  } catch (err) {
    console.log(err);
    res
      .status(err.statusCode || 500)
      .json({ status: "error", message: err.message || "Something went wrong" });
  }
};


exports.getRequestMadeByUser=async(req,res)=>{
  try{
    const dt=await Request.find({requestedBy:req.params.userId}).populate("stageId").sort({ requestedAt: "-1" });

    res.status(200).json({data:dt,status:"success"});

  }
  catch(err)
  {
    return res.status(err.statusCode||500).json({message:err.message||"Something went wrong",status:"error"});
  }

}