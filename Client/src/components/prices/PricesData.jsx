"use client"
import React, { useRef } from 'react'
import axios from "axios";
import Joi from "joi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export function PricesData() {
    // getting Prices
    let [pricesData, setPricesData] = useState([]);
    let getPricesData = async () => {
        try {
            let { data } = await axios.get(`http://127.0.0.1:8000/api/prices`)
            if (data) {
                setPricesData(data);
            }
        } catch (error) {
            toast.error('Something went wrong.')
        }
    }
    useEffect(() => {
        getPricesData()
    }, [])
    //edit default price
    const formRef = useRef(null);
    let [isOpen, setIsOpen] = useState(false);
    let [priceId, setPriceId] = useState('');
    let [prices, setPrices] = useState({
        price: ''
    });
    // //getting data for one package 
    let [onePrice, setOnePrice] = useState([]);
    let getOnePrice = async (pricId) => {
        try {
            let { data } = await axios.get(`http://127.0.0.1:8000/api/prices/show/${pricId}`)
            if (data) {
                setOnePrice(data);
                setPrices({
                    price: data?.price
                })
            }
        } catch (error) {
            toast.error('Something went wrong.')
        }
    }
    useEffect(() => {
        if (priceId) {
            getOnePrice(priceId)
        }
    }, [priceId])
    let getInputValue = (event) => {
        setPrices({
            ...prices,
            price: event.target.value
        })
    }
    let sendingEditedPriceDataToApi = async (pricId) => {
        await axios.put(`http://127.0.0.1:8000/api/prices/${pricId}`, prices).then((res) => {
            toast.success(res?.data?.message);
            getPricesData()
            setPrices({
                price: ''
            });
            setPriceId('')
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
    let validateEditedPriceForm = () => {
        const schema = Joi.object({
            price: Joi.number().required()
        });
        return schema.validate(prices, { abortEarly: false });
    };
    let submitEditedPricesForm = async (e) => {
        e.preventDefault();
        let validation = validateEditedPriceForm();
        if (!validation?.error) {
            sendingEditedPriceDataToApi(priceId);
            setPrices({
                price: '',
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
    let showPrices = () => {
        if (pricesData.length > 0) {
            return (
                <div className='bg-gray-200 p-4  m-4  rounded-lg  '>
                    {pricesData.map((price) => (
                        <div key={price.id} className="inline-block  ">
                            <div className="bg-white  p-2 w-[150px] m-3 text-center   rounded-md ">
                                <p>{price.type}</p>
                                <p>${price.price}</p>
                                <div className="text-gray-600 cursor-pointer" onClick={() => {
                                    setPriceId(price.id)
                                    setIsOpen(true)
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
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
                    <div className="flex items-center justify-center h-screen">

                        <span className="font-medium">Loading...</span>
                    </div>
                </>
            )
        }
    }

    return (
        <>
            {showPrices()}
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
                            <form ref={formRef} onSubmit={submitEditedPricesForm}  >
                                <div>
                                    <label htmlFor="name"
                                        className="block text-sm font-semibold text-gray-800"
                                    >Price</label>
                                    <input
                                        name="name"
                                        type="number"
                                        onChange={getInputValue}
                                        defaultValue={onePrice?.price}
                                        className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"
                                    />
                                </div>
                                <button type='submit' className="w-full py-2  text-white  bg-gray-600 rounded-md ">Edit Price</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
