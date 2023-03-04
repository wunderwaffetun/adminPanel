import React from 'react'
import withForm from './SendTemplate'
import addUser from '../../http/addUser'

export default function Add() {
  const AddForm = withForm(addUser, "Add")
  //info не буду добавлять, потому что он нужен только при редактировании 
  return (
    <AddForm  />
  )
}
