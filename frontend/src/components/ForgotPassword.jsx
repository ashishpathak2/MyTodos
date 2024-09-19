import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { MdOutlineLockReset } from "react-icons/md";
import { baseUrl } from '../utils';
import { ToastContainer, toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';



export default function ForgotPassword() {
    const Navigate = useNavigate()
    const [email,setEmail] = useState("");

    const verifyEmail = (data) => {
        axios.defaults.withCredentials = true;
        axios.post(`${baseUrl}/users/forgetPassword`,data)
        .then((res)=>{
          
            if (res.data === "Invalid Email") {
                return  toast.dark("Invalid Email",{
                    position: "top-center"
                  })
               }
            Navigate("/resetPassword")
               
          
        })
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
         verifyEmail({email});

    }




    return (
        <>
        <div className=' text-zinc-400  absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] border border-zinc-600 p-4 flex flex-col gap-2 rounded-lg'>
            <MdOutlineLockReset size={"2.5rem"}/>
            <h4 className='text-2xl'>Forgot Your Password ?</h4>
            <p className='text-lg'>Please enter your Email and we'll send you a link to reset your password</p>

            <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
                <input placeholder='Enter your email ' type="email" name='email' id='email' className=" text-white border-transparent bg-zinc-700 w-full border border-gray-300 rounded px-3 py-2 " onChange={(e) => setEmail(e.target.value)}  />

                <button type="submit" className="bg-green-500 text-white py-2 w-full rounded hover:scale-110 transition ease-in-out" >
                    Submit
                </button>

            </form>
       
        </div>
        <ToastContainer/>
        </>
    )
}
