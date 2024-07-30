import { getUser } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import '@radix-ui/themes/styles.css';

import JobForm from "@/app/components/JobForm";



type PageProps={
    params:{
        ID:string;
    }
};

export default async function NewListingPageForOrg(props:PageProps){
    const {user}=await getUser();
    const workos=new WorkOS(process.env.WORKOS_API_KEY);

    if(!user)return 'Please login in';
    const ID=props.params.ID;

    
    
    const oms=await workos.userManagement.listOrganizationMemberships({userId:user.id as string,organizationId:ID});
    const hasAccess= oms.data.length>0;
    if(!hasAccess)
    {
        return "No Acess"
    }

    return(  

       <JobForm orgId={ID}/>
    );
}