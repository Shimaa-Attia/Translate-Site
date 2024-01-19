"use client"
import React, { useState } from 'react';
import Link from 'next/link';


export default function Menu() {

    //open menu icon in mobile show
    let [open, setOpen] = useState(false);

    const links = [
        { id: 1, title: 'Home', url: '/' },
        { id: 2, title: 'About us', url: '/public/about' },
        { id: 3, title: 'Our Services', url: '/public/services' },
        { id: 4, title: 'Clients', url: '/public/clients' },
    ]
    return (
        <>
            <div >
                {!open ? (
                    <div className='cursor-pointer' onClick={() => { setOpen(true) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>)
                    : (
                        <div className='cursor-pointer' onClick={() => { setOpen(false) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                            </svg>
                        </div>
                    )}
                {open && (
                    <>
                        <div className='fixed mt-20 inset-0 bg-white bg-opacity-70 z-10'></div>
                        <div className='bg-blue-900 fixed right-0 top-20 h-[calc(100vh-5rem)] flex flex-col gap-4 z-20  w-[50%] pt-10 ps-4'>
                            {links.map((item) => (
                                <Link href={item.url} key={item.id} onClick={() => { setOpen(false) }} >
                                    {item.title}</Link>
                            ))}
                            <div className='border py-2 px-3 mx-auto rounded mt-6 ' onClick={() => { setOpen(false) }}>
                                <Link href='/public/contact'>Contact us</Link>
                            </div>
                            <div className='bg-blue-600 text-white mt-3 mx-auto p-2 rounded' onClick={() => { setOpen(false) }} >
                                <Link href='/public/quote'>Instant quote</Link>
                            </div>
                        </div>
                    </>
                )}
            </div >
        </>
    )
}
