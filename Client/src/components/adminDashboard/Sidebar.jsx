"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const pathName = usePathname();
    let [publicSubmenuOpen, setPublicSubmenuOpen] = useState(false);
    let togglePublicSubmenu = () => {
        setPublicSubmenuOpen(!publicSubmenuOpen);
    }

    return (
        <>
            <aside className=" hidden lg:block md:block fixed  top-[4.05rem] h-[calc(100vh-4rem)]  text-gray-700 left-0  w-60  pt-16  bg-slate-300 border-r  border-gray-200 ">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-slate-300 ">
                    <ul className="space-y-2 font-medium">
                        <li>
                                    <div onClick={togglePublicSubmenu} className='flex items-center cursor-pointer p-2 rounded-lg  hover:bg-gray-700 hover:text-white '>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25" />
                                        </svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap">Public</span>
                                    </div>

                               
                         
                            {publicSubmenuOpen &&
                                <ul>
                                    <li>
                                        <Link href='/admin/home'>
                                        <div className={pathName == '/admin/home' ? 'text-white rounded-lg mx-4 bg-gray-700' : ''} >
                                                <div className='mx-4 my-1 flex items-center p-2 rounded-lg  hover:bg-gray-700 hover:text-white '>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                                    </svg>
                                                    <span className="flex-1 ms-3 whitespace-nowrap">Home</span>
                                                </div>

                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href='/admin/about'>
                                            <div className={pathName == '/admin/about' ? 'text-white rounded-lg mx-4 bg-gray-700' : ''} >
                                                <div className='mx-4 flex items-center p-2 rounded-lg  hover:bg-gray-700 hover:text-white '>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                                                    </svg>
                                                    <span className="flex-1 ms-3 whitespace-nowrap">About</span>
                                                </div>

                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href='/admin/services'>
                                            <div className={pathName == '/admin/services' ? 'text-white mx-4 rounded-lg bg-gray-700' : ''} >
                                                <div className='mx-4 my-1 flex items-center p-2 rounded-lg  hover:bg-gray-700 hover:text-white '>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
                                                    </svg>
                                                    <span className="flex-1 ms-3 whitespace-nowrap">Services</span>
                                                </div>

                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href='/admin/reviews'>
                                            <div className={pathName == '/admin/reviews' ? 'text-white mx-4 rounded-lg bg-gray-700' : ''} >
                                                <div className='mx-4 flex items-center p-2 rounded-lg  hover:bg-gray-700 hover:text-white '>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                                    </svg>
                                                    <span className="flex-1 ms-3 whitespace-nowrap">Reviews</span>
                                                </div>

                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href='/admin/prevclients'>
                                        <div className={pathName == '/admin/prevclients' ? 'text-white mx-4 rounded-lg bg-gray-700' : ''} >
                                                <div  className='mx-4 my-1 flex items-center p-2 rounded-lg  hover:bg-gray-700 hover:text-white '>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                                    </svg>
                                                    <span className="flex-1 ms-3 whitespace-nowrap">Our Clients</span>
                                                </div>

                                            </div>
                                        </Link>
                                    </li>

                                </ul>
                            }
                        </li>
                        <li>
                            <Link href='/admin/projects'>
                                <div className={pathName == '/admin/projects' ? 'text-white rounded-lg bg-gray-700' : ''}>
                                    <div className="flex items-center p-2 rounded-lg   hover:bg-gray-700 hover:text-white ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                                        </svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap">Projects</span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href='/admin/prices'>
                                <div className={pathName == '/admin/prices' ? 'text-white rounded-lg bg-gray-700' : ''}>
                                    <div className="flex items-center p-2  rounded-lg   hover:bg-gray-700 hover:text-white ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap">Default Prices</span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href='/admin/clients'>
                                <div className={pathName == '/admin/clients' ? 'text-white rounded-lg bg-gray-700' : ''}>
                                    <div className="flex items-center p-2  rounded-lg   hover:bg-gray-700 hover:text-white ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                        </svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap">Clients</span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href='/admin/countries'>
                                <div className={pathName == '/admin/countries' ? 'text-white rounded-lg bg-gray-700' : ''}>
                                    <div className="flex items-center p-2  rounded-lg   hover:bg-gray-700 hover:text-white ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                                        </svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap">Countries</span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href='/admin/languages'>
                                <div className={pathName == '/admin/languages' ? 'text-white rounded-lg bg-gray-700' : ''}>
                                    <div className="flex items-center p-2  rounded-lg   hover:bg-gray-700 hover:text-white ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                                        </svg>

                                        <span className="flex-1 ms-3 whitespace-nowrap">Languages</span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href='/admin/packages'>
                                <div className={pathName == '/admin/packages' ? 'text-white rounded-lg bg-gray-700' : ''}>
                                    <div className="flex items-center p-2  rounded-lg   hover:bg-gray-700 hover:text-white ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                                        </svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap">Packages</span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href='/admin/topics'>
                                <div className={pathName == '/admin/topics' ? 'text-white rounded-lg bg-gray-700' : ''}>
                                    <div className="flex items-center p-2  rounded-lg   hover:bg-gray-700 hover:text-white ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                        </svg>

                                        <span className="flex-1 ms-3 whitespace-nowrap">Topics</span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>

        </>
    )
}
