import React, { useEffect, useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { globalContext } from '../helpers/Context'
import exitUser from '../http/resetToken'

export default function Header() {
  const navigate = useNavigate()

  const value = useContext(globalContext)
  const location = useLocation() // Используется как useEffect, потому что header по-другому не мутирует

  const callExit = () => {
    if(value.role){
      exitUser()
      value.role = ''
      navigate('/auth')
    }
  }


  return (
    <header>
        <div className="header-name">
            Users List
        </div>
        
        <div className="user-auth-info">
            {
              !value.role ? null : (
                <i onClick={callExit} className='material-icons exit'>exit_to_app</i>
              )
            }
            { value.role || 'Not Authorised' }
        </div>



    </header>
    
  )
}
