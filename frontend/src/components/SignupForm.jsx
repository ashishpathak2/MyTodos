import React, { useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import axios, { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VscAccount } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import { stateData } from '../contexts/Context';
import { baseUrl } from '../utils';
import { IoClose } from "react-icons/io5";






const Addform = ({ }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formType, setFormType] = useState(true)
  const { getTodo, setTodos , userData, setuserData } = stateData();



  // const googleloggedUser = () => {
  //   axios.defaults.withCredentials = true;
  //   axios.get(`${baseUrl}/users/authUserName`).then((res) => {
  //     if (res.data) {
  //       setuserData(res.data);
  //       localStorage.setItem('loggedInUser', res.data);
  //       getTodo();
  //     }

  //   })
  // }


  const handleClick = () => {
    if (!userData) setIsOpen(true);
    else {
      logout();
    };
  }

  const logout = () => {
    axios.get(`${baseUrl}/users/logout`);
    setTodos(null);
    setuserData(null)
    localStorage.removeItem("loggedInUser")
  }


  useEffect(() => {

    if (localStorage.getItem("loggedInUser")) {
      setuserData(localStorage.getItem("loggedInUser"))
    }
    else if (userData) {
      localStorage.setItem("loggedInUser", userData)

    } 
    // else {
    //   googleloggedUser();
    // }

  }, [userData])

  const registerUser = async (data) => {
    axios.defaults.withCredentials = true;
  
    if (formType) { // Register scenario
      try {
        const res = await axios.post(`${baseUrl}/users/register`, data);
  
        if (res.data === "username already exists") {
          return toast.dark("Username already exists", {
            position: "top-center",
          });
        }
  
        toast.dark("Registration Successful", {
          position: "top-center",
        });
  
        setuserData(res.data);
      } catch (error) {
        console.error(error);
        toast.dark("Registration failed. Please try again.", {
          position: "top-center",
        });
      }
    } else { // Login scenario
      try {
        const res = await axios.post(`${baseUrl}/users/login`, data);
  
        if (res.data) {    
          getTodo(); // Assuming this function fetches some user-related data after login
          setuserData(res.data);
  
          toast.dark("Login successful", {
            position: "top-center",
          });
        } else {
          toast.dark("Invalid credentials", {
            position: "top-center",
          });
        }
      } catch (error) {
        console.error(error);
        toast.dark("Login failed. Please check your credentials and try again.", {
          position: "top-center",
        });
      }
    }
  };
  


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here 
    registerUser({ username, email, password });
    // Clear form fields after submission
    setUsername('');
    setEmail('');
    setPassword('');
    // Close modal after submission
    setIsOpen(false);
  };


  return (
    <div className="">


      <button onClick={() => handleClick()} className='right-0 text-white flex gap-x-2 items-center
          fixed hover:scale-125 hover:transition ease-in-out bg-zinc-900 rounded-[18px] hover:bg-blue-600 z-40 mt-5 mr-5 px-5 py-2'>
        {!userData ?
          <>
            <IoMdAdd />
            <span>Register</span>
          </> :
          <><VscAccount /> {userData} : Logout</>
        }
      </button>



      {
        isOpen && (
          <div className="fixed left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]  bg-zinc-800 bg-opacity-60 z-50 ">
            <div className=" flex flex-col w-[90%] sm:w-[30rem] bg-zinc-900 p-8 pt-4  rounded-[1.5rem] bg-opacity-85 ">
            <button type="button" className=" mb-6 p-2 transition border border-zinc-600 rounded-full  hover:bg-zinc-700 text-white ml-auto" onClick={() => setIsOpen(false)}>
              <IoClose size={"1.3rem"} />
            </button>
              <div className="formselect flex justify-between items-center mb-4">
                <h2 className=" text-white text-2xl font-semibold ">{formType ? "Register" : "LOGIN"}</h2>
                <div className='text-white text-opacity-70 text-sm flex items-center gap-x-2'>

                  <p className='hidden sm:block'>{formType ? "already registered?" : "New user?"}</p>
                  <button onClick={e => setFormType(!formType)} className="text-xl  hover:bg-blue-600 transition-[background] ease-in-out bg-zinc-700 rounded text-white px-4 py-1">
                    {formType ? "LOGIN" : "REGISTER"}
                  </button>
                </div>
              </div>

              <form className='flex flex-col mb-4' onSubmit={handleSubmit} >
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-white mb-2">Username</label>
                  <input
                    placeholder='username'
                    type="text"
                    id="username"
                    className=" text-white border-transparent bg-zinc-700 w-full border border-gray-300 rounded px-3 py-2 "
                    // value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                {formType &&
                  <div className="mb-4">
                    <label htmlFor="Email" className="block text-sm font-medium text-white mb-2">Email</label>
                    <input type="email"
                      placeholder='email'
                      id="Email"
                      className=" text-white border-transparent bg-zinc-700 w-full border border-gray-300 rounded px-3 py-2 "
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                }
                <div className="mb-4">
                  <label htmlFor="password" className=" block text-sm font-medium text-white mb-2">Password</label>
                  <input
                    type="text"
                    placeholder='password'
                    id="password"
                    className=" text-white border-transparent bg-zinc-700 w-full border border-gray-300 rounded px-3 py-2 "
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                { !formType &&
                <a className='text-white text-opacity-70 text-sm mb-2' href="/forgetPassword">Forgot Password ?</a>
                }
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-6  min-w-[150px] rounded hover:scale-110 transition ease-in-out focus:outline-none focus:bg-zinc-200 focus:text-zinc-800"
                  >
                    Submit
                  </button>

                

              </form>

              {/* <p className='text-center text-white pb-2 mb-4 '>OR</p>
              <div className="flex items-center justify-center">
                <a className="bg-white w-full flex items-center justify-center gap-2 p-2 text-center rounded-sm hover:scale-110 transition ease-in-out "
                  href="https://mytodos-3gmr.onrender.com/users/auth"><FcGoogle size="1.8rem" />Continue with Google</a>
              </div> */}


            </div>
          </div>
        )
      }
      <ToastContainer />
    </div >
  );
};

export default Addform;
