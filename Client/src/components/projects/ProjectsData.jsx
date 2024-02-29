"use client"
import { AppContext } from "@/context";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
export function ProjectsData() {



  // getting projects 
  let [projectsData, setProjectsData] = useState([]);
  let getProjectsData = async () => {
    try {
      let { data } = await axios.get(`http://127.0.0.1:8000/api/projects`)
      if (data) {
        setProjectsData(data.data);
      }
    } catch (error) {
      toast.error('Something went wrong.')
    }
  }
  useEffect(() => {
    getProjectsData()
  }, [])

  let showProjects = () => {
    if (projectsData.length > 0) {
      return (
    <div className="">
          
          <table className=" border border-slate-500 my-4 bg-gray-100  text-center ">
            <thead className="bg-gray-400 " >
              <tr >
                <th className="border p-1" >Project name</th>
                <th className="border p-1">Files</th>
                <th className="border p-1">Client email</th>
                <th className="border p-1">From</th>
                <th className="border p-1">To</th>
                <th className="border p-1">Orderd?</th>
                <th className="border p-1">Package</th>
                <th className="border p-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projectsData.map((proj, index) => <tr key={index}>
                <td className="border p-1">{proj?.name}</td>
                <td className="border p-1 ">
                  {proj.attachments?.length > 0 ? (
                    proj.attachments.map((attachment, attachmentIndex) => (
                      <div key={attachmentIndex}>
                        <Link href={attachment.file} passHref >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                          </svg>
                        </Link>
                      </div>
                    ))
                  ) : (
                    'No attachments'
                  )}
                </td>
                <td className="border p-1">{proj.client.email}</td>
                <td className="border p-1">{proj.from_language.name}</td>
                <td className="border p-1">{proj.from_language.name}</td>
                <td className="border p-1">{proj.is_orderd}</td>
                <td className="border p-1">{proj?.package?.name}</td>
                <td className="border p-1">
                  <div className=" flex  cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-600">
                      <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                      <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-600">
                      <path fillRule="evenodd" d="M6 4.75A.75.75 0 0 1 6.75 4h10.5a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 4.75ZM6 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 10Zm0 5.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75a.75.75 0 0 1-.75-.75ZM1.99 4.75a1 1 0 0 1 1-1H3a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1v-.01ZM1.99 15.25a1 1 0 0 1 1-1H3a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1v-.01ZM1.99 10a1 1 0 0 1 1-1H3a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1V10Z" clipRule="evenodd" />
                    </svg>

                  </div>
                </td>

              </tr>

              )}
            </tbody>

          </table>
    </div>

      )
    } else {
      return (
        <>
        <div className="flex items-center justify-center h-screen">

            <span className="font-medium">Loading...</span>
        </div>
    </>
      )
    }
  }
  return (
    <>
      <div>
        {showProjects()}
        {/* edit modal */}
        {/* <div className={`fixed  inset-0 w-full bg-gray-900 bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
                    <div className="flex items-center justify-center min-h-screen">
                        <div className=" relative bg-white p-8 rounded shadow-lg">
                            <div className="absolute top-4 right-4 cursor-pointer " onClick={() => { setIsOpen(false) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                            <div className="pt-6">
                                <form onSubmit={submitEditedTopicForm} >
                                    <div>
                                        <label htmlFor="name"
                                            className="block text-sm font-semibold text-gray-800"
                                        >Topic</label>
                                        <input
                                            name="name"
                                            type="text"
                                            onChange={getInputValue}
                                            defaultValue={oneTopic?.name}
                                            className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"
                                        />
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="price"
                                            className="block text-sm font-semibold text-gray-800"
                                        >Price</label>
                                        <input
                                            name="price"
                                            type="text"
                                            onChange={getInputValue}
                                            defaultValue={oneTopic?.price}
                                            className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"
                                        />
                                    </div>
                                    <button type='submit' className="w-full py-2  text-white  bg-gray-600 rounded-md " >Edit Topic</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div> */}
      </div>

    </>
  )
}
