import React from 'react'

const SelectField = ({label, name, options, register}) => {
  return (
    <div>
        <label className="block text-sm font-semibold text-gray-700">{label}</label>
        <select name="" id=""
            {...register(name, {required: true})}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
            {
                options.map((option)=>(
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))
            }
        </select>
    </div>
  )
}

export default SelectField