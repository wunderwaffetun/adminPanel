import React, { useContext } from 'react'
import { globalContext } from '../../helpers/Context'
import withForm from './SendTemplate'
import changeUser from '../../http/changeUser'

export default function Edit() {
  const value = useContext(globalContext)
  const EditForm = withForm(changeUser, "Edit")

  return (
    <EditForm info={value.data} />
  )
}
