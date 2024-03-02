"use client"
import axios from "axios";
import Joi from "joi";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
export function TopicsData() {
    // getting topics 
    let [topicsData, setTopicsData] = useState([]);
    let getTopicsData = async () => {
        try {
            let { data } = await axios.get(`http://127.0.0.1:8000/api/fields`)
            if (data) {
                setTopicsData(data.data);
            }
        } catch (error) {
            toast.error('Something went wrong.')
        }
    }
    useEffect(() => {
        getTopicsData()
    }, [])
    //edit topic
    const formRef = useRef(null);
    let [isOpen, setIsOpen] = useState(false);
    let [topicId, setTopicId] = useState('');
    let [topics, setTopics] = useState({
        name: '',
        price: ''
    });
    //getting data for one topic 
    let [oneTopic, setOneTopic] = useState([]);
    let getOneTopic = async (topId) => {
        try {
            let { data } = await axios.get(`http://127.0.0.1:8000/api/fields/show/${topId}`)
            if (data) {
                setOneTopic(data.data);
                setTopics({
                    name: data?.data?.name || '',
                    price: data?.data?.price || ''
                })
            }
        } catch (error) {
            toast.error('Something went wrong.')
        }
    }
    useEffect(() => {
        if (topicId) {
            getOneTopic(topicId)
        }
    }, [topicId])

    let getInputValue = (event) => {
        let myTopics = { ...topics };
        myTopics[event?.target?.name] = event?.target?.value;
        setTopics(myTopics);
    }
    let sendingEditedTopicDataToApi = async (topId) => {
        await axios.put(`http://127.0.0.1:8000/api/fields/${topId}`, topics).then((res) => {
            toast.success(res?.data?.message);
            getTopicsData();
            setTopics({
                name: '',
                price: ''
            });
            setTopicId('')
            formRef.current.reset()
            setIsOpen(false)
        }).catch((errors) => {
            const errorList = errors?.response?.data?.message;
            try {
                if (errorList !== undefined) {
                    Object.keys(errorList)?.map((err) => {
                        errorList[err]?.map((err) => {
                            toast.error(err)
                        })
                    });
                } else {
                    toast.error('Something went wrong.')
                }
            } catch (error) {
                toast.error('Something went wrong.')
            }

        })
    }
    let validateEditedTopicForm = () => {
        const schema = Joi.object({
            name: Joi.string().empty(''),
            price: Joi.any().empty(''),
        });
        return schema.validate(topics, { abortEarly: false });
    };
    let submitEditedTopicForm = async (e) => {
        e.preventDefault();
        let validation = validateEditedTopicForm();
        if (!validation?.error) {
            sendingEditedTopicDataToApi(topicId);


        } else {
            try {
                validation?.error?.details?.map((err) => {
                    toast.error(err.message);
                })
            } catch (e) {
                toast.error('Something went wrong.')
            }
        }
    }
    let showTopics = () => {
        if (topicsData.length > 0) {
            return (
                <div>
                    {topicsData?.map((top) => (
                        <div key={top.id} className="bg-gray-300  rounded p-1 flex  justify-between  mt-3">
                            <p>{top?.name}</p>
                            <p>{top?.price ? `$ ${top.price}`:"default"}</p>
                            <div className='flex'>
                                <div className='text-gray-600 cursor-pointer' onClick={() => {
                                    setTopicId(top.id)
                                    setIsOpen(true)
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-700">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </div>
                                <div className='cursor-pointer' onClick={() => {
                                    deleteTopic(top.id)
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
        } else {
            return (
                <>
                    <span>Loading...</span>
                </>
            )
        }
    }
      //delete topic 
  let deleteTopic = async (topId) => {
    alert('Are you sure to delete this item?')
    try {
        let { data } = await axios.delete(`http://127.0.0.1:8000/api/fields/delete/${topId}`);
        toast.success(data.message)
        getTopicsData()
    } catch (error) {
        toast.error('Something went wrong.')
    }
}
    return (
        <>
            <div>
                {showTopics()}
                {/* edit modal */}
                <div className={`fixed z-40 inset-0 w-full bg-gray-900 bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="w-2/4 relative bg-white p-8 rounded shadow-lg">
                            <div className="absolute top-4 right-4 cursor-pointer " onClick={() => { setIsOpen(false) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                            <div className="pt-6">
                                <form ref={formRef} onSubmit={submitEditedTopicForm} >
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
                </div>
            </div>

        </>
    )
}
