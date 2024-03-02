"use client"
import React, { useRef } from 'react'
import axios from "axios";
import Joi from "joi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export function PackagesData() {
    // getting Packages 
    let [packagesData, setPackagesData] = useState([]);
    let getPackagesData = async () => {
        try {
            let { data } = await axios.get(`http://127.0.0.1:8000/api/packages`)
            if (data) {
                setPackagesData(data);
            }
        } catch (error) {
            toast.error('Something went wrong.')
        }
    }
    useEffect(() => {
        getPackagesData()
    }, [])
    //edit package
    const formRef = useRef(null);
    let [isOpen, setIsOpen] = useState(false);
    let [packageId, setPackageId] = useState('');
    let [packages, setPackages] = useState({
        name: '',
        word_unite: '',
        increasePercentage: '',
        expected_numOfDays: '',
        description: ''
    });
    //getting data for one package 
    let [onePackage, setOnePackage] = useState([]);
    let getOnePackage = async (packId) => {
        try {
            let { data } = await axios.get(`http://127.0.0.1:8000/api/packages/show/${packId}`)
            if (data) {
                setOnePackage(data);
                setPackages({
                    name: data?.name || '',
                    word_unite: data?.word_unite || '',
                    increasePercentage: data?.increasePercentage || '',
                    expected_numOfDays: data?.expected_numOfDays || '',
                    description: data?.description || ''
                })
            }
        } catch (error) {
            toast.error('Something went wrong.')
        }
    }
    useEffect(() => {
        if (packageId) {
            getOnePackage(packageId)
        }
    }, [packageId])
    let getInputValue = (event) => {
        let myPackages = { ...packages };
        myPackages[event?.target?.name] = event?.target?.value;
        setPackages(myPackages);
    }
    let sendingEditedPackageDataToApi = async (packId) => {
        await axios.put(`http://127.0.0.1:8000/api/packages/${packId}`, packages).then((res) => {
            toast.success(res?.data?.message);
            getPackagesData()
            setPackages({
                name: '',
                word_unite: '',
                increasePercentage: '',
                expected_numOfDays: '',
                description: ''
            });
            setPackageId('')
            formRef.current.reset()
            setIsOpen(false)
        }).catch((errors) => {
            const errorList = errors?.response?.data?.message;
            if (errorList !== undefined) {
                Object.keys(errorList)?.map((err) => {
                    errorList[err]?.map((err) => {
                        toast.error(err)
                    })
                });
            } else {
                toast.error('Something went wrong.')
            }
        })
    }
    let validateEditedPackageForm = () => {
        const schema = Joi.object({
            name: Joi.string().required(),
            word_unite: Joi.number().required(),
            increasePercentage: Joi.number().required(),
            expected_numOfDays: Joi.number().required(),
            description: Joi.any().empty('')
        });
        return schema.validate(packages, { abortEarly: false });
    };
    let submitEditedPackageForm = async (e) => {
        e.preventDefault();
        let validation = validateEditedPackageForm();
        if (!validation?.error) {
            sendingEditedPackageDataToApi(packageId);
            setPackages({
                name: '',
                word_unite: '',
                increasePercentage: '',
                expected_numOfDays: '',
                description: ''
            });
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
    let showPackages = () => {
        if (packagesData.length > 0) {
            return (
                <div>
                    {packagesData.map((pack) => (
                        <div key={pack.id} className=" inline-block">
                            <div className="bg-white  w-[190px] m-3 text-center p-1  rounded-md ">
                                <p>{pack.name}</p>
                                <p>unite: {pack.word_unite}</p>
                                <p>days: {pack.expected_numOfDays}</p>
                                <p>{pack.increasePercentage}%</p>
                                <div className='flex my-3'>
                                   <div className="text-gray-600 cursor-pointer" onClick={() => {
                                        setPackageId(pack.id)
                                        setIsOpen(true)
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-700">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                    </div>
                                    <div className='cursor-pointer' onClick={() => {
                                    deletePackage(pack.id)
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </div>

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
  //delete package 
  let deletePackage = async (packId) => {
    alert('Are you sure to delete this item?')
    try {
        let { data } = await axios.delete(`http://127.0.0.1:8000/api/packages/delete/${packId}`);
        toast.success(data.message)
        getPackagesData()
    } catch (error) {
        toast.error('Something went wrong.')
    }
}
    return (
        <>
            {showPackages()}
            {/* edit modal  */}
            <div className={`fixed z-40 inset-0 w-full bg-gray-900 bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="w-2/4 relative bg-white p-8 rounded shadow-lg">
                        <div className="absolute top-4 right-4 cursor-pointer " onClick={() => { setIsOpen(false) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <div className="pt-6">
                            <form ref={formRef} onSubmit={submitEditedPackageForm} >
                                <div>
                                    <label htmlFor="name"
                                        className="block text-sm font-semibold text-gray-800"
                                    >Package Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        onChange={getInputValue}
                                        defaultValue={onePackage?.name}
                                        className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"
                                    />
                                </div>
                                <div className="my-2">
                                    <label htmlFor="word_unite"
                                        className="block text-sm font-semibold text-gray-800"
                                    >Word Unite</label>
                                    <input
                                        name='word_unite'
                                        type="number"
                                        onChange={getInputValue}
                                        defaultValue={onePackage?.word_unite}
                                        className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"
                                    />
                                </div>
                                <div className="my-2">
                                    <label htmlFor="increasePercentage"
                                        className="block text-sm font-semibold text-gray-800"
                                    >Increase Percentage</label>
                                    <input
                                        name="increasePercentage"
                                        type=" number"
                                        onChange={getInputValue}
                                        defaultValue={onePackage?.increasePercentage}
                                        className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"
                                    />
                                </div>
                                <div className="my-2">
                                    <label htmlFor="expected_numOfDays"
                                        className="block text-sm font-semibold text-gray-800"
                                    > Expected number of days</label>
                                    <input
                                        name="expected_numOfDays"
                                        type="number"
                                        onChange={getInputValue}
                                        defaultValue={onePackage?.expected_numOfDays}
                                        className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"

                                    />
                                </div>
                                <div className="my-2">
                                    <label htmlFor="description"
                                        className="block text-sm font-semibold text-gray-800"
                                    > Description </label>
                                    <input
                                        name="description"
                                        type="text"
                                        onChange={getInputValue}
                                        defaultValue={onePackage?.description}
                                        className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"

                                    />
                                </div>
                                <button type='submit' className="w-full py-2  text-white  bg-gray-600 rounded-md ">Edit Package</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
