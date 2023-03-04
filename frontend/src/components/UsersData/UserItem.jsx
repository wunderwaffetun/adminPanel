import React, { useContext } from 'react'
import MaterializeComp from './MaterializeComp'
import { globalContext } from '../../helpers/Context'


export default function UserItem({user, deleteItemHandler, editItemHandler}) {
  
  const value = useContext(globalContext)
  const {id, name, surname, patronymic, login, position, address, phone } = user
  
  return (
    <tr>
        <td className='first-td'>{id}</td>
        <td>{name}</td>
        <td>{surname}</td>
        <td>{patronymic}</td>
        <td>{position}</td>

        {
          value.role === '' || value.role === 'user' ? null : (
            <>
              <td>{login}</td>
              <td>{phone}</td>
              <td>{address}</td>
              <td>
                  <MaterializeComp 
                      user={user} 
                      deleteItemHandler={deleteItemHandler}
                      editItemHandler={editItemHandler} 
                    />
              </td>
            </>
          )
        }
    </tr>
  )
}
