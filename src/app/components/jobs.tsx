import Jobrow from "./jobrow";
import { Job } from "@/models/Job";
export default function Jobs({header,jobs}:{header:string,jobs:Job[]}){
    return (
        <div className="bg-slate-200 rounded-3xl py-6">
            <div className="container">
            <h2 className="font-bold">{header || 'Recent Jobs'}</h2>
            <div className="flex flex-col gap-4 mt-2">
                {
                    !jobs?.length && (
                        <div>No jobs found</div>
                    )}
                { jobs && (jobs.map(jobs=>(
                        <Jobrow   jobDoc={jobs} />)
                      ))
                }
           
         


           
            </div>
            
            </div>    
        </div>
    );

}