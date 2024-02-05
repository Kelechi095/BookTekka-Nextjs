import { getCurrentUser } from '@/actions/getCurrentUser'
import React from 'react'
import EditProfileClient from './EditProfileClient'

const EditProfile = async() => {
  const currentUser = await getCurrentUser()
  return (
    <EditProfileClient currentUser={currentUser}/>
  )
}

export default EditProfile