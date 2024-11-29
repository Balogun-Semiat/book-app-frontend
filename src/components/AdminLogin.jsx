import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {FaGoogle} from 'react-icons/fa';
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';
import axios from 'axios'
import getBaseUrl from '../utils/baseUrl';

const AdminLogin = () => {
    const [message, setMessage] = useState('');
   
    const navigate = useNavigate()
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

    //   const token = localStorage.getItem('token');
    //   console.log(token)

    const onSubmit = async(data) => {
        console.log(data);
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const auth = response.data;
           
            if(auth.token){
                localStorage.setItem('token', auth.token);
                // navigate('/admin/dashboard');
                setTimeout(()=>{
                    localStorage.removeItem('token');
                    alert('Token has expired! Please log in');
                    navigate('/admin');
                }, 3600 * 1000)
            }
            alert('User logged in successfully');
            navigate('/dashboard');
        } catch (error) {
            // setMessage(error.response?.data?.message || error.message);
            setMessage('Incorrect username or password');
            console.error(error);
        }
    }


  return (
    <div className='h-[calc(100vh-120px)] flex justify-center mt-5'>
        <div className='w-full mx-auto max-w-sm bg-white shadow-md rounded px-8'>
            <h2 className='mb-8 text-xl font-semibold'>Admin login page</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                        Username
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        {...register("userName", { required: true })}
                        id='userName'
                        type='text'
                        placeholder='Enter your username'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                        Password
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        {...register("password" , { required: true })}
                        id = 'password'
                        type = 'password'
                        placeholder='Enter your password'
                    />
                </div>
                {
                    message &&
                    <div className='text-red-500 text-sm'>{message}</div>
                }
                <div className='flex justify-center my-3'>
                    <button className='bg-blue-500 hover:bg-blue-700 rounded text-white  font-bold px-4 py-2'>Login</button>
                </div>

            </form>

            <p className='text-gray-500 text-center mt-3 text-sm'>&copy; 2024 Book store. All rights reserved</p>
        </div>
    </div>
  )
}

export default AdminLogin; 