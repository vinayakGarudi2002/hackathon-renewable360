import React ,{useContext} from 'react'
import { alertContext } from '../context/Alert/AlertContext'
import "./Style.css"
const Alert = () => {
    const {alert}=useContext(alertContext)
    const {type,message,display}=alert
   

  return (
    <div className={`alert alert-${type} alertCss`} style={{visibility:`${display}`,
 }} role="alert">
   {message}
  </div>
  )
}


export default Alert
