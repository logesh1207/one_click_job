import { JobModel } from "@/models/Job";
import mongoose from "mongoose";
import Image from "next/image";


type PageProps={
    params:{
        jobId:string;
    };
};

export default async function SingleJobPage(props:PageProps){
    const jobId=props.params.jobId;
    await mongoose.connect(process.env.MONGO_URI as string);
    const jobDoc=await JobModel.findById(jobId);

    
    return(
        <>
        <div className="container my-6 mt-8">
           <div className="sm:flex">
            <div className="grow">
                <h1 className=" text-4xl mb-2">{jobDoc.title}</h1> 
                <div className="text-sm text-blue-800 capitalize mb-4">{jobDoc.remote} &middot; {jobDoc.state}, {jobDoc.country} &middot; {jobDoc.type}</div>
            </div>
               <div>
              <Image src={jobDoc.jobIcon} alt={'job icon'} width={50} height={50} className="w-auto h-auto max-w-16 max-h-16"/>
               </div>
          </div>

            <div className="whitespace-pre-line text-gray-600 text-sm">
                 {jobDoc.description}
                </div>
              <div className="  mt-4 bg-gray-200 shadow rounded-lg p-8">
                <h3 className="font-bold mb-2">Apply by contacting us</h3>
                <div className="flex gap-4">
                <Image 
                src={jobDoc.ContactPhoto} 
                alt={'contact person'} 
                width={500} height={500} 
                  className="w-auto h-auto max-w-24 max-h-24"/>
                <div className="flex   items-center">
                    {jobDoc.ContactName}<br />
                    Email: {jobDoc.ContactEmail}<br />
                    Phone: {jobDoc.ContactPhone}<br/>
                </div>

                </div>
                
              </div>
          

           
        </div>
        </>
    )
}