import React, { useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import axios, { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VscAccount } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import { stateData } from '../contexts/Context';
import { baseUrl } from '../utils';





const Addform = ({ }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formType, setFormType] = useState(true)
  const [userData, setuserData] = useState()
  const { getTodo} = stateData();



  const logout = () => {
    axios.get(`${baseUrl}/users/logout`)
  }

  const loggedUserName = async () => {
    axios.defaults.withCredentials = true ;
    await axios.get(`${baseUrl}/users/authUserName`).then((res)=>{
      localStorage.setItem('loggedInUser', res.data);
    })
    return "success";
  }

  // const googleHandlerfunc = ()=> {
  //  googleHandler().then((res)=>{
  //   console.log(res);
  //    loggedUserName()
  //  })
     
  // }

  const googleHandler = ()=>{
    window.open("https://mytodosapp-6h9w.onrender.com/users/auth","_self");
  //  loggedUserName();
    
  }

  const handleClick = () => {
    if (!userData) setIsOpen(true);
    else {
      setuserData(null)
      logout();
      localStorage.setItem("loggedInUser", "")
    };
  }

  useEffect(() => {
    if (localStorage.getItem("loggedInUser")) {
      setuserData(localStorage.getItem("loggedInUser"))
    }
    else if (userData) {
      localStorage.setItem("loggedInUser", userData)
    }
  }, [userData])


  const registerUser = async (data) => {

    if (formType) {
      axios.defaults.withCredentials = true ;
      await axios.post(`${baseUrl}/users/register`, data)
        .then((res) => {

          if (res.data === "username already exists") {
            return toast.dark("username already exists ", {
              position: "top-center"
            });
          }
          toast.dark("Register Succesfull", {
            position: "top-center"
          })

          setuserData(res.data);
          // localStorage.setItem("loggedInUser", userData)

        }),
        (error) => {
          console.log(error);
        };
    }

    else {

      try {
        axios.defaults.withCredentials =true;
       await axios.post(`${baseUrl}/users/login`, data)
          .then((res) => {
            if (res.data) {
              getTodo()
              setuserData(res.data)
              toast.dark("login successfully", {
                position: "top-center"
              })
            }

          }),
          (error) => {
            console.log(error);
          };

      } catch {
        if (AxiosError) {
          toast.dark("Please Register", {
            position: "top-center"
          })
        }
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
            <div className=" w-[90%] sm:w-[30rem] bg-zinc-900 p-8 rounded-[1.5rem] bg-opacity-85 ">
              <div className="formselect flex justify-between items-center mb-4">
                <h2 className=" text-white text-2xl font-semibold ">{formType ? "Register" : "LOGIN"}</h2>
                <div className='text-white text-opacity-70 text-sm flex items-center gap-x-2'>

                  <p className='hidden sm:block'>{formType ? "already registered?" : "New user?"}</p>
                  <button onClick={e => setFormType(!formType)} className="text-xl  hover:bg-blue-600 transition-[background] ease-in-out bg-zinc-700 rounded text-white px-4 py-1">
                    {formType ? "LOGIN" : "REGISTER"}
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} >
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
                <p className='text-center text-white pb-2'>OR</p>
                {/* <div className="flex items-center justify-center">
                  <a  onClick={() => googleHandler()} className="bg-white w-60 flex items-center justify-center gap-2 p-2 text-center rounded-sm hover:scale-110 transition ease-in-out "
                    href="https://mytodosapp-6h9w.onrender.com/users/auth"><FcGoogle size="1.8rem" />Continue with Google</a>
                </div> */}
                   <div className="flex items-center justify-center">
                  <button className="bg-white w-60 flex items-center justify-center gap-2 p-2 text-center rounded-sm hover:scale-110 transition ease-in-out "
                    onClick={() => googleHandler()}><FcGoogle size="1.8rem" />Continue with Google</button>
                </div>


                <div className="flex justify-between mt-4">
                  <button
                    type="submit"
                    className="bg-zinc-700 text-white py-2 px-4 rounded hover:bg-gray-600  focus:outline-none focus:bg-blue-600"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="bg-zinc-700 text-white py-2 px-5  rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </button>
                </div>

              </form>


           
            </div>
          </div>
        )
      }
      <ToastContainer />
    </div >
  );
};

export default Addform;
