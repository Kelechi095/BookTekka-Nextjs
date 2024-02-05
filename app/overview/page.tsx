import React from 'react'
import { getStats } from '@/actions/getStats'
import OverviewClient from './OverviewClient'

const Overview = async() => {
  const stats = await getStats()

  return (
    <OverviewClient stats={stats}/>
  )
}

export default Overview