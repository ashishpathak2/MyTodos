import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../utils';
import { ToastContainer, toast } from 'react-toastify';

export default function ResetPasword() {
    const Navigate = useNavigate();
    const [otp, setOtp] = useState(Number);
    const [password,setPassword] = useState("");
    const [otpForm, setOtpForm] = useState(false)

    const verifyOtp = (data) => {
        axios.defaults.withCredentials = true;
        axios.post(`${baseUrl}/users/otpVerification`, data)
            .then((res) => {
                if (res.data === "verified") {
                    setOtpForm(true)
                    setOtp(null)
                }


            })
    }

    const updatePassword = (data) => {
        axios.defaults.withCredentials = true;
        axios.post(`${baseUrl}/users/resetPassword`, data)
            .then((res) => {
                if (res.data === "password Changed") {
                   return Navigate("/")
                }

            })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (otpForm) {
           return updatePassword({password})
        }
        verifyOtp({ otp });
        setOtp(null)
        

        

    }




    return (
        <>
            <div className=' text-zinc-400  absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] border border-zinc-600 p-4 flex flex-col gap-2 rounded-lg'>
                {otpForm ?

                    <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
                        <h4 className='text-2xl'>Enter your new Password here:</h4>
                        <input placeholder='Enter new password here ' type="text" name='password' id='password' className=" text-white border-transparent bg-zinc-700 w-full border border-gray-300 rounded px-3 py-2 " onChange={(e) => setPassword(e.target.value)} />

                        <button type="submit" className="bg-green-500 text-white py-2 w-full rounded hover:scale-110 transition ease-in-out" >
                            Submit
                        </button>

                    </form>

                :

                <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
                    <h4 className='text-2xl'>Enter your OTP here:</h4>
                    <input placeholder='Enter OTP here ' type="number" name='otp' id='otp' className=" text-white border-transparent bg-zinc-700 w-full border border-gray-300 rounded px-3 py-2 " onChange={(e) => setOtp(e.target.value)} />

                    <button type="submit" className="bg-green-500 text-white py-2 w-full rounded hover:scale-110 transition ease-in-out" >
                        Submit
                    </button>

                </form>
                
                }


            </div>
                <ToastContainer/>
        </>
    )
}
