import React from 'react'
import Navbar from './Navbar'
import { ReactNode } from 'react';

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <div>
        <Navbar>
          {children}
        </Navbar>
        
    </div>
  )
}

export default Layout