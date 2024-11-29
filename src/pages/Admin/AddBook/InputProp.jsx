import React from 'react'

const InputProp = ({type='text', label, placeholder,name, register }) => {
  return (
    <div className='my-3'>
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
        <input type= {type}
        className=" p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
        {...register(name, { required: true })}
        placeholder={placeholder}
        />
    </div>
  )
}

export default InputProp