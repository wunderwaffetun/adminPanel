import React, { useState, useContext } from 'react'
import { globalContext } from '../../helpers/Context';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import FormTemplate from './FormTemplate';
import signIn from '../../http/signIn';




export default function Auth() {
    const [ authData, setAuthData ] = useState({'login': '', 'password': ''});
    const [ isError, setIsError ] = useState(false)
    const [ isAccess, setIsAccess ] = useState(false)

    const value = useContext(globalContext)
    const navigate = useNavigate()

    const dataHandler = async () => { // устанавливаем пользователя
        if(authData.login && authData.password){
            const response = await signIn( authData )
            if(response){
                value.role = response.roles[0]
                setIsAccess(true)
                setIsError(false)
            } else {
                setIsError(true)
                setIsAccess(false)
            }
            
        }
    }

    React.useEffect(()=>{//Если авторизовались, выполняем действия
        let timeout 
        if(isAccess){
            timeout = setTimeout(()=>{
                navigate('/')
            })
        }
        return () => clearInterval(timeout)
    }, [isAccess])

    const changeLogin = (login) => {
        setAuthData({...authData, 'login': `${login}`})
    }

    const changePassword = (password) => {
        setAuthData({...authData, 'password': `${password}`})
    }

    return (
      <FormTemplate dataHandler={dataHandler} buttonName={'Sign In'}>
        <Input name={'Login'} changeFunction={changeLogin}/>
        <Input name={'Password'} changeFunction={changePassword} />
        {
            isError ? <div className='text-danger text-center'>Incorrect data</div> : null
        }
        {
            isAccess ? <div className='text-success text-center'>Granted</div> : null
        }
      </FormTemplate>
    );
}


