import { WidgetItem } from '@/components/WidgetItem'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'


export default async function DashboardPage() {

  const session = await getServerSession(authOptions)

    if(!session){
      redirect('/api/auth/signin')
    }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            
    {/* TODO: src/components <WidgetItem /> */}
       <WidgetItem title='usuario conectado serve side' >
        <div className='flex flex-col'>
          <span>{session.user?.name}</span>
          <span>{session.user?.email}</span>
          <span>{session.user?.image}</span>
        </div>
      </WidgetItem> 
    {/* TODO: Fin <WidgetItem /> */}

  </div> 
  )
}

