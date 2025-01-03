import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {FaGoogle} from 'react-icons/fa';
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [message, setMessage] = useState('');
    const {registerUser, signInWithGoogle} = useAuth()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

    const onSubmit = async(data) => {
        console.log(data);
        try {
            await registerUser(data.email, data.password, data.fullName);
            alert("User registered successfully")
        } catch (error) {
            setMessage(error.response?.data?.message || error.message);
            console.error('Error registering user', error)
        }
    }

    const handleGoogleSignIn = async()=>{
        try {
            await signInWithGoogle();
            alert('User logged in successfully');
            navigate('/')
        } catch (error) {
            alert('Google sign in failed');
            console.error(error);
        }
    }

  return (
    <div className='h-[calc(100vh-120px)] flex justify-center'>
        <div className='w-full mx-auto max-w-sm bg-white shadow-md rounded px-8'>
            <h2 className='mb-8 text-xl font-semibold'>Please Register</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                        Full Name:
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        {...register("fullName", { required: "Full name is required" })}
                        id='fullName'
                        type='text'
                        placeholder='Enter your full name'
                    />
                    {errors.fullName && <p className='text-red-500'>{errors.fullName.message}</p>}
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                        Email
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        {...register("email", { required: "Email is required" })}
                        id='email'
                        type='email'
                        placeholder='Enter your email'
                    />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                        Password
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        {...register("password", { required: "Password is required" })}
                        id='password'
                        type='password'
                        placeholder='Enter your password'
                    />
                </div>
                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                {/* {
                    message &&
                    <div className='text-red-500 text-sm'>{message}</div>
                } */}
                <div>
                    <button className='bg-blue-500 hover:bg-blue-700 rounded text-white font-bold px-4 py-2'>Register</button>
                </div>

                    {/* sign up with google */}
                <div className='mt-5'>
                    <button
                    onClick={handleGoogleSignIn}
                    className='flex flex-wrap items-center justify-center w-full text-md bg-secondary text-white p-2 rounded gap-2 focus:outline-none' >
                        <FaGoogle className='mr-2'/> Sign in with google
                    </button>
                </div>
            </form>

            <p className='text-sm my-4'>Already have an account? Please <span className='text-blue-500'><Link to={'/login'}>Log in</Link></span></p>
            <p className='text-gray-500 text-center mt-3 text-sm'>&copy;2024 Book store. All rights reserved</p>
        </div>
    </div>
  )
}

export default Register; 