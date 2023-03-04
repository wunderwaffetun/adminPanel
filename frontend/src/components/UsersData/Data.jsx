import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserList from './UserList'
import getUsers from '../../http/getUsers'
import { globalContext } from '../../helpers/Context'
import deleteRequest from '../../http/deleteRequest'

export default function Data() {
  const navigate = useNavigate()
  
  const value = useContext(globalContext)
  const [ users, setUsers ] = useState([])

  const deleteItemHandler = (id) => {
    deleteRequest(id)
      .then(data => {
        getList()
        navigate('')
      })
  }

  const editItemHandler = (id) => {
    const curUser = users.find( user => user.id === id)
    Object.keys(curUser).forEach(key => {
      value.data[key] = curUser[key]
    })
    navigate('/edit')
  }

  const getList = async () => {
    const answer = await getUsers()
    value.role = answer.role
    setUsers(answer.userList)
  }

  

  useEffect(()=>{
    getList()
  }, [])


  useEffect(() => {
    navigate('')// Header полностью независим, поэтому, чтобы его обновить испоьлзуется useLocation, который и срабатывает по использовании навигации
  }, [users, setUsers])
  




  return (
      <div className="table-conteiner">
        <table className='striped'>
          <thead>
            <tr>
                <th>id</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Patronymic</th>
                <th>Position</th>

                {
                  (value.role !== '' && value.role !== 'user') ? (
                    <>
                      <th>Login</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Actions</th>
                    </>
                  ) : null
                }
            </tr>
          </thead>
          <UserList 
            users={users} 
            deleteItemHandler={deleteItemHandler}
            editItemHandler={editItemHandler}
          />
        </table>
      </div>
            
  )
}
