
import React from 'react'
import Link from "next/link";
import Menu from '../menu/Menu';


export default function Navbar() {

  return (
    <>
      <nav className="h-12 bg-white p-8 fixed  top-0 w-full  text-[#0f264d] flex justify-between items-center font-serif border-b " >
        {/* logo */}
        <div>
          <Link href='/' >Logo</Link>
        </div>
        <div className='text-xl md:hidden'>
          <Menu />
        </div>
        <div className='hidden md:flex items-center gap-5 font-semibold text-base lg:text-lg ' >
          <Link href='/' >Home</Link>
          <Link href='/about' >About us</Link>
          <Link href='/services' >Our Services</Link>
          <Link href='/clients' >Clients</Link>
          <div className='border p-2 '>
          <Link href='/contact'>Contact us</Link>
          </div>
          <div className='bg-yellow-500 text-white  p-2 rounded '>
          <Link href='/quote'>Instant quote</Link>
          </div>
        
        </div>
      </nav>



    </>
  )
}