import Rect from 'react';
import syles from '../../styles/Confirm.module.scss'
import LoginLayout from '../../components/LoginLayout';


const Confirm = ()=>{
  return(
    <h1>Confirm</h1>
  )
}

// layout
Confirm.getLayout = (page) =>{
  return(  
  <LoginLayout backlink = {true}> {page} </LoginLayout>
  )

}
export default Confirm;