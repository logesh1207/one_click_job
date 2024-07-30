import { AutoPaginatable, OrganizationMembership, WorkOS } from "@workos-inc/node";
import Jobs from "@/app/components/jobs";
import mongoose from "mongoose";
import { JobModel } from "@/models/Job";
import { Original_Surfer } from "next/font/google";
import { getUser } from "@workos-inc/authkit-nextjs";

type PageProps={
    params:{
        ID:string;
    }

};

export default async function CompanyJobPage(props:PageProps){
    const workos=new WorkOS(process.env.WORKOS_API_KEY);
    const org=await workos.organizations.getOrganization(props.params.ID)
    const {user}=await getUser();
    await mongoose.connect(process.env.MONGO_URI as string);
    const jobsDocs=JSON.parse(JSON.stringify(await JobModel.find({orgId:org.id})));
    let oms:AutoPaginatable<OrganizationMembership>|null=null;
    if(user )
        {
         oms=await workos.userManagement.listOrganizationMemberships({
            userId:user.id,
         })
    
            
        }
    for(const jobss of jobsDocs){
        const orgs= await workos.organizations.getOrganization(jobss.orgId);
        jobss.orgName =orgs.name; 
        if(oms && oms.data.length>0){
            jobss.isAdmin = !!oms.data.find(om=>om.organizationId===jobss.orgId);
        }

    }
    
    return(
        <div>
          <div className="container">
            <h1 className="text-2xl font-bold my-6">{org.name} Jobs</h1>
        </div>
          <Jobs jobs={jobsDocs} header={"Jobs posted by "+org.name}/>
          
        </div>
        
    );
}