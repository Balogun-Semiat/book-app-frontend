import React from 'react'
import { useFetchSingleBookQuery } from '../../redux/feature/book/bookApi';
import { useParams } from 'react-router-dom';
import { getUrl } from '../../utils/getUrl';
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/feature/cart/CartSlice';

const SingleBook = () => {
    
    const dispatch = useDispatch();

    const { id } = useParams();

    const {data : book, isLoading, isError} = useFetchSingleBookQuery(id);
    console.log(book)

    if(isLoading) return <div>Loading</div>
    if(isError) return <div>Error fetching book</div>

    
    const hanleAddToCart = (product) => {
        dispatch(addToCart(product));
    }

  return (
    <div>
        {book && (
           <div className=" max-w-lg shadow-md p-5">
             <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
                {book?.title}
              </h3>

          <div className="">
          <div className="">
              <img
                src={book?.coverImage}
                alt=""
                className="mb-8"
              />

          </div>

          <div>
           
        
            <p className="text-gray-600 mb-5">{book.description}</p>
            <p className="font-medium mb-5">
            {book.newPrice} <span className="line-through font-normal ml-2">{book.oldPrice}</span>
            </p>
            <button
            onClick={()=> hanleAddToCart(book)}
            className="btn-primary px-6 space-x-1 flex items-center gap-1 ">
              <FiShoppingCart className="" />
              <span>Add to Cart</span>
            </button>
          </div>
          </div>
        </div>
        )}
        
    </div>
  )
}

export default SingleBook