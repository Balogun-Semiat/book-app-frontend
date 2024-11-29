import React, { useEffect } from 'react'
import InputProp from '../AddBook/InputProp'
import SelectField from '../AddBook/SelectField';
import { useForm } from "react-hook-form";
import { useFetchSingleBookQuery, useUpdateBookMutation } from '../../../redux/feature/book/bookApi';
import { useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';
import getBaseUrl from '../../../utils/baseUrl';
import axios from 'axios';
import Swal from 'sweetalert2';

const Editbook = () => {

  const {id} = useParams();
  const {data: bookData, isLoading, isError} = useFetchSingleBookQuery(id);
  const [updateBook ] = useUpdateBookMutation();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    console.log(bookData)
    if(bookData){
      setValue('title', bookData.title);
      setValue('description', bookData.description);
      setValue('category', bookData.category);
      setValue('oldPrice', bookData.oldPrice);
      setValue('newPrice', bookData.newPrice);
      setValue('coverImage', bookData.coverImage);
      setValue('trending', bookData.trending);
    }
  }, [bookData, setValue])
  
  const onSubmit = async(data)=>{
    const updatedBookData = {
      title: data.title,
      description: data.description,
      category: data.category,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: data.coverImage || bookData.coverImage,
      trending: data.trending
    };

    try {
       const response = await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updatedBookData, {
        headers:{
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
       })
       Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Book uploaded successfully",
        showConfirmButton: false,
        timer: 1500
      });
      await refetch()
      console.log("Book updated successfully", response.data);
    } catch (error) {
      console.error("Unable to edit data", error)
    }
  }

  if(isLoading) return <Loader />
  if(isError) return <div>Error fetching book data</div>

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

    <form onSubmit={handleSubmit(onSubmit)}>
      <InputProp
        label="Title"
        name="title"
        placeholder="Enter book title"
        register={register}
      />

      <InputProp
        label="Description"
        name="description"
        placeholder="Enter book description"
        type="textarea"
        register={register}
      />

      <SelectField
        label="Category"
        name="category"
        options={[
          { value: '', label: 'Choose A Category' },
          { value: 'business', label: 'Business' },
          { value: 'technology', label: 'Technology' },
          { value: 'fiction', label: 'Fiction' },
          { value: 'horror', label: 'Horror' },
          { value: 'adventure', label: 'Adventure' },
        ]}
        register={register}
      />
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            {...register('trending')}
            className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
        </label>
      </div>

      <InputProp
        label="Old Price"
        name="oldPrice"
        type="number"
        placeholder="Old Price"
        register={register}
      />

      <InputProp
        label="New Price"
        name="newPrice"
        type="number"
        placeholder="New Price"
        register={register}
      />

      <InputProp
        label="Cover Image URL"
        name="coverImage"
        type="text"
        placeholder="Cover Image URL"
        register={register}
      />

      <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
        Update Book
      </button>
    </form>
  </div>
  )
}

export default Editbook