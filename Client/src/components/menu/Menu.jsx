"use client"
import React, { useState } from 'react';
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import Link from 'next/link';

export default function Menu() {
    //open menu icon in mobile show
    let [open, setOpen] = useState(false);
    
    const links = [
        { id: 1, title: 'Home', url: '/' },
        { id: 2, title: 'About us', url: '/about' },
        { id: 3, title: 'Our Services', url: '/services' },
        { id: 4, title: 'Clients', url: '/clients' },
        { id: 5, title: 'Contact us', url: '/contact' },
    ]
    return (
        <>
            <div >
                {!open ? (<IoMenu className='cursor-pointer text-2xl' onClick={() => { setOpen(true) }} />)
                    : (<IoMdClose className='cursor-pointer text-2xl' onClick={() => { setOpen(false) }} />)}
                {open && <div className='bg-[#f5e5c6] absolute right-0 top-16 h-[calc(100vh-4rem)] flex flex-col gap-4 z-10 w-[50%] pt-10 ps-4'>
                    {links.map((item) => (
                        <Link href={item.url} key={item.id} onClick={() => { setOpen(false) }} >
                            {item.title}</Link>
                    ))}
                </div>}
            </div>
        </>
    )
}
