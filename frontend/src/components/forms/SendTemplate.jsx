import React, { useReducer, useState } from 'react'
import Input from './Input';
import { reducer } from '../../helpers/reducer';
import FormTemplate from './FormTemplate';



export default function withForm(httpFunc, buttonName){
    return function WithForm({info = {}}){



        const {surname, patronymic, position, phone, address, password, login, name} = info // нужен при редактировании юзера при авто подстановке

        const [ regData, dispatch ] = useReducer(reducer, info)
        const [ isError, setIsError] = useState(false)
        const [ isSuccess, setIsSuccess] = useState(false)

        const dataHandler = async () => { 
            let isEmpty = false
            Object.values(regData).forEach( value => {
                if ( !value ) {
                    isEmpty = true
                }
            })
            if(!isEmpty){
                try{
                    const response = await httpFunc(regData)
                    setIsError(false)
                    setIsSuccess(true)
                } catch (e) {
                    setIsSuccess(false)
                    setIsError(true)
                }
            }
        }

        const changeSurname = (data) => {
            dispatch({type: 'sur', params: data})
        }
        const changePatron = (data) => {
            dispatch({type: 'pat', params: data})
        }
        const changePos = (data) => {
            dispatch({type: 'pos', params: data})
        }
        const changePhone = (data) => {
            dispatch({type: 'pho', params: data})
        }
        const changeAdr = (data) => {
            dispatch({type: 'adr', params: data})
        }
        const changePas = (data) => {
            dispatch({type: 'pas', params: data})
        }
        const changeLog = (data) => {
            dispatch({type: 'log', params: data})
        }
        const changeName = (data) => {
            dispatch({type: 'nam', params: data})
        }
        return (
            <FormTemplate dataHandler={dataHandler} buttonName={buttonName}>
                <Input def={login} name={'Login'} changeFunction={changeLog} />
                <Input def={password} name={'Password'}  changeFunction={changePas} />
                <Input def={patronymic} name={'Patron'} changeFunction={changePatron} />
                <Input def={position} name={'Position'}  changeFunction={changePos} />
                <Input def={phone} name={'Phone'} changeFunction={changePhone} />
                <Input def={address} name={'Address'} changeFunction={changeAdr} />
                <Input def={surname} name={'Surname'} changeFunction={changeSurname} />
                <Input def={name} name={'Name'} changeFunction={changeName} />
                {
                    isError ? <div className='text-danger text-center' style={{'minWidth': '100%'}}>Refused</div> : (
                        null
                    )
                }
                {
                    isSuccess ? <div className='text-success text-center' style={{'minWidth': '100%'}}>Success</div> : null
                }
            </FormTemplate>
        );
    }
}
