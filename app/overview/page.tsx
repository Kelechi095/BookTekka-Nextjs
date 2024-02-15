import React from 'react'
import { getStats } from '@/actions/getStats'
import OverviewClient from './OverviewClient'
import { getCurrentUser } from '@/actions/getCurrentUser'

const Overview = async() => {
  const stats = await getStats()
  const currentUser = await getCurrentUser()
  return (
    <OverviewClient stats={stats} currentUser={currentUser}/>
  )
}

export default Overview