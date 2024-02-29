
"use client"
import axios from "axios";
import Joi from "joi";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function AddService() {
  const formRef = useRef(null);
  let [services, setServices] = useState({
    name: '',
    desc: ''
  });
  let getInputValue = (event) => {
    let myServices = { ...services };
    myServices[event?.target?.name] = event?.target?.value;
    setServices(myServices);
}
let sendServiceDataToApi = async () => {
    await axios.post(`http://127.0.0.1:8000/api/services`, services).then((res) => {
        toast.success(res?.data?.message);
        formRef.current.reset()
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
let validateServicesForm = () => {
    const schema = Joi.object({
        name: Joi.string().empty(''),
        desc: Joi.string().empty(''),
    });
    return schema.validate(services, { abortEarly: false });
};
let submitServicesForm = async (e) => {
    e.preventDefault();
    let validation = validateServicesForm();
    if (!validation?.error) {
        sendServiceDataToApi();
        setServices({ name: '', desc: '' });

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
      <form ref={formRef} onSubmit={submitServicesForm}>
        <div>
          <label htmlFor="name"
            className="block text-sm font-semibold text-gray-800"
          >Name</label>
          <input
            name="name"
            type="text"
            onChange={getInputValue}
            className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"
            placeholder="enter name..."
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
            className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"
            placeholder="enter description..."
          />
        </div>
        <button type='submit' className="w-full py-2  text-white  bg-gray-600 rounded-md ">Add Service</button>
      </form>
    </>
  )
}
