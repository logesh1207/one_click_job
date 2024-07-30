
import { AutoPaginatable, OrganizationMembership, User, WorkOS } from '@workos-inc/node';
import mongoose, {Schema,model,models} from 'mongoose';

export type Job={
    _id?:string;
    title:string;
    remote:string;
    orgName:string;
    type:string;
    salary:number;
    country:string;
    state:string;
    city:string;
    countryId:string;
    stateId:string;
    cityId:string;
    orgId:string;
    jobIcon:string;
    ContactName:string;
    ContactPhoto:string;
    ContactPhone:string;
    ContactEmail:string;
    description:string;
    createdAt:string;
    updatedAt:string;
    isAdmin?: boolean;
};



const JobSchema=new Schema({
    title:{type:String,required:true},
    remote:{type:String,required:true},
    type:{type:String,required:true},
    salary:{type:Number,required:true},
    country:{type:String,required:true},
    state:{type:String,required:true},
    city:{type:String,required:true},
    orgId:{type:String,required:true},
    countryId:{type:String,required:true},
    stateId:{type:String,required:true},
    cityId:{type:String,required:true},
    jobIcon:{type:String},
    ContactPhoto:{type:String},
    ContactName:{type:String,required:true},
    ContactPhone:{type:Number,required:true},
    ContactEmail:{type:String,required:true},
    description:{type:String},
},{
   timestamps:true, 
}
);

export async function addOrgAndUserData(jobsDocs:Job[],user:User|null){
    jobsDocs=JSON.parse(JSON.stringify(jobsDocs));
    const workos=new WorkOS(process.env.WORKOS_API_KEY);

    await mongoose.connect(process.env.MONGO_URI as string);
    let oms:AutoPaginatable<OrganizationMembership>|null=null;
    if(user )
        {
         oms=await workos.userManagement.listOrganizationMemberships({
            userId:user?.id,
         })
    
            
        }
    for(const jobss of jobsDocs){
    
        const orgs= await workos.organizations.getOrganization(jobss.orgId);
        jobss.orgName =orgs.name; 
        if(oms && oms.data.length>0){
            jobss.isAdmin = !!oms.data.find(om=>om.organizationId===jobss.orgId);
        }
       
    }
    return jobsDocs;
}

export const JobModel=models?.Job || model('Job',JobSchema);