import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './Loading'
import Toast from './Toast'

function Alert() {
    const {alert}=useSelector((state)=>state)
    console.log(alert)
    
  return (
    <div>
        {
            alert.loading && <h1><Loading/></h1>
        }
        {
            alert.error && <h1><Toast /></h1>
            // do this according to toasting library 
        }
        {
            alert.success && <h1><Toast/></h1>
        }

    </div>
  )
}

export default Alert