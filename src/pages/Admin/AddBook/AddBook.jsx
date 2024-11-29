import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateBookMutation } from '../../../redux/feature/book/bookApi';
import InputProp from './InputProp';
import SelectField from './SelectField';
import Swal from 'sweetalert2';
import { getUrl } from '../../../utils/getUrl';

const AddBook = () => {

  const {register, handleSubmit, watch, formState : {errors}, reset } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [createBook, {isLoading, isError}] = useCreateBookMutation();
  const [imageFileName, setImageFileName] = useState('');

  const onSubmit= async(data)=>{
    const newBookData = {
      ...data,
      coverImage: imageFileName
    }


    try {
      await createBook(newBookData).unwrap();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Book uploaded successfully",
        showConfirmButton: false,
        timer: 1500
      });
      reset();
      setImageFileName('');
      setImageFile(null);
    } catch (error) {
      console.error(error);
      alert('Failed to add book')
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(file) {
        setImageFile(file);
        setImageFileName(file.name);
    }
  }
console.log(imageFile)

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md my-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

      <form action="" onSubmit={handleSubmit(onSubmit)}>

        <InputProp 
          label={"Title"}
          name={"title"}
          placeholder={"Enter book title"}
          register={register}
        />
        
        <InputProp 
          label="Description"
          name="description"
          placeholder="Enter book description"
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
             // Add more options as needed
          ]}
          register={register}
        />

         {/* Trending Checkbox */}
        <div className="my-3">
          <label className="inline-flex items-center">
            <input type="checkbox"
            {...register('trending')}
            className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
          </label>
        </div>
  
        <InputProp 
          label="Description"
          name="description"
          placeholder="Enter book description"
          register={register}
        />

        <InputProp 
          label={"Old Price"}
          name={"oldPrice"}
          placeholder={"Enter old price"}
          type='number'
          register={register}
        />

        <InputProp 
          label={"New Price"}
          name={"newPrice"}
          placeholder={"Enter new price"}
          type='number'
          register={register}
        />

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Cover Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*" 
            onChange={handleFileChange} 
            className="mb-2 w-full"
          />

          {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
      
        </div>

        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
         {
            isLoading ? <span className="">Adding.. </span> : <span>Add Book</span>
          }
        </button>

      </form>
    </div>
  )
}

export default AddBook