import React from 'react'
import { useGetOrdersByEmailQuery } from '../../redux/feature/order/orderApi'
import { useAuth } from '../../context/AuthContext';

const AllOrders = () => {
    const { currentUser } = useAuth()
    console.log(currentUser)
    const { data: orders=[], isLoading, isError} = useGetOrdersByEmailQuery(currentUser.email);
    console.log(orders)

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error getting orders data</div>

  

  return (
    <>
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">Your Orders</h1>
    
          {
            orders.length === 0 ? (
                <div> No order found </div>
            ) : (
               <div> 
                {
                     orders.map((order, index)=>(
                        <div key={index} className='my-6'>
                            <p className='mt-3 bg-secondary p-1 text-white w-10'> #{index + 1} </p>
                            <h2 className="font-bold">Order ID: {order?._id}</h2>
                            <p className="text-gray-600">Name: {order?.name}</p>
                            <p className="text-gray-600">Email: {order?.email}</p>
                            <p className="text-gray-600">Phone: {order?.phone}</p>
                            <p className="text-gray-600">TotalPrice: {order?.totalPrice}</p>
                            <h3 className="font-semibold mt-2">Address:</h3>
                            <p> {order.address.city}, {order.address.state}, {order.address.country} <br /> ZipCode: {order.address.zipcode}</p>
                            <h3 className="font-semibold mt-2">Products Id:</h3>
                            <ul>
                                {
                                    order.productIds.map((id)=>(
                                        <li key={id}>{id}</li> 
                                    ))
                                }
                                
                    
                            </ul>
                        </div>
                    ))
                }
               </div>
            )
          }

        </div>
    </>
  )
}

export default AllOrders