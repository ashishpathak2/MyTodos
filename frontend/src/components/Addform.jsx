import React, { useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { stateData } from '../contexts/Context';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseUrl } from '../utils';








const Addform = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [priorityLevel, setPriority] = useState('');
  const [timeRemaining, setTimeRemaining] = useState('');
  const { getTodo ,setTodos,todos} = stateData();
  
  const postTodo = async (data) => {
    await axios.post(`${baseUrl}/addtodo`, data)
      .then((res) => {
        if (res.data === "please login") {
          return  toast.dark("Please login",{
            position: "top-center"
          })
        }
        console.log(res.data);
        // setTodos(res.data);
      }),
      (error) => {
        console.log(error);
      };
  };
 
  
const handleSubmit =  (e) => {
    e.preventDefault();
    postTodo( { description, priorityLevel, timeRemaining } );
    setDescription('');
    setPriority('');
    setTimeRemaining('');
    setIsOpen(false);
    
 };
 


  return (
    <div className="">

      <div className='w-14 h-14 absolute left-0  hover:scale-125 hover:transition ease-in-out bg-zinc-900 rounded-[50px] hover:bg-blue-600 mt-5 ml-5 flex justify-center  focus:outline-none focus:bg-blue-600'>
        <button onClick={e => setIsOpen(true)}
          className="text-white"><IoMdAdd /></button>
      </div>

      {isOpen && (
        <div className=" fixed top-0 left-0 w-full h-full flex justify-center items-center bg-zinc-800 bg-opacity-60 z-50 ">
          <div className="w-[30rem] bg-zinc-900 p-8 rounded-[1.5rem] bg-opacity-85">
            <h2 className="text-white text-2xl font-semibold mb-4">Task Form</h2>
            <form onSubmit={handleSubmit} >
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-white mb-2">Description</label>
                <input
                  type="text"
                  id="description"
                  className=" text-white border-transparent bg-zinc-700 w-full border border-gray-300 rounded px-3 py-2 "
                  // value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="priority" className="block text-sm font-medium text-white mb-2">Priority Level</label>
                <select
                  id="priority"
                  className=" text-white border-transparent bg-zinc-700 w-full border border-gray-300 rounded px-3 py-2 "
                  // value={priority}
                  onChange={(e) => setPriority(e.target.value)} 
                  required
                >
                  <option value="">Select Priority</option>
                  <option value="1"> Very Urgent </option>
                  <option value="2"> Very Important</option>
                  <option value="3"> Important</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="timeRemaining" className=" block text-sm font-medium text-white mb-2">Time Remaining</label>
                <input
                  type="time"
                  id="timeRemaining"
                  // placeholder='DaysHoursMinutesSeconds'
                  className=" text-white border-transparent bg-zinc-700 w-full border border-gray-300 rounded px-3 py-2 "
                  // value={timeRemaining}
                  onChange={(e) => setTimeRemaining(e.target.value)}
                />
              </div>
              <div className="flex justify-around">
                <button
                  type="submit"
                  className="bg-zinc-700 text-white py-2 px-4 rounded hover:bg-gray-600  focus:outline-none focus:bg-blue-600"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="bg-zinc-700 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-400"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Addform;
