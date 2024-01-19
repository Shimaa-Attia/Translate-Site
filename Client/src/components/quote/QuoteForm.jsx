"use client"
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { toast } from 'sonner';
import axios from 'axios';
const DynamicSelect = dynamic(() => import('react-select'), { ssr: false });

export default function QuoteForm() {
  let [project, setProject] = useState({
    feild_name: '',
    from_language: '',
    to_languages: [],
    attachments: [],
    numOfWords: '',
    client_email: '',
  })
  const [fileNames, setFileNames] = useState('');
  const handleFileChange = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    setFileNames(fileArray.map(file => file.name).join(', '));;
  };
  //getting language data to display in select 
  let [languagesData, setLanguagesData] = useState([]);
  let getLanguagesData = async () => {
    try {
      let { data } = await axios.get(`http://127.0.0.1:8000/api/languages`)
      if (data) {
        setLanguagesData(data);
      }
    } catch (error) {
      toast.error('Something went wrong.')
    }
  }
  useEffect(() => {
    getLanguagesData()
  }, [])
  //making map on the languages data to display the name in the option
  let [languagesOptions, setLanguagesOptions] = useState([])
  useEffect(() => {
    let mapLanguages = languagesData?.map((lang) => ({
      value: `${lang.id}`,
      label: `${lang.name}`
    }));
    setLanguagesOptions(mapLanguages);
  }, [languagesData]);
  // getting topics to put in select
  let [topicsData, setTopicsData] = useState([]);
  let getTopicsData = async () => {
    try {
      let { data } = await axios.get(`http://127.0.0.1:8000/api/fields`)
      if (data) {
        setTopicsData(data.data);
      }
    } catch (error) {
      toast.error('Something went wrong.')
    }
  }
  useEffect(() => {
    getTopicsData()
  }, [])
    //making map on the topic data to display the name in the option
  let [topicsOptions, setTopicsOptions] = useState([])
  useEffect(() => {
    let mapTopics = topicsData?.map((top) => ({
      value: `${top.name}`,
      label: `${top.name}`
    }));
    setTopicsOptions(mapTopics);
  }, [topicsData]);
  let handleFromLangChange = (selectedOption) => {
    setProject({
      ...project,
      from_language: selectedOption.value
    })
    console.log(selectedOption.value);
    console.log({ ...project });
  };
  let handleToLangChange = (selectedOption) => {
    // console.log(selectedOption.map((opt) => opt.value));
  let op= selectedOption.map((opt) => opt.value)
   console.log(op);
    setProject({...project,
    to_language:[...op]
    })

    console.log({...project});
  };
  
  let handleTopicChange = (selectedOption) => {
    setProject({...project,
    feild_name:selectedOption.value
    })
    console.log({...project});
  };






  return (
    <>
      <div className='bg-gray-200 container py-4 shadow-lg m-auto' >

        <form>
          <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 w-[90%]  m-auto'>
            <div>
              <label htmlFor="from"
                className="block text-sm font-semibold text-gray-800"
              >From</label>
              <DynamicSelect
                options={languagesOptions}
                onChange={handleFromLangChange}
                placeholder='Select language...'
              />
            </div>
            <div>
              <label htmlFor="to"
                className="block text-sm font-semibold text-gray-800 "
              >To <span className='text-[13px]  float-end text-blue-600'>(you can add multiple languages)</span> </label>
              <DynamicSelect
                options={languagesOptions}
                onChange={handleToLangChange}
                isMulti
                placeholder='Select language...'
                classNames={{
                  control: () => "border  border-gray-300 rounded-md",
                }}
              />

            </div>
            <div className=' '>
              <div className='bg-white border overflow-hidden border-gray-300 rounded  text-gray-500 p-[6px] mt-5'>
                <label htmlFor="fileInput" className='inline-block'>
                  {fileNames || 'Upload files...'}
                </label>
              </div>
              <input
                multiple
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                style={{ display: 'none' }}

              />
            </div>
            {/* <div>
              <label htmlFor="code"
                className="block text-sm font-semibold text-gray-800"
              >Translation project name</label>
              <input
                type="text"
                className="block w-full  p-[6px] border border-gray-300 text-gray-700 bg-white  rounded focus:border-blue-500 focus:border-2  focus:outline-none "
                placeholder='Name your project...'
              />

            </div> */}
            <div>
              <label htmlFor="code"
                className="block text-sm font-semibold text-gray-800"
              >Word Count</label>
              <input
                type="number"
                className="block w-full  p-[6px] border border-gray-300 text-gray-700 bg-white  rounded focus:border-blue-500 focus:border-2  focus:outline-none "
              />

            </div>

            <div>
              <label htmlFor="code"
                className="block text-sm font-semibold text-gray-800"
              >Subject </label>
              <DynamicSelect
                options={topicsOptions}
                onChange={handleTopicChange}
                placeholder='Select subject...'

              />
            </div>
            <div>
              <label htmlFor="code"
                className="block text-sm font-semibold text-gray-800"
              >Email</label>
              <input
                type="email"
                className="block w-full  p-[6px] border border-gray-300 text-gray-700 bg-white  rounded focus:border-blue-500 focus:border-2  focus:outline-none "
                placeholder='Type your email...'
              />

            </div>

            <div className=''>
              <div className=" text-center cursor-pointer mt-5 py-2 text-white  bg-blue-700 rounded-md hover:bg-indigo-600">Show Price</div>
            </div>
          </div>

        </form>
      </div>
    </>
  )
}
