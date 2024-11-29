import React, { useState } from 'react';
import { FaBarsStaggered } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { IoPersonOutline } from "react-icons/io5";
import { GiSelfLove } from "react-icons/gi";
import { FaCartArrowDown } from "react-icons/fa";
import avatar from '../assets/avatar.png';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {

  const [isDropDown, setIsDropDown] = useState(false);

  const {logOut, currentUser} = useAuth();

  const handleLogOut = ()=>{
    logOut()
  }

  const cartItems = useSelector(state => state.cart.cartItems)
  console.log(cartItems)

  const navigation = [
    {name: 'Dashboard', href: '/dashboard'},
    {name: 'Orders', href: '/orders'},
    {name: 'Cart', href: '/cart'},
    {name: 'Check Out', href: '/checkout'}
  ]

  return (
    <header className='max-w-screen-2xl px-4 py-6 mx-auto bg-white shadow-md z-50 sticky top-0'>
        <nav className='flex justify-between items-center '>

        <div className='flex gap-4 md:gap-12 items-center sm:w-72 w-40 space-x-2'>
            <Link to={'/'}> <FaBarsStaggered className='text-2xl'/></Link>

            <div className='relative'>
              <IoSearch className='size-4 absolute left-2 inline-block inset-y-2'/>
            <input type="text" placeholder='Search here'
             className='w-full pl-8 pr-5 rounded-md py-1 focus:outline-none bg-gray-200'/>
            </div>
        </div>

        <div className='flex gap-4 items-center '>
         <div className='relative'>
         <div className='grid items-center'>
            {currentUser ? 
            <button onClick={()=>setIsDropDown(!isDropDown)}><img src={avatar} alt="" className='size-7 w-full rounded-full'/></button> : 
            <Link to={'/login'}><IoPersonOutline className='size-5'/></Link>}
          </div>
          <div>
             {
              isDropDown && (
              <div className='absolute mt-2 shadow-md rounded-md z-40  bg-white w-32 p-2'>
                  <ul className='my-2'>
                  {navigation.map((item)=>(
                    <li key={item.name} onClick={()=>setIsDropDown(false)} className='text-sm block leading-6'>
                     <Link to={item.href}>{item.name}</Link></li>
                  ))
                  
                  }
                  <button onClick={handleLogOut} className='bg-gray-100 rounded-md hover:bg-gray-300 p-2'>Log out</button>
                </ul>
              </div>
              )
           
             }
          </div>
         </div>
        
        <button className='hidden sm:block'>
        <GiSelfLove className='size-5'/>
        </button>

        <Link to={'/cart'} className='bg-primary p-1 sm:px-6 px-2 flex items-center rounded-md'>
        <FaCartArrowDown className='size-5'/>
        {
          cartItems.length > 0 ? (
            <span className='text-sm ml-1 font-semibold'>{cartItems.length}</span>
          ) : (
            <span className='text-sm ml-1 font-semibold'> 0 </span>
          )
        }
        
        </Link>

        </div>
        </nav>
    </header>
  )
}

export default Navbar