const express=require("express");
const companyRoutes=require('./Routes/CompanyRoutes');
const authRoutes=require('./Routes/User');
const ProjectRoutes=require('./Routes/Project');
const app=express();

app.use(express.json());

// console.log(companyRoutes);
app.use('/api/v1/company',companyRoutes);

app.use('/api/v1/user',authRoutes);

app.use('/api/v1/project',ProjectRoutes)

module.exports=app;