import React, { useEffect } from 'react'
import M from 'materialize-css';

export default function MaterializeComp({user, deleteItemHandler, editItemHandler}) {


    useEffect(()=> {
        M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {
            direction: 'left',
            hoverEnabled: false
        });
    }, [])

    

    


  return (
    <div className="fixed-action-btn ">
        <a className="btn-floating btn-small btn-white">
            <i className="small material-icons icon-red">more_horiz</i>
        </a>
        <ul>
            <li><a onClick={()=>{editItemHandler(user.id)}} className="btn-floating btn-red"><i className="material-icons">create</i></a></li>
            <li><a onClick={()=>{deleteItemHandler(user.id)}} className="btn-floating btn-red"><i className="material-icons">delete</i></a></li>
        </ul>
    </div>
  )
}
