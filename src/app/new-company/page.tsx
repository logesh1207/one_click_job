import { getUser } from "@workos-inc/authkit-nextjs";

import { createCompany} from "../actions/workosactions";




 export  default async function NewCompanyPage(){
    const { user } = await getUser();  

    async function handleNewCompanyFormSubmit(data:FormData){
        'use server'
       if(user){
        await createCompany(data.get("newCompanyName") as string,user.id)

       } 
    }
    if(!user){
        <p>Login to use this page</p>
    }
    return (
        <div className="container">
             <h1 className="text-lg">Create your company.</h1>  
            <p className="text-sm text-gray-400 mb-2">To create a job listing you need to register your company</p> 
        <form action={handleNewCompanyFormSubmit} className="flex gap-2">
            <input  name="newCompanyName" type="text" placeholder="company name" className="p-2 border-gray-400 rounded-md border"  />
          <button className="bg-gray-200  px-4 py-2 rounded-md flex gap-2 items-center" type="submit">Create a Company
          </button>
        </form>
        </div>
    );

}