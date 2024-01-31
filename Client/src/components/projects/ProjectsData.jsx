"use client"
import axios from "axios";
import Joi from "joi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export function ProjectsData() {
  // getting projects 
  let [projectsData, setProjectsData] = useState([]);
  let getProjectsData = async () => {
    try {
      let { data } = await axios.get(`http://127.0.0.1:8000/api/projects`)
      console.log(data);
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

        <div className="shadow rounded my-4  bg-gray-100 mx-3 p-3  ">

          <table className=" border border-slate-500  w-full text-center">
            <thead className="bg-gray-400 " >
              <tr >
                <th className="border p-1">Project name</th>
                <th className="border p-1">File</th>
                {/* <th className="border p-1">Client name</th> */}
                <th className="border p-1">Client email</th>
                <th className="border p-1">From</th>
                <th className="border p-1">To</th>
                <th className="border p-1">Orderd?</th>
                <th className="border p-1">Package</th>
                <th className="border p-1">Price</th>
                <th className="border p-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projectsData.map((proj, index) => <tr key={index}>
                <td className="border p-1">{proj?.name}</td>
                <td className="border p-1">
                  {proj.attachments?.length > 0 ? (
                    proj.attachments.map((attachment, attachmentIndex) => (
                      <div key={attachmentIndex}>
                        <Link href={attachment.file} passHref>
                      upload file
                        </Link>
                      </div>
                    ))
                  ) : (
                    'No attachments'
                  )}
                </td>
                {/* <td className="border p-1">{proj.client.name}</td> */}
                <td className="border p-1">{proj.client.email}</td>
                <td className="border p-1">{proj.from_language.name}</td>
                <td className="border p-1">{proj.from_language.name}</td>
                <td className="border p-1">{proj.is_orderd}</td>
                <td className="border p-1">{proj?.package?.name}</td>
                <td className="border p-1">{proj?.price}</td>
                <td className="border p-1">{proj?.price}</td>

              </tr>

              )}
            </tbody>

          </table>
        </div>
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
