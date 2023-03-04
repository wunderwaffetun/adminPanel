import React from 'react'
import UserItem from './UserItem'

export default function UserList({ users, deleteItemHandler, editItemHandler }) {
  users.sort((a, b) => a.id - b.id)
  


  return (
    <tbody>
      {
        users.map( user => {
          return <UserItem 
            key={Math.random()} user={user} 
            editItemHandler={editItemHandler}
            deleteItemHandler={deleteItemHandler}
          />
        })
      }
      
    </tbody>
  )
}
