'use client'
import Image from "next/image";
import { Button } from "@radix-ui/themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";



export default function ImageUpload({name,icon,defaultValue=''}:{name:string;icon:IconDefinition;defaultValue:string;}){
    const fileInRef=useRef<HTMLInputElement>(null);
    const [url,seturl]=useState(defaultValue);
    const [isUploading,setisUploading]=useState(false);
    const [isImageloading,setisImageloading]=useState(false);

    async function upload(ev:ChangeEvent<HTMLInputElement>){
       

        const input=ev.target as HTMLInputElement;
        if(input && input.files?.length && input.files.length>0)
        {
            setisUploading(true);
            const file=input.files[0];
            const data=new FormData;
            data.set('file',file);
          const response=  await axios.post('/api/upload',data);
         if(response.data.url)
         {
            seturl(response.data.url);
            setisUploading(false);
            setisImageloading(true);
         }
        }
    }

    return(
         <div>
            <div className="bg-gray-200  mt-2 rounded-md size-24 inline-flex items-center justify-center   ">
             {(isUploading || isImageloading )&&(
            <FontAwesomeIcon className="h-4 text-gray-600 animate-spin"icon={faSpinner}/>

             ) } 
             {(!isUploading && url && (
                <Image src={url} alt="uploaded image" width={1024} height={1024} onLoadingComplete={()=>setisImageloading(false)} className="w-auto h-auto max-w-24 max-h-24" />
             )) }

             {!isUploading && !isImageloading && !url &&(
            <FontAwesomeIcon className="h-4 text-gray-600"icon={icon}/>
             )} 
            </div> 
            <div className="mt-2">
            <input 
            onChange={(ev)=>upload(ev)}
            ref={fileInRef} type="file" className="hidden"/>
            <Button type="button"
            onClick={()=>fileInRef.current?.click()}
            variant='soft'>
                Select file
                </Button> 
            </div>
          <input type="hidden" value={url} name={name}/>
         </div>
            
        
    );
}