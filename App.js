const express=require("express");
const companyRoutes=require('./Routes/CompanyRoutes');
const authRoutes=require('./Routes/User');
const ProjectRoutes=require('./Routes/Project');
const RequestRoutes=require('./Routes/RequestRoutes');
const cors=require('cors');
const app=express();

const domain=process.env.WHITE_LIST||"";
const whitelist = domain.split(",").map(item => item.trim());
const corsOptions = {
  
    origin: function (origin, callback) {
      
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  }

app.use(cors(corsOptions));


app.use(express.json());

// console.log(companyRoutes);
app.use('/api/v1/company',companyRoutes);

app.use('/api/v1/user',authRoutes);

app.use('/api/v1/project',ProjectRoutes)
app.use('/api/v1/request',RequestRoutes);



module.exports=app;