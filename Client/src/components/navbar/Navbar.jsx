"use client"

import Link from "next/link";
import Menu from '../menu/Menu';
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { AppContext } from "@/context";

export default function Navbar() {
  const pathName = usePathname();

  let renderLink = (href, text) => (
    <div className={pathName === href ? "text-gray-400" : ""}>
      <Link href={href}>{text}</Link>
    </div>
  );
  return (
    <>
      <nav className="h-12 bg-[#182078] mb-2 shadow-md p-10 z-10  sticky text-white  top-0 w-full  flex justify-between items-center  " >
        {/* logo */}
        <div className=" w-full lg:w-4/5 flex justify-between mx-auto">
          <div className="flex items-center">
            <Link href='/' >Logo</Link>
          </div>
          <div className='text-xl md:hidden'>
            <Menu />
          </div>
          <div className='hidden md:flex items-center gap-4 font-semibold text-sm lg:text-lg ' >
            {renderLink("/", "Home")}
            {renderLink("/about", "About us")}
            {renderLink("/services", "Our Services")}
            {renderLink("/clients", "Clients")}
            <div className={`border p-2 ${pathName === "/contact" ? "text-gray-400" : ""}`}>
              <Link href="/contact">Contact us</Link>
            </div>
            <div className='transition ease-in-out delay-150  bg-indigo-600 text-white  hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 duration-300    p-2 rounded '>
              <Link href='/quote'>Instant quote</Link>
            </div>

          </div>
        </div>

      </nav>




    </>
  )
}