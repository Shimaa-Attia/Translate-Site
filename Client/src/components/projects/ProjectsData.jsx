"use client"
import axios from "axios";
import Joi from "joi";
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
  //edit topic
  // let [isOpen, setIsOpen] = useState(false);
  // let [topicId, setTopicId] = useState('');
  // let [topics, setTopics] = useState({
  //     name: '',
  //     price: ''
  // });
  //getting data for one country 
  // let [oneTopic, setOneTopic] = useState([]);
  // let getOneTopic = async (topId) => {
  //     try {
  //         let { data } = await axios.get(`http://127.0.0.1:8000/api/fields/show/${topId}`)
  //         if (data) {
  //             setOneTopic(data.data);
  //             setTopics({
  //                 name: data?.data?.name,
  //                 price: data?.data?.price
  //             })
  //         }
  //     } catch (error) {
  //         toast.error('Something went wrong.')
  //     }
  // }
  // let getInputValue = (event) => {
  //     let myTopics = { ...topics };
  //     myTopics[event?.target?.name] = event?.target?.value;
  //     setTopics(myTopics);
  // }
  // let sendingEditedTopicDataToApi = async (topId) => {
  //     await axios.put(`http://127.0.0.1:8000/api/fields/${topId}`, topics).then((res) => {
  //         toast.success(res?.data?.message);
  //         getTopicsData();
  //     }).catch((errors) => {
  //         const errorList = errors?.response?.data?.message;
  //         if (errorList !== undefined) {
  //             Object.keys(errorList)?.map((err) => {
  //                 errorList[err]?.map((err) => {
  //                     toast.error(err)
  //                 })
  //             });
  //         } else {
  //             toast.error('Something went wrong.')
  //         }
  //     })
  // }
  // let validateEditedTopicForm = () => {
  //     const schema = Joi.object({
  //         name: Joi.string().required(),
  //         price: Joi.number().empty(null),
  //     });
  //     return schema.validate(topics, { abortEarly: false });
  // };
  // let submitEditedTopicForm = async (e) => {
  //     e.preventDefault();
  //     let validation = validateEditedTopicForm();
  //     if (!validation?.error) {
  //         sendingEditedTopicDataToApi(topicId);
  //         setTopics({ name: '', price: '' });

  //     } else {
  //         try {
  //             validation?.error?.details?.map((err) => {
  //                 toast.error(err.message);
  //             })
  //         } catch (e) {
  //             toast.error('Something went wrong.')
  //         }
  //     }
  // }
  let showProjects = () => {
    if (projectsData.length > 0) {
      return (
        <div className="shadow rounded my-4 bg-gray-100 mx-3 p-3  ">
          <table>
            <thead >
              <tr>
                <th>Name</th>
                <th>File</th>
                <th>Client Name</th>
                <th>Client Email</th>
                <th>From</th>
                <th>To</th>
                <th>Orderd?</th>
                <th>Package</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {projectsData.map((proj, index) => <tr key={index}>
                <td>{proj.name}</td>
                <td>file</td>
                <td>{proj.client.name}</td>
                <td>{proj.client.email}</td>
                <td>{proj.from_language.name}</td>
                <td>{proj.from_language.name}</td>
                <td>{proj.is_orderd}</td>
                <td>{proj.is_orderd}</td>
                <td>{proj.is_orderd}</td>
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
