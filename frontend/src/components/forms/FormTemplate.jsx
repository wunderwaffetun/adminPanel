import React from 'react'
import { Form } from 'react-router-dom'

export default function FormTemplate(props) {
    const {dataHandler, buttonName} = props
    return (
        <div className="form-container">
            <Form className='auth-form' noValidate>
            <span className="name-auth-form">{buttonName}</span>
            <div className='inputs-field'>
                {props.children}
            </div>
            <button className='button-form' onClick={dataHandler}>
                {buttonName}
            </button>
            </Form>
        </div>
    )
}
