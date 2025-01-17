import React from 'react';
import banner from '../../assets/banner.png'


const Banner = () => {
  return (
   <div className='flex flex-col md:flex-row-reverse justify-center items-center gap-12 md:p-16 p-5'>
    <div className='w-1/2 md:w-full flex items-center md:justify-end'>
        <img src={banner} alt="" />
    </div>

    <div className='w-1/2 md:w-full'>
        <h1 className='text-2xl md:text-5xl font-medium mb-7'>New Releases This Week</h1>
        <p className='mb-10'>It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone</p>
        <button className='bg-primary'>Subscribe</button>
    </div>
   </div>
  )
}

export default Banner