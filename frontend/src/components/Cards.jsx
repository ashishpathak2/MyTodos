import React, { useState, useEffect } from 'react'
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { motion } from "framer-motion"
import { IoClose } from "react-icons/io5";
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";
// import Countdown from 'react-countdown-simple';
import { RxUpdate } from "react-icons/rx";
import axios from 'axios';
import { stateData } from '../contexts/Context';
import CountdownTimer from './CountdownTimer ';
import { baseUrl } from '../utils';












function Cards({ data, reference }) {
    const [check, setCheck] = useState(false);
    const [isTodoEdit, setTodoEdit] = useState(false);
    const [description,setDescription] =useState("");
    const [editId,setEditId] = useState(0);

    const { getTodo } = stateData();
    const list = {
        1: { className: " bg-red-800 ", title: "Hell Important" },
        2: { className: " bg-blue-800", title: "Very Important" },
        3: { className: " bg-green-800 ", title: "Important" }

    }
    const oneHour = new Date(
        new Date().setHours(new Date().getHours() + 1)
    ).toISOString()


    const deleteTodo = (id) => {

        axios.delete(`${baseUrl}/deletetodo/${id}`).
            then((res) => {
                console.log(res.data);
            }).catch((error) => {
                console.log(error);
            })
    }

    const handleClose = (id) => {
        deleteTodo(id)
        getTodo();
    }

    useEffect(() => {
        var hours = data.timeRemaining.split(":")[0]
        var minutes = data.timeRemaining.split(":")[1]
        const now = new Date();
        // console.log(Date.parse(hours));

    }, [data.timeRemaining])

    const EditTodo = (id,data) => {
        axios.put(`${baseUrl}/edittodo/${id}`, data)
            .then((res) => {
                console.log(res.data);
            }),
            (error) => {
                console.log(error);
            };
    };

    const handleEdit = (id)=>{
        setTodoEdit(!isTodoEdit);
        setEditId(id)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setTodoEdit(!isTodoEdit)
        EditTodo(editId,{description});
        getTodo();
    };
    


    return (

        <motion.div   drag whileHover={{ scale: 1.2 }} dragConstraints={reference} dragTransition={{ bounceStiffness: 500, bounceDamping: 100 }}
            className='relative w-48 h-52 bg-zinc-900 rounded-[30px] px-5 py-6 overflow-hidden text-zinc-300 m-5'>
            <div className={`top flex ${isTodoEdit === false ? "justify-between" : "justify-end"}`} >
                {isTodoEdit === false && <button  className='hover:scale-125 transition ease-in-out' onClick={e => handleEdit(data._id) } > <BiSolidMessageSquareEdit/> </button>}

                  <button className='hover:scale-125 transition ease-in-out ' onClick={e => handleClose(data._id)}><IoClose /> </button>

            </div>

            {isTodoEdit === true ?
            <form onSubmit={() => handleSubmit}>
                <input type="text" id="description" className=" text-white border-transparent bg-zinc-700 w-full border border-gray-300 rounded px-3 py-2 " defaultValue={data.description} onChange={(e) => setDescription(e.target.value)} /> 
                 <button type='submit' className='pl-1 pt-1 hover:scale-125 transition ease-in-out'><RxUpdate size="1.1rem"/></button>
            </form>
                : <p className={`text-sm font-semibold leading-tight text-left mt-3 ${check === true ? "decoration-[1.5px] line-through" : ""}`}>{data.description}</p>
            }






            <div className="footer absolute bottom-0 left-0  w-full">


                <div className="flex justify-between items-center px-5 mb-1  ">
                    <h5>{data.timeRemaining}</h5>
                    {/* <CountdownTimer timeDuration={ 1 * 1 * 60 * 1000}/> */}



                    <button className='hover:scale-125 transition ease-in-out' onClick={() => setCheck(!check)} >{check === true ? <ImCheckboxChecked size="0.9rem"/> : <ImCheckboxUnchecked size="0.9rem" />}</button>

                </div>
                <div className={`importance w-full py-2  ${list[parseInt(data.priorityLevel)].className} text-center`}>
                    <h3>{list[parseInt(data.priorityLevel)].title}</h3>


                </div>

            </div>



        </motion.div>
    )
}

export default Cards

