"use client"
import axios from "axios";
import Joi from "joi";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function AddPackages() {
  const nameInputRef = useRef(null);
  const worduniteInputRef = useRef(null);
  const increasePercentageInputRef = useRef(null);
  const expectedNumberOfDaysInputRef = useRef(null);
  let [packages, setPackages] = useState({
    name: '',
    word_unite: '',
    increasePercentage: '',
    expected_numOfDays:'',
    description:''
  });
  let getInputValue = (event) => {
    let myPackages = { ...packages };
    myPackages[event?.target?.name] = event?.target?.value;
    setPackages(myPackages);
  }
  let sendingPackagesDataToApi = async () => {
    await axios.post(`http://127.0.0.1:8000/api/packages`, packages).then((res) => {
      toast.success(res?.data?.message);
    nameInputRef.current.value=''
    worduniteInputRef.current.value=''
    increasePercentageInputRef.current.value=''
    expectedNumberOfDaysInputRef.current.value=''
    }).catch((errors) => {
      const errorList = errors?.response?.data?.message;
      if (errorList !== undefined) {
        Object.keys(errorList)?.map((err) => {
          errorList[err]?.map((err) => {
            console.log(err);
       toast.error(err)
          })
        });
      } else {
        toast.error('Something went wrong.')
      }
    })
  }
  let validatePackagesForm = () => {
    const schema = Joi.object({
      name: Joi.string().required(),
      word_unite:Joi.number().required(),
      increasePercentage:Joi.number().required(),
      expected_numOfDays:Joi.number().required(),
      description:Joi.string().empty('')
    });
    return schema.validate(packages, { abortEarly: false });
  };
  let submitPakagesForm = async (e) => {
    e.preventDefault();
    let validation = validatePackagesForm();
    if (!validation?.error) {
      sendingPackagesDataToApi();
      setPackages({
        name: '',
        word_unite: '',
        increasePercentage: '',
        expected_numOfDays:'',
        description:''
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
  return (
    <>
      <form onSubmit={submitPakagesForm}>
        <div>
          <label htmlFor="name"
            className="block text-sm font-semibold text-gray-800"
          >Package Name</label>
          <input
            name="name"
            type="text"
            ref={nameInputRef}
            onChange={getInputValue}
            className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"
            placeholder="enter name..."
          />
        </div>
        <div className="my-2">
          <label htmlFor="word_unite"
            className="block text-sm font-semibold text-gray-800"
          >Word Unite</label>
          <input
            name='word_unite'
            type="number"
            ref={worduniteInputRef}
            onChange={getInputValue}
            className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"
            placeholder="enter unite..."
          />
        </div>
        <div className="my-2">
          <label htmlFor="increasePercentage"
            className="block text-sm font-semibold text-gray-800"
          >Increase Percentage</label>
          <input
            name="increasePercentage"
            type="number"
            ref={increasePercentageInputRef}
            onChange={getInputValue}
            className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"
            placeholder="enter percentage..."
          />
        </div>
        <div className="my-2">
          <label htmlFor="expected_numOfDays"
            className="block text-sm font-semibold text-gray-800"
          > Expected number of days</label>
          <input
            name="expected_numOfDays"
            type="number"
            ref={expectedNumberOfDaysInputRef}
            onChange={getInputValue}
            className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"
            placeholder="enter number..."
          />
        </div>
        <div className="my-2">
          <label htmlFor="description"
            className="block text-sm font-semibold text-gray-800"
          > Description </label>
          <input
            name="description"
            type="text"
            ref={expectedNumberOfDaysInputRef}
            onChange={getInputValue}
            className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"
            placeholder="enter description..."
          />
        </div>
        <button type='submit' className="w-full py-2  text-white  bg-gray-600 rounded-md ">Add Package</button>
      </form>
    </>
  )
}
