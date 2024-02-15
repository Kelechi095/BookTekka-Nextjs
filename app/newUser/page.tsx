import { getCurrentUser } from '@/actions/getCurrentUser'
import React from 'react'
import NewUserClient from './NewUserClient'

const page = async() => {
    const currentUser = await getCurrentUser()
  return <NewUserClient currentUser={currentUser}/>
}

export default page