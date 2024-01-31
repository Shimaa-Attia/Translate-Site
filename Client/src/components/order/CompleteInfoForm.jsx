"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'
import { toast } from 'sonner';

export default function CompleteInfoForm() {
    let [compltionInfo, setCompltionInfo] = useState({
        name: '',
        deliveryDate: '',
        package_id: '',
        project_id: '',
        price: '',
        notes: ''
    })
    //get the valus from local stroge 
    let getDataFromLocaleStorge = () => {
        let projectId = localStorage.getItem('projectId');
        let packageId = localStorage.getItem('packageId');
        let packagePrice = localStorage.getItem('packagePrice');
        let packageDate = localStorage.getItem('packageDate');
        setCompltionInfo(prevState => ({
            ...prevState,
            project_id: projectId,
            package_id: packageId,
            price: packagePrice,
            deliveryDate: packageDate
        }));
    }
    let getInputValue = (event) => {
        let { name, value } = event?.target;
        setCompltionInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
        getDataFromLocaleStorge();
    }
    let [successMsg, setSuccessMsg] = useState('');
    let [errorMsg, setErrorMsg] = useState('');
    let sendComltionInfoToApi = async () => {
        await axios.post(`http://127.0.0.1:8000/api/projects/completeInfo`, compltionInfo).then((res) => {
            console.log(res);
            setSuccessMsg(res.data.message)
        }).catch((errors) => {
            console.log(errors);
            const errorList = errors?.response?.data?.message;
            console.log(errorList);
            if (errorList !== undefined) {
                Object.keys(errorList)?.map((err) => {
                    errorList[err]?.map((err) => {
                        setErrorMsg(err);
                    })
                });
            } else {
                toast.error('Something went wrong.')
            }
        })
    }
    let validateComleteInfoForm = () => {
        const schema = Joi.object({
            name: Joi.string().required(),
            word_unite: Joi.number().required(),
            increasePercentage: Joi.number().required(),
            expected_numOfDays: Joi.number().required(),
            description: Joi.string().empty('')
        });
        return schema.validate(packages, { abortEarly: false });
    };
    let submitComleteInfoForm = async (e) => {
        e.preventDefault();
        sendComltionInfoToApi()
        // let validation = validatePackagesForm();
        // if (!validation?.error) {
        //   sendingPackagesDataToApi();
        //   setPackages({
        //     name: '',
        //     word_unite: '',
        //     increasePercentage: '',
        //     expected_numOfDays:'',
        //     description:''
        //   });
        // } else {
        //   try {
        //     validation?.error?.details?.map((err) => {
        //       toast.error(err.message);
        //     })
        //   } catch (e) {
        //     toast.error('Something went wrong.')
        //   }
        // }
    }
    let [clientData, setClientData] = useState({
        name: '',
        phones: '',
        email: ''
    })
    let getClientInputValue = (event) => {
        let { name, value } = event?.target;
        setClientData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    let [clientSuccMsg , setClientSuccMsg] = useState('')
    let sendClientDataToApi = async () => {
        await axios.post(`http://127.0.0.1:8000/api/clients`, clientData).then((res) => {
            console.log(res);
            setClientSuccMsg(res.data.message)
        }).catch((errors) => {
            console.log(errors);
            const errorList = errors?.response?.data?.message;
            console.log(errorList);
            if (errorList !== undefined) {
                Object.keys(errorList)?.map((err) => {
                    errorList[err]?.map((err) => {
                        setErrorMsg(err);
                    })
                });
            } else {
                toast.error('Something went wrong.')
            }
        })
    }
    let validateClientDataForm = () => {
        const schema = Joi.object({
            name: Joi.string().required(),
            word_unite: Joi.number().required(),
            increasePercentage: Joi.number().required(),
            expected_numOfDays: Joi.number().required(),
            description: Joi.string().empty('')
        });
        return schema.validate(packages, { abortEarly: false });
    };
    let submitClientDataForm = async (e) => {
        e.preventDefault();
        sendClientDataToApi()
        // let validation = validatePackagesForm();
        // if (!validation?.error) {
        //   sendingPackagesDataToApi();
        //   setPackages({
        //     name: '',
        //     word_unite: '',
        //     increasePercentage: '',
        //     expected_numOfDays:'',
        //     description:''
        //   });
        // } else {
        //   try {
        //     validation?.error?.details?.map((err) => {
        //       toast.error(err.message);
        //     })
        //   } catch (e) {
        //     toast.error('Something went wrong.')
        //   }
        // }
    }

    return (
        <>
            {successMsg.length > 0 ? <div className='text-center p-4 my-3 w-[90%] text-gray-800 m-auto bg-emerald-400'>{successMsg}</div> : ''}
            <div className='bg-blue-100 p-4  container m-auto'>
                <form onSubmit={submitComleteInfoForm} >
                    <div className=' w-[70%] m-auto'>
                        <div className='my-5'>
                            <label htmlFor="name"
                                className="block text-sm font-semibold text-gray-800"
                            >Project name </label>
                            <input
                                placeholder='E.g My website translation'
                                type="text"
                                name='name'
                                onChange={getInputValue}
                                className="block w-full  p-[6px] border border-gray-300 text-gray-700 bg-white  rounded focus:border-blue-500 focus:border-2  focus:outline-none "
                            />
                        </div>

                        <div className=''>
                            <label htmlFor='notes'
                                className="block text-sm font-semibold text-gray-800"
                            >Notes</label>
                            <textarea
                                onChange={getInputValue}
                                type="text"
                                name='notes'
                                className="block w-full  p-[6px] border border-gray-300 text-gray-700 bg-white  rounded focus:border-blue-500 focus:border-2  focus:outline-none "
                                placeholder='Type notes...'
                            />
                        </div>

                    </div>
                    <div >
                        <button type='submit' className=" mt-14 w-1/5 float-end  py-2  text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-indigo-600">continue</button>
                        <p className='clear-end'></p>
                    </div>
                </form>
            </div>
            {/* clientData */}
            {clientSuccMsg.length > 0 ? <div className='text-center p-4 my-3 w-[90%] text-gray-800 m-auto bg-emerald-400'>{clientSuccMsg}
            <Link href='/payment' className='bg-blue-500 text-white p-3 rounded' >Go to payment</Link>
            </div> : ''}

            {successMsg.length > 0 &&
                <div>
                    <p className='text-center text-2xl ]'>Client Info</p>
                    <div className='bg-blue-100 p-4  container m-auto'>
                        <form onSubmit={submitClientDataForm} >
                            <div className=' w-[70%] m-auto'>
                                <div className='my-5'>
                                    <label htmlFor="name"
                                        className="block text-sm font-semibold text-gray-800"
                                    > Name </label>
                                    <input
                                        placeholder='Enter your name...'
                                        type="text"
                                        name='name'
                                        onChange={getClientInputValue}
                                        className="block w-full  p-[6px] border border-gray-300 text-gray-700 bg-white  rounded focus:border-blue-500 focus:border-2  focus:outline-none "
                                    />
                                </div>
                                <div className='my-5'>
                                    <label htmlFor="email"
                                        className="block text-sm font-semibold text-gray-800"
                                    > Email </label>
                                    <input
                                        placeholder='Enter your email...'
                                        type="text"
                                        name='email'
                                        onChange={getClientInputValue}
                                        className="block w-full  p-[6px] border border-gray-300 text-gray-700 bg-white  rounded focus:border-blue-500 focus:border-2  focus:outline-none "
                                    />
                                </div>
                                <div className='my-5'>
                                    <label htmlFor="phone"
                                        className="block text-sm font-semibold text-gray-800"
                                    > Phone </label>
                                    <input
                                        placeholder='Enter your phone...'
                                        type="text"
                                        name='phone'
                                        onChange={getClientInputValue}
                                        className="block w-full  p-[6px] border border-gray-300 text-gray-700 bg-white  rounded focus:border-blue-500 focus:border-2  focus:outline-none "
                                    />
                                </div>
                            </div>
                            <div >
                                <button type='submit' className=" mt-8 w-1/5 float-end  py-2  text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-indigo-600">Save Data</button>
                                <p className='clear-end'></p>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}
