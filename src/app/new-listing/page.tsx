
import { getUser } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import { createCompany} from "../actions/workosactions";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default async function NewListingPage(){
    const { user } = await getUser();  

    if(!user)
    {
        return(
            
                <div className="container">
                <div>You need to logged in to post a job.
                </div>
                </div>
            
        );
    }
    
    const workos=new WorkOS(process.env.WORKOS_API_KEY);

    let organizationMemberships=await workos.userManagement.listOrganizationMemberships({userId:user.id});

    const activeOrganizationMembership=organizationMemberships.data.filter(om =>om.status==='active');

    const organizationNames:{[key:string]:string}={}
    for(const activeMembership of activeOrganizationMembership)
    {
        const organization=await workos.organizations.getOrganization(activeMembership.organizationId);
        organizationNames[organization.id]=organization.name;

    }



    
    return(
       <div className="container">
      
       
       
            <div>
            <h1 className="text-lg mt-6">Your companies</h1>  
            <p className="text-sm text-gray-400 mb-2">Select a company to create a job add for</p>  

        <div className="inline-block border rounded-md ">
           {Object.keys(organizationNames).map((ID)=>(
            
            <Link  href={'/new-listing/'+ID} className={" flex  items-center gap-2 px-4 py-2 "
            + (Object.keys(organizationNames)[0]===ID?"":"border-t")}
         >
               {organizationNames[ID]}
              <FontAwesomeIcon className="h-5 "icon={faArrowRight}/>
        
             </Link>
          
           ))}

         </div>
           

            {organizationMemberships.data.length===0 && (
            <div>
                 <p className="border border-blue-200 bg-blue-50 mb-4 rounded-md p-2">No company found assigned to your user</p>
           </div>
            )}
           
           </div>
        <div className="inline-flex mt-2 bg-gray-200 px-4 py-2 rounded-md  gap-2 items-center">
            <Link href={'/new-company'}>Create new Company </Link>
            <FontAwesomeIcon className="h-5 "icon={faArrowRight}/>
            
        </div>

       </div>

    );
}