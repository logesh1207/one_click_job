'use client';


import { useState } from 'react';
import '@radix-ui/themes/styles.css';
import { Button, TextArea, Theme } from "@radix-ui/themes";
import { TextField } from "@radix-ui/themes";
import { RadioGroup } from "@radix-ui/themes";
import "react-country-state-city/dist/react-country-state-city.css";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faImage, faIndianRupeeSign, faPhone, faRupee, faRupeeSign, faUser, faVoicemail } from '@fortawesome/free-solid-svg-icons';
import ImageUpload from './imageUpload';
import { redirect } from 'next/navigation';
import SaveJobAction from '../actions/JobActions';
import { Job } from '@/models/Job';


export default function JobForm({ orgId, jobDoc }: { orgId: string, jobDoc?: Job }) {
  const [countryId, setCountryId] = useState(jobDoc?.countryId || 0);
  const [stateId, setStateId] = useState(jobDoc?.stateId || 0);
  const [cityId, setCityId] = useState(jobDoc?.cityId || 0);
  const [countryName, setCountryName] = useState(jobDoc?.country || '');
  const [stateName, setStateName] = useState(jobDoc?.state || '');
  const [cityName, setCityName] = useState(jobDoc?.city || '');

  async function handlesaveJob(data: FormData) {

    data.set('country', countryName.toString());
    data.set('state', stateName.toString());
    data.set('city', cityName.toString());
    data.set('countryId', countryId.toString());
    data.set('stateId', stateId.toString());
    data.set('cityId', cityId.toString());

    data.set('orgId', orgId);
    const jobDoc = await SaveJobAction(data);
    redirect(`/jobs/${jobDoc.orgId}`);

  }
 

  return (
    <Theme>
      <form action={handlesaveJob} className="container mt-6 flex flex-col gap-4 ">

        {(jobDoc && (
          <input type="hidden" name="id" value={jobDoc?._id} />

        ))}
        <TextField.Root size="2" name="title" placeholder="Job title" defaultValue={jobDoc?.title || ''} />
        <div className="grid sm:grid-cols-3 gap-6 *:grow">
          <div>
            Remote?
            <RadioGroup.Root defaultValue={jobDoc?.remote || 'hybrid'} name="remote">
              <RadioGroup.Item value="onsite">On-site</RadioGroup.Item>
              <RadioGroup.Item value="hybrid">Hybrid-Remote</RadioGroup.Item>
              <RadioGroup.Item value="remote">Fully-Remote</RadioGroup.Item>
            </RadioGroup.Root>
          </div>
          <div>
            Full time?
            <RadioGroup.Root defaultValue={jobDoc?.type || 'full-time'} name="type">
              <RadioGroup.Item value="project">Project</RadioGroup.Item>
              <RadioGroup.Item value="part-time">Part-time</RadioGroup.Item>
              <RadioGroup.Item value="full-time">Full-time</RadioGroup.Item>
            </RadioGroup.Root>
          </div>
          <div>
            Salary
            <TextField.Root name="salary" defaultValue={jobDoc?.salary || ''} >
              <TextField.Slot>
                <FontAwesomeIcon className="h-3 text-black-200" icon={faIndianRupeeSign} />
              </TextField.Slot>
              <TextField.Slot>
                /year
              </TextField.Slot>
            </TextField.Root>
          </div>

        </div>

        <div>
          Location?
          <div className='flex flex-col sm:flex-row gap-4 *:grow'>
            <CountrySelect
            defaultValue={countryId ? {id:countryId,name:countryName}:0}
            value={countryId}
              onChange={(e: any) => {
                setCountryId(e.id);
                setCountryName(e.name);
              }}
              placeHolder="Select Country"
            />

            <StateSelect
            defaultValue={countryId ? {id:stateId,name:stateName}:0}
            value={stateId}
              countryid={countryId}
              onChange={(e: any) => {
                setStateId(e.id);
                setStateName(e.name);
              }}
              placeHolder="Select State"
            />

            <CitySelect
             defaultValue={countryId ? {id:cityId,name:cityName}:0}
            value={cityId}
              countryid={countryId}
              stateid={stateId}
              onChange={(e: any) => {
                setCityId(e.id);
                setCityName(e.name);
              }}
              placeHolder="Select City"
            />
          </div>
        </div>

        <div className='sm:flex '>
          <div className="w-1/3">
            <div>Job icon</div>
            <ImageUpload name="jobIcon" icon={faImage} defaultValue={jobDoc?.jobIcon || ''} />
          </div>
          <div className='grow'>
            <div>Contact Person</div>
            <div className="flex gap-2 ">
              <div>
                <ImageUpload name="ContactPhoto" icon={faUser} defaultValue={jobDoc?.ContactPhoto || ''} />
              </div>
              <div className=" flex flex-col gap-1 grow mt-2" >
                <TextField.Root placeholder="Name" name="ContactName" defaultValue={jobDoc?.ContactName || ''}>
                  <TextField.Slot >
                    <FontAwesomeIcon className="h-3" icon={faUser} />
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root placeholder="Phone" name="ContactPhone" defaultValue={jobDoc?.ContactPhone || ''}>
                  <TextField.Slot >
                    <FontAwesomeIcon className="h-3" icon={faPhone} />
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root placeholder="Email" name="ContactEmail" defaultValue={jobDoc?.ContactEmail || ''}>
                  <TextField.Slot >
                    <FontAwesomeIcon className="h-3" icon={faEnvelope} />
                  </TextField.Slot>
                </TextField.Root>
              </div>
            </div>
          </div>

        </div>



        <TextArea placeholder="Job description" resize="vertical" name="description" defaultValue={jobDoc?.description || ''} />
        <div className='container mt-2 flex justify-center'>
          <Button size="3" type="submit">
            <span className='px-8'>Save</span></Button>
        </div>
      </form>



    </Theme>
  );

}