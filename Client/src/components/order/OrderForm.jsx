import React from 'react'

export default function OrderForm() {
    return (
        <>

            <div className='bg-blue-100 p-4 mt-60 container m-auto'>
                <form  >
                    <div className='grid lg:grid-cols-2 w-[80%] md:grid-cols-2 sm:grid-cols-1 gap-3   m-auto'>
                        <div className=''>
                            <label htmlFor="name"
                                className="block text-sm font-semibold text-gray-800"
                            >Project name </label>
                            <input
                                placeholder='E.g My website translation'
                                type="text"
                                id='name'
                                name='name'
                                // onChange={getInputValue}
                                className="block w-full  p-[6px] border border-gray-300 text-gray-700 bg-white  rounded focus:border-blue-500 focus:border-2  focus:outline-none "
                            />

                        </div>
                        <div className=''>
                            <label htmlFor='client_email'
                                className="block text-sm font-semibold text-gray-800"
                            >Email <span className='text-red-600' >*</span></label>
                            <input
                                // onChange={getInputValue}
                                type="email"
                                id='client_email'
                                name='client_email'
                                className="block w-full  p-[6px] border border-gray-300 text-gray-700 bg-white  rounded focus:border-blue-500 focus:border-2  focus:outline-none "
                                placeholder='Type your email...'
                            />
                        </div>
                        <div className=''>
                            <label htmlFor='notes'
                                className="block text-sm font-semibold text-gray-800"
                            >Notes</label>
                            <textarea
                                // onChange={getInputValue}
                                type="text"
                                id='notes'
                                name='notes'
                                className="block w-full  p-[6px] border border-gray-300 text-gray-700 bg-white  rounded focus:border-blue-500 focus:border-2  focus:outline-none "
                                placeholder='Type notes...'
                            />
                        </div>

                    </div>
                    <div >
                        <button type='submit' className=" mt-14 w-1/5 float-end  py-2  text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-indigo-600">Submit Order</button>
                        <p className='clear-end'></p>
                    </div>
                </form>
            </div>
        </>
    )
}
