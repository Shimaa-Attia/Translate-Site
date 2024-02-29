"use client"
import axios from 'axios';
import Joi from 'joi';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner';

export default function AboutData() {
    // getting about 
    let [aboutData, setAboutData] = useState([]);
    let getAboutData = async () => {
        try {
            let { data } = await axios.get(`http://127.0.0.1:8000/api/about`)
            if (data) {
                setAboutData(data);
            }
        } catch (error) {
            toast.error('Something went wrong.')
        }
    }
    useEffect(() => {
        getAboutData()
    }, [])
      //edit about
      const formRef = useRef(null);
      let [isOpen, setIsOpen] = useState(false);
      let [aboutId, setAboutId] = useState('');
      let [about, setAbout] = useState({
          name: '',
          desc: ''
      });
        //getting data for one about 
    let [oneAbout, setOneAbout] = useState([]);
    let getOneAbout = async (aboutId) => {
        try {
            let { data } = await axios.get(`http://127.0.0.1:8000/api/about/show/${aboutId}`)
            if (data) {
                setOneAbout(data);
                setAbout({
                    name: data?.data?.name,
                    desc: data?.data?.desc
                })
            }
        } catch (error) {
            toast.error('Something went wrong.')
        }
    }
    useEffect(() => {
        if (aboutId) {
            getOneAbout(aboutId)
        }
    }, [aboutId])
    let getInputValue = (event) => {
      let myAbout = { ...about };
      myAbout[event?.target?.name] = event?.target?.value;
      setAbout(myAbout);
  }
  let sendingEditedAboutDataToApi = async (aboutId) => {
      await axios.put(`http://127.0.0.1:8000/api/about/${aboutId}`, about).then((res) => {
          toast.success(res?.data?.message);
          getAboutData();
          setAbout({
            name: '',
            desc: ''
        });
        setAboutId('')
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
  let validateEditedAboutForm = () => {
      const schema = Joi.object({
          name: Joi.string().empty(''),
          desc: Joi.string().empty(''),
      });
      return schema.validate(about, { abortEarly: false });
  };
  let submitEditedAboutForm = async (e) => {
      e.preventDefault();
      let validation = validateEditedAboutForm();
      if (!validation?.error) {
          sendingEditedAboutDataToApi(aboutId);
          setAbout({ name: '', desc: '' });

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
  let showAbout = () => {
    if (aboutData?.length > 0) {
        return (
            <div>
                {aboutData?.map((about) => (
                    <div key={about.id} className="bg-gray-300  rounded p-1     mt-3">
                        <p>{about?.name}</p>
                        <p>{about?.desc}</p>
                        <div className='text-gray-600 cursor-pointer' onClick={() => {
                            setAboutId(about.id)
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
          <span>Loading...</span>
        </>
      )
    }
}
  return (
  <>
  <div>
                {showAbout()}
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
                                <form ref={formRef} onSubmit={submitEditedAboutForm} >
                                    <div>
                                        <label htmlFor="name"
                                            className="block text-sm font-semibold text-gray-800"
                                        >Name</label>
                                        <input
                                            name="name"
                                            type="text"
                                            onChange={getInputValue}
                                            defaultValue={oneAbout?.name}
                                            className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"
                                        />
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="desc"
                                            className="block text-sm font-semibold text-gray-800"
                                        >Description</label>
                                        <textarea
                                            name="desc"
                                            type="text"
                                            onChange={getInputValue}
                                            defaultValue={oneAbout?.desc}
                                            className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"
                                        />
                                    </div>
                                    <button type='submit' className="w-full py-2  text-white  bg-gray-600 rounded-md " >Edit About</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  </>
  )
}
