import React, {useState} from 'react'

export default function Input(props) {
    const { name, changeFunction, def} = props
    const [inputValue, setInputValue] = useState(def || '')
      

return (
    <input
        type="text"
        name={name}
        placeholder={name}
        className='browser-default'
        value={inputValue} 
        onChange={(e) => {
            setInputValue(e.target.value)
            changeFunction(e.target.value)
        }}
    />
)
}
