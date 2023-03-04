import React from 'react'
import Logo from '../decorates/Logo'
import Dashboard from './Dashboard'

export default function AdminPanel() {
  return (
    <div className='admin-panel'>
      <Logo />
      <Dashboard />
    </div>
  )
}
