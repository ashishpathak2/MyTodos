import React, { useState, createContext, useContext, useEffect } from 'react'
import axios from 'axios';
import { baseUrl } from '../utils';




const StateItems = createContext({
  todos: [],
  setTodos: () => { },
  getTodo: () => { },

});

export default function Context({ children }) {

  const [todos, setTodos] = useState([]);
  const loggedInUser = localStorage.getItem('loggedInUser')


  // if (document.cookie && document.cookie.length > 9) {
  //   const cookie = document.cookie.split('=');
  //   localStorage.setItem('loggedInUser', cookie[1].split('%')[0])
  //   document.cookie = "username="
  // }


  //Fetching Data from database of all products
  axios.defaults.withCredentials = true;
  const getTodo = () => {
    axios.get(`${baseUrl}/todo`)
      .then((res) => {
        if (res.data === "please login") {
          return;
        }
        setTodos(res.data)
      }),
      (error) => {
        console.log(error);
      }
  }




  useEffect(() => {
    if (loggedInUser && loggedInUser.length > 0) {
      getTodo();
    }

  }, [])



  return (
    <StateItems.Provider value={{ todos, setTodos, getTodo }}>
      {children}
    </StateItems.Provider>
  )
}

export const stateData = () => useContext(StateItems)
