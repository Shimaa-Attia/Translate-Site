import React from 'react'
import Link from 'next/link'
import AdminMenu from '../menu/AdminMenu'


export default function AdminNavbar() {
   
    
    return (
        <>
            <nav className="fixed top-0  p-1 w-full bg-slate-300 border-b  border-gray-200 ">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <div className='block md:hidden '>
                                <AdminMenu />
                            </div>
                            <div>
                                <span >Logo</span>
                            </div>
                        </div>
                        <div className=" items-center me-3 text-gray-700   ">
                            <div>
                                <ul className='flex gap-3 font-medium' >
                                    <li>
                                        <Link href='/admin/account'>
                                            <div className=" p-1 ">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6  h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <div className='bg-white rounded p-1' >Logout</div>
                                    </li>
                                </ul>


                            </div>
                        </div>
                    </div>
                </div>
            </nav>


        </>
    )
}
