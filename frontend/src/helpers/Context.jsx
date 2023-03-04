import React from "react";
import App from "../App";

export const globalContext = React.createContext()

export default function ContextWrapper(){

    const value = {
        data: {
            name: "", 
            surname: "",
            patronymic: "",
            position: "",
            phone: "",
            address: "",
            password: "",
            login: "",
        }, 
        role: ''
    }

    return( <globalContext.Provider value={value}>
        <App />
    </globalContext.Provider>)
}