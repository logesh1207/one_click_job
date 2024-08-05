import { addOrgAndUserData, JobModel } from "@/models/Job";
import Hero from "./components/hero";
import Jobs from "./components/jobs";
import { getUser } from "@workos-inc/authkit-nextjs";
//import { useState } from "react";
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI as string,{
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, 
  socketTimeoutMS: 45000,
});

export default async function Home() {
  //const[latestJobs,setLatestJobs]=useState([]);
  //const[error,serError]=useState(null);
  //useEffect(()=>{
  try{
  const {user}=await getUser();
  const latestJobs=await addOrgAndUserData(
    await JobModel.find({},{},{limit:3,sort:'-createdAt'}).lean(),
    user,
  );
 
      
  return (
    <>

   <Hero/>
   <Jobs  header={''} jobs={latestJobs}/>
   </>
  );
}
  catch (error) {
    console.error('Error in Home component:', error);
    return <div>Error loading jobs</div>;
  }
}
