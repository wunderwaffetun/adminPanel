import React, { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { globalContext } from '../../helpers/Context'

export default function DashItems() {
  const location = useLocation()
  const value = useContext(globalContext)

  const setActive = ({isActive}) =>  {
    const defaultCl = 'nav-link waves-effect'
    return isActive ? `nav-active ${defaultCl}` : `${defaultCl}`
  } 
  
  return (
    <div className='dash-items'>
      <NavLink to="/" className={setActive}>
        <i className="nav-icons material-icons">person</i>
        <span className="nav-text">Пользователи</span>
      </NavLink>
      <NavLink to="/auth" className={setActive}>
        <i className="nav-icons material-icons">backup</i>
        <span className="nav-text">Войти</span>
      </NavLink>
      {
         value.role === 'dir'  ? (
          <NavLink to="/reg" className={setActive}>
            <i className="nav-icons material-icons">add</i>
            <span className="nav-text">Добавить</span>
          </NavLink>
         ): null
      }
      {
        location.pathname === '/edit' ? (
          <NavLink className={setActive}>
            <i className="nav-icons material-icons">create</i>
            <span className="nav-text loading">Изменение...</span>
          </NavLink>
        ) : null
      }
    </div>
  )
}
