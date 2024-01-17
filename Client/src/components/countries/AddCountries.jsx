"use client"
import axios from "axios";
import Joi from "joi";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function AddCountries() {
  const nameInputRef = useRef(null);
  const codeInputRef = useRef(null);
  const priceInputRef = useRef(null);
  let [countries, setCountries] = useState({
    name: '',
    code: '',
    price: ''
  });
  let getInputValue = (event) => {
    let myCountries = { ...countries };
    myCountries[event?.target?.name] = event?.target?.value;
    setCountries(myCountries);
  }
  let sendingCountriesDataToApi = async () => {
    await axios.post(`http://127.0.0.1:8000/api/countries`, countries).then((res) => {
      toast.success(res?.data?.message);
    nameInputRef.current.value=''
    codeInputRef.current.value=''
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
  let validateCountriesForm = () => {
    const schema = Joi.object({
      name: Joi.string().required(),
      code: Joi.string().empty(''),
      price: Joi.number().empty(''),
    });
    return schema.validate(countries, { abortEarly: false });
  };
  let submitCountriesForm = async (e) => {
    e.preventDefault();
    let validation = validateCountriesForm();
    if (!validation?.error) {
      sendingCountriesDataToApi();
      setCountries({ name: '', code: '', price: '' });
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
      <form onSubmit={submitCountriesForm}>
        <div>
          <label htmlFor="name"
            className="block text-sm font-semibold text-gray-800"
          >Country</label>
          <input
            name="name"
            type="text"
            ref={nameInputRef}
            onChange={getInputValue}
            className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"
            placeholder="enter country..."
          />
        </div>
        <div className="my-2">
          <label htmlFor="code"
            className="block text-sm font-semibold text-gray-800"
          >Code</label>
          <input
            name='code'
            type="text"
            ref={codeInputRef}
            onChange={getInputValue}
            className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"
            placeholder="enter code..."
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
        <button type='submit' className="w-full py-2  text-white  bg-gray-600 rounded-md ">Add Country</button>
      </form>
    </>
  )
}
