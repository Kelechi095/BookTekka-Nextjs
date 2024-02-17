import React from 'react'
import BookBoardingClient from './BookBoardingClient'
import { getCurrentUser } from '@/actions/getCurrentUser'

const page = async() => {
  const currentUser = await getCurrentUser()
  return (
    <BookBoardingClient currentUser={currentUser}/>
  )
}

export default page