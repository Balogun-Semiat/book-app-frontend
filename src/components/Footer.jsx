import React from 'react';
import { FaWhatsapp } from "react-icons/fa"
import { FaLinkedinIn, FaFacebook  } from "react-icons/fa6";
import { LuMailPlus } from "react-icons/lu";
import logo from '../assets/footer-logo.png'

const Footer = () => {
  return (
    <div className='bg-gray-300 text-center  text-black py-5'>
        <div className='flex'>
        <div className='w-1/2 flex justify-center'>
         <img src={logo} alt="Logo" className='w-[80px]' />
         </div>

         <div>
         <p className='mb-2'>&copy; 2024 Semiat. All rights reserved.</p>
        <div className='flex items-center justify-center gap-3 mb-1'>
            <span className='border border-black rounded-full p-1 text-black'>
            <a href="tel:+2347086495645"  target="_blank" rel="noopener noreferrer"><FaWhatsapp className=' text-xl'/></a>
            </span>
            
           <span className='border border-black rounded-full p-1 text-black'>
           <a href="https://www.linkedin.com/in/semiat-balogun-a4b06b27b"  target="_blank" rel="noopener noreferrer"><FaLinkedinIn className=''/></a>
           </span>

           <span className='border border-black rounded-full p-1 text-black' >
           <a href="https://www.facebook.com/semiat.balogun.18?mibextid=LQQJ4d"  target="_blank" rel="noopener noreferrer"><FaFacebook className=''/></a>
           </span>
            
            <span className='border border-black rounded-full p-1 text-black'>
            <a href="mailto:balogunsemiat2019@gmail.com" target='_blank' rel='noopener noreferrer'><LuMailPlus className=''/></a>
            </span>
        </div>
        <p className='text-black text-sm mt-2'>Designed by <span className='text-blue-950'>Semiat</span></p>
         </div>
        </div>
       
    </div>
  )
}

export default Footer