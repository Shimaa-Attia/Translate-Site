"use client"
import axios from "axios";
import Joi from "joi";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function AddTopic() {
  const nameInputRef = useRef(null);
  const priceInputRef = useRef(null);
  let [topics, setTopics] = useState({
    name: '',
    price: ''
  });
  let getInputValue = (event) => {
    let myTopics = { ...topics };
    myTopics[event?.target?.name] = event?.target?.value;
    setTopics(myTopics);
  }
  let sendingTopicsDataToApi = async () => {
    await axios.post(`http://127.0.0.1:8000/api/fields`, topics).then((res) => {
      toast.success(res?.data?.message);
    nameInputRef.current.value=''
    priceInputRef.current.value=''
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
  let validateTopicsForm = () => {
    const schema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().empty(''),
    });
    return schema.validate(topics, { abortEarly: false });
  };
  let submitTopicsForm = async (e) => {
    e.preventDefault();
    let validation = validateTopicsForm();
    if (!validation?.error) {
      sendingTopicsDataToApi();
      setTopics({ name: '', price: '' });
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
      <form onSubmit={submitTopicsForm}>
        <div>
          <label htmlFor="name"
            className="block text-sm font-semibold text-gray-800"
          >Topic</label>
          <input
            name="name"
            type="text"
            ref={nameInputRef}
            onChange={getInputValue}
            className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"
            placeholder="enter topic..."
          />
        </div>
        <div className="my-2">
          <label htmlFor="price"
            className="block text-sm font-semibold text-gray-800"
          >Price</label>
          <input
            name="price"
            type="text"
            ref={priceInputRef}
            onChange={getInputValue}
            className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"
            placeholder="enter price..."
          />
        </div>
        <button type='submit' className="w-full py-2  text-white  bg-gray-600 rounded-md ">Add Topic</button>
      </form>
    </>
  )
}
