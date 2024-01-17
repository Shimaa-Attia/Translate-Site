"use client"
import axios from "axios";
import Joi from "joi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export function CountriesData() {
  // getting countries 
  let [searchText, setSearchText] = useState('');
  function handleSearchChange(event) {
    setSearchText(event.target.value)
  };
  let [countriesData, setCountriesData] = useState([]);
  let getCountriesData = async () => {
    try {
      if (searchText !== undefined && searchText.trim().length > 0) {
        let { data } = await axios.get(`http://127.0.0.1:8000/api/countries/search/${searchText.trim()}`)
        if (data) {
          setCountriesData(data);
        }
      }
    } catch (error) {
      toast.error('Something went wrong.')
    }
  }
  useEffect(() => {
    getCountriesData()
  }, [searchText]);
  //edit countries 
  let [isOpen, setIsOpen] = useState(false);
  let [countryId, setCountryId] = useState('');
  let [countries, setCountries] = useState({
    name: '',
    code: '',
    price: ''
  });
  //getting data for one country 
  let [oneCountry, setOneCountry] = useState([]);
  let getOneCountry = async (countId) => {
    try {
      let { data } = await axios.get(`http://127.0.0.1:8000/api/countries/show/${countId}`)
      if (data) {
        setOneCountry(data);
        setCountries({
          name:data?.name,
          code:data?.code,
          price:data?.price
        })
      }
    } catch (error) {
      toast.error('Something went wrong.')
    }
  }
  let getInputValue = (event) => {
    let myCountries = { ...countries };
    myCountries[event?.target?.name] = event?.target?.value;
    setCountries(myCountries);
  }
  let sendingEditedCountriesDataToApi = async (countId) => {
    await axios.put(`http://127.0.0.1:8000/api/countries/${countId}`, countries).then((res) => {
      toast.success(res?.data?.message);

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
  let validateEditedCountriesForm = () => {
    const schema = Joi.object({
      name: Joi.string().required(),
      code: Joi.string().empty(null),
      price: Joi.number().empty(null),
    });
    return schema.validate(countries, { abortEarly: false });
  };
  let submitEditedCountryForm = async (e) => {
    e.preventDefault();
    let validation = validateEditedCountriesForm();
    if (!validation?.error) {
      sendingEditedCountriesDataToApi(countryId);
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
      <div>
        <input
          type="search"
          onChange={handleSearchChange}
          className="px-4 w-full py-2  text-gray-700 bg-white border rounded-md  focus:outline-none"
          placeholder="Search for country..."
        />
      </div>
      <div>
        {searchText.trim().length > 0 &&
          <div>
            {countriesData.length > 0 ? (<div>
              {countriesData?.map((count) => (
                <div key={count.id} className="bg-gray-300  rounded p-1 flex  justify-between  mt-3">
                  <p>{count?.name}</p>
                  <p>{count?.price}$</p>
                  <div className='text-gray-600 cursor-pointer' onClick={() => {
                    setCountryId(count.id)
                    getOneCountry(count.id)
                    setIsOpen(true)
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>) : (
              <div className="bg-red-300 mt-10 p-1 rounded text-center text-gray-800">There are no matches for this search</div>
            )}
          </div>}
      </div>
      {/* edit modal */}
      <div className={`fixed  inset-0 w-full bg-gray-900 bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
        <div className="flex items-center justify-center min-h-screen">
          <div className=" relative bg-white p-8 rounded shadow-lg">
            <div className="absolute top-4 right-4 cursor-pointer " onClick={() => { setIsOpen(false) }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <div className="pt-6">
              <form onSubmit={submitEditedCountryForm} >
                <div>
                  <label htmlFor="name"
                    className="block text-sm font-semibold text-gray-800"
                  >Country</label>
                  <input
                    name="name"
                    type="text"
                    onChange={getInputValue}
                    defaultValue={oneCountry?.name}
                    className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"
                  />
                </div>
                <div className="my-2">
                  <label htmlFor="code"
                    className="block text-sm font-semibold text-gray-800"
                  >Code</label>
                  <input
                    name='code'
                    type="text"
                    onChange={getInputValue}
                    defaultValue={oneCountry?.code}
                    className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"
                  />
                </div>
                <div className="my-2">
                  <label htmlFor="price"
                    className="block text-sm font-semibold text-gray-800"
                  >Price</label>
                  <input
                    name="price"
                    type="text"
                    onChange={getInputValue}
                    defaultValue={oneCountry?.price}
                    className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"
                  />
                </div>
                <button type='submit' className="w-full py-2  text-white  bg-gray-600 rounded-md " >Edit Country</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
