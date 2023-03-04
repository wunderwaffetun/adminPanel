import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from './Header'



export default function Main() {

    const nav = useNavigate()
    
    useEffect(()=>{
        nav('') // уйти со страницы редактирования по умолчанию, если на ней 
    }, [])

    return (
        <div className="users-module">
            <Header />
            <main>
                <Outlet/>
            </main>
        </div>
    )
}