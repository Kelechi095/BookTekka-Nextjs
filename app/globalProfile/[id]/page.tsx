import React from 'react'
import GlobalProfileClient from './GlobalProfileClient';
import { getGlobalProfile } from '@/actions/getGlobalProfile';

interface IParams {
  id?: any;
}


const page = async({ params }: { params: IParams }) => {
  const user: any = await getGlobalProfile(params.id)
  return (
    <GlobalProfileClient user={user}/>
  )
}

export default page