import Link from "next/link";
//import { getSignUpUrl, getUser } from "@workos-inc/authkit-nextjs";
//import { getSignInUrl } from "@workos-inc/authkit-nextjs";
import {
    getSignInUrl,
    getSignUpUrl,
    getUser,
    signOut,
  } from '@workos-inc/authkit-nextjs';

export default async function Header(){
    const { user } = await getUser();
    const signInUrl = await getSignInUrl();
    const signUpUrl = await getSignUpUrl();
    return(
        <header >
        
          <div className=" flex container items-center justify-between  mx-auto my-4 " >
         <Link href={'/'} className="font-bold text-xl">Job Board</Link>
         <nav className="flex gap-2 "   >
            {!user && (
          <Link className="bg-gray-200 px-2 py-1 sm:px-4 sm:py-2 rounded-md"href={signInUrl}>Login</Link>
            )}
            {user && (
                <form action={async () => {
                    'use server';
                    await signOut();
                  }}>
             <button type="submit" className="bg-gray-200  px-2 py-1 sm:px-4 sm:py-2 rounded-md">Logout</button>

             </form>    

            )}
          <Link className="bg-blue-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md"href={'/new-listing'}>Post a Job</Link>
         </nav>
         </div>
        </header>
    );
}