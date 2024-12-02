import React, { useEffect, useState } from 'react'
import BookCard from '../books/BookCard';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/feature/book/bookApi';

const TopSeller = () => {
    // const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Choose a genre');

    const category = ["Choose a genre", "Fiction", "Business", "Horror", "Adventure", "Marketing"]

    // useEffect(()=>{
    //     fetch("books.json")
    //     .then(res => res.json())
    //     .then(data => setBooks(data))
    // }, [])
    // console.log(books);

    const {data: books = []} = useFetchAllBooksQuery();


    const filteredBooks = selectedCategory === "Choose a genre" ? books: books.filter(book => book.category === selectedCategory.toLowerCase());


  return (
    <div className='py-10 px-16'>
        <h2 className='text-3xl font-semibold mb-3'>Top Sellers</h2>

       <div className='mb-8 flex items-center'>
       <select name="category" id="category" className='rounded-md focus:outline-none border border-gray-300 bg-[#EAEAEA]' onChange={(e)=> setSelectedCategory(e.target.value)}>
            {
                category.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))
            }
        </select>
       </div>
       
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
          filteredBooks.length > 0 && filteredBooks.map((book, index)=> (
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

export default TopSeller