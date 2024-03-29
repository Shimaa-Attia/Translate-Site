
"use client"
import axios from 'axios';
import Joi from 'joi';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner';

export default function HomeData() {
    // getting home 
    let [homeData, setHomeData] = useState([]);
    let getHomeData = async () => {
        try {
            let { data } = await axios.get(`http://127.0.0.1:8000/api/customFields/getCustomList/homeDescription`)
            if (data) {
                setHomeData(data.data);
            }
        } catch (error) {
            toast.error('Something went wrong.')
        }
    }
    useEffect(() => {
        getHomeData()
    }, [])
      //edit home data
      const formRef = useRef(null);
      let [isOpen, setIsOpen] = useState(false);
      let [homeId, setHomeId] = useState('');
      let [homeDesc, setHomeDesc] = useState({
          name: ''
      });
        //getting data for one homeDesc 
    let [onehomeDesc, setOnehomeDesc] = useState([]);
    let getOneHomeDesc = async (homeId) => {
        try {
            let { data } = await axios.get(`http://127.0.0.1:8000/api/customFields/show/${homeId}`)
            if (data) {
                setOnehomeDesc(data.data);
                setHomeDesc({
                    name: data?.data?.name
                })
            }
        } catch (error) {
            toast.error('Something went wrong.')
        }
    }
    useEffect(() => {
        if (homeId) {
            getOneHomeDesc(homeId)
        }
    }, [homeId])
    let getInputValue = (event) => {
      let myHomeDesc = { ...homeDesc };
      myHomeDesc[event?.target?.name] = event?.target?.value;
     
      setHomeDesc(myHomeDesc);
  }
  let sendingEditedHomeDataToApi = async (homeId) => {
      await axios.put(`http://127.0.0.1:8000/api/customFields/${homeId}`, homeDesc).then((res) => {
          toast.success(res?.data?.message);
          getHomeData();
          setHomeDesc({
            name: '',
        });
        setHomeId('')
        formRef.current.reset()
        setIsOpen(false)
      }).catch((errors) => {
        console.log(errors);
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
  let validateEditedHomeForm = () => {
      const schema = Joi.object({
          name: Joi.string().empty(''),
      });
      return schema.validate(homeDesc, { abortEarly: false });
  };
  let submitEditedHomeForm = async (e) => {
      e.preventDefault();
      let validation = validateEditedHomeForm();
      if (!validation?.error) {
          sendingEditedHomeDataToApi(homeId);
         

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
  let showHome = () => {
    if (homeData?.length > 0) {
        return (
            <div>
                {homeData?.map((desc , index) => (
                    <div key={index} className="bg-gray-300  rounded p-1     mt-8">
                        <p>{desc?.name}</p>
                        <div className='text-gray-600 cursor-pointer' onClick={() => {
                            setHomeId(desc.id)
                            setIsOpen(true)
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        )
    }else{
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
                {showHome()}
                {/* edit modal */}
                <div className={`fixed z-40 inset-0 w-full bg-gray-900 bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
                    <div className="flex  items-center justify-center min-h-screen">
                        <div className=" w-2/4 relative bg-white p-8 rounded shadow-lg">
                            <div className="absolute top-4 right-4 cursor-pointer " onClick={() => { setIsOpen(false) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                            <div className="pt-6">
                                <form ref={formRef} onSubmit={submitEditedHomeForm} >
                                    <div>
                                        <label htmlFor="name"
                                            className="block text-sm font-semibold text-gray-800"
                                        >Description</label>
                                        <textarea
                                            name="name"
                                            type="text"
                                            onChange={getInputValue}
                                            defaultValue={onehomeDesc?.name}
                                            className="px-4 w-full py-2 my-2 text-gray-700 bg-white border rounded-md  focus:outline-none"
                                        />
                                    </div>
        
                                    <button type='submit' className="w-full py-2  text-white  bg-gray-600 rounded-md " >Edit Home Desc</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  </>
  )
}
