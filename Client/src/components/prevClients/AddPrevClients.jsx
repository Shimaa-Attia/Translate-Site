

"use client"
import axios from "axios";
import Joi from "joi";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function AddPrevClients() {
  const formRef = useRef(null);
  let [prevClient, setPrevClient] = useState({
    name: '',
    clientLogo: ''
  });
  let getInputValue = (event) => {
    let myPrevClient = { ...prevClient };
    myPrevClient[event?.target?.name] = event?.target?.value;
    setPrevClient(myPrevClient);
}
let handleImageChange=(e)=>{
    setPrevClient({...prevClient,
    clientLogo:e.target.files[0]});
  }
let sendPrevClientDataToApi = async () => {
    const clients = new FormData()
    clients.append('name', prevClient.name);
    clients.append('clientLogo', prevClient.clientLogo);
    await axios.post(`http://127.0.0.1:8000/api/previousClients`, clients).then((res) => {
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
let validatePrevClientForm = () => {
    const schema = Joi.object({
        name: Joi.string().required(),
        clientLogo: Joi.any(),
    });
    return schema.validate(prevClient, { abortEarly: false });
};
let submitPrevClientForm = async (e) => {
    e.preventDefault();
    let validation = validatePrevClientForm();
    if (!validation?.error) {
        sendPrevClientDataToApi();
        setPrevClient({ name: '', clientLogo: '' });

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
      <form ref={formRef} onSubmit={submitPrevClientForm}>
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
          <label htmlFor="clientLogo"
            className="block text-sm font-semibold text-gray-800"
          >Client Logo</label>
          <input
            name="clientLogo"
            type="file" accept='image/*'
            onChange={handleImageChange}
            className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"
          />
        </div>
        <button type='submit' className="w-full py-2  text-white  bg-gray-600 rounded-md ">Add Client</button>
      </form>
    </>
  )
}
