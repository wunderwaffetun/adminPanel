
export const reducer = (data, {type, params}) => {
    switch(type){
        case 'sur': 
            return({
                ...data, 
                surname: `${params}`
            })
        case 'pat': 
            return({
                ...data, 
                patronymic: `${params}`
            })
        case 'pos': 
            return({
                ...data, 
                position: `${params}`
        })
        case 'pho': 
            return({
                ...data, 
                phone: `${params}`
        })
        case 'adr': 
            return({
                ...data, 
                address: `${params}`
        })
        case 'pas': 
            return({
                ...data, 
                password: `${params}`
        })
        case 'log': 
            return({
                ...data, 
                login: `${params}`
        }) 
        case 'nam': 
            return({
                ...data, 
                name: `${params}`
        })    
        default: 
            throw new Error()

    }
}