import React, { useState, createContext, useContext, useEffect } from 'react'
import axios from 'axios';
import { baseUrl } from '../utils';




const StateItems = createContext({
  todos: [],
  setTodos: () => { },
  getTodo: () => { },
  userData:{}, 
  setuserData:()=>{}


});

export default function Context({ children }) {

  const [todos, setTodos] = useState([]);
  const loggedInUser = localStorage.getItem('loggedInUser')
  const [userData, setuserData] = useState()



  //Fetching Data from database of all products
  axios.defaults.withCredentials = true;
  const getTodo = async () => {
   await axios.get(`${baseUrl}/todo`)
      .then((res) => {
        if (res.data === "please login") {
          return null;
        }
        setTodos(res.data)
      }),
      (error) => {
        console.log(error);
      }
  }




  useEffect(() => {
    if (loggedInUser && loggedInUser.length > 0) {
      setuserData(loggedInUser);
      getTodo();
    }

  }, [loggedInUser])



  return (
    <StateItems.Provider value={{ todos, setTodos, getTodo,userData, setuserData  }}>
      {children}
    </StateItems.Provider>
  )
}

export const stateData = () => useContext(StateItems)
