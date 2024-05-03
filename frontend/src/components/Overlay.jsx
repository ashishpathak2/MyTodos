import React, { useRef} from 'react'
import Cards from "./Cards"
import Addform from "./Addform"
import { stateData } from '../contexts/Context';
import SignupFrom from "./SignupForm"







function Overlay() {
  const { todos } = stateData()
  const newref = useRef(null);
  const loggedInUser = localStorage.getItem('loggedInUser')


    
 

  

  return (
    <div ref={newref} className='w-full flex flex-wrap xl:fixed items-start justify-center '>

      <Addform />
      <SignupFrom/>


      { loggedInUser.length > 0 && 
       todos && 
        todos.length > 0 ? todos.map((e,index) => (

          <Cards data={e} reference={newref}  key={index} />

        )):
        null
      }




    </div>
  )
}

export default Overlay