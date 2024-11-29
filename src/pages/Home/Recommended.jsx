import React, { useEffect, useState } from 'react';
import BookCard from '../books/BookCard';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/feature/book/bookApi';

const Recommended = () => {
  // const [books, setBooks] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState('Choose a genre')

  // useEffect(()=>{
  //     fetch('books.json')
  //     .then(res => res.json())
  //     .then(data => setBooks(data))
  // }, [])

  const {data : books = []} = useFetchAllBooksQuery();


  return (
    <div className='p-16'>
        <h2 className='text-3xl font-semibold mb-5'>Recommended for you</h2>

        <div>
        <Swiper
        slidesPerView={1}
        spaceBetween={30}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={{
          clickable: true,
        }}

        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        
        {
                books.length > 0 && books.slice(6, 12).map((book, index)=> (
                    <SwiperSlide key={index}> 
                        <BookCard book={book}/>
                    </SwiperSlide>
                ))
            }
        
       
      </Swiper>
        </div>
    </div>
  )
}

export default Recommended