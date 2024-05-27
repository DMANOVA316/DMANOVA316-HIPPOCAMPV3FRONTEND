
import React from 'react';

import { Outlet } from 'react-router-dom';

import NavApprenant from '@/apprenants/components/NavApprenant';

export default function Dashboardapprenant() {

  return (
    <>
     
      <div className="min-h-full">
        
        <NavApprenant/>
      
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{/* Your content */}
          <Outlet/>
          </div>
        </main>
      </div>
    </>
  )
}
