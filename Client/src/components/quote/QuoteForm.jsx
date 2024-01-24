"use client"
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { toast } from 'sonner';
import axios from 'axios';
import Link from 'next/link';
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
    setFileNames(fileArray.map(file => file.name).join(', '));
    setProject({
      ...project,
      attachments: fileArray
    })

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
  };
  let handleToLangChange = (selectedOption) => {
    let selectedValues = selectedOption.map((opt) => opt.value)
    setProject((prevProject) => ({
      ...prevProject,
      to_languages: selectedValues,
    }));
  };

  let handleTopicChange = (selectedOption) => {
    setProject({
      ...project,
      feild_name: selectedOption.value
    })
  };
  //get yhe value of word count and email
  let getInputValue = (event) => {
    let myProject = { ...project };
    myProject[event?.target?.name] = event?.target?.value;
    setProject(myProject);
  }
  let [errorMsg, setErrorMsg] = useState('')
  let [packagesData, setPackagesData] = useState([])
  let sendingProjectDataToApi = async () => {
    let projectData = new FormData();
    projectData.append('from_language', project.from_language);
    projectData.append('feild_name', project.feild_name);
    projectData.append('client_email', project.client_email);
    projectData.append('numOfWords', project.numOfWords);
    // Append each language value separately
    project.to_languages.forEach((value, index) => {
      projectData.append(`to_languages[${index}]`, value);
    });
    // Append attachments
    project.attachments.forEach((file, index) => {
      projectData.append(`attachments[${index}]`, file);
    });
    await axios.post(`http://127.0.0.1:8000/api/projects`, projectData).then((res) => {
      console.log(res);
      localStorage.setItem('projectId', res.data.project_id)
      setPackagesData(res.data.packages)
      toast.success(res?.data?.message);
    }).catch((errors) => {
      console.log(errors);
      const errorList = errors?.response?.data?.message;
      console.log(errorList);
      if (errorList !== undefined) {
        Object.keys(errorList)?.map((err) => {
          errorList[err]?.map((err) => {
            console.log(err);
            setErrorMsg([...err])
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
      word_unite: Joi.number().required(),
      increasePercentage: Joi.number().required(),
      expected_numOfDays: Joi.number().required(),
      description: Joi.string().empty('')
    });
    return schema.validate(packages, { abortEarly: false });
  };
  let submitProjectForm = async (e) => {
    e.preventDefault();
    sendingProjectDataToApi()
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
      <div className='bg-gray-200 container py-8 shadow-lg m-auto' >
        {errorMsg.length > 0 ? <div className='bg-red-400'>{errorMsg}</div> : ''}

        <form onSubmit={submitProjectForm} >
          <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 w-[90%]  m-auto'>
            <div>
              <label htmlFor="from_language"
                className="block text-sm font-semibold text-gray-800"
              >From</label>
              <DynamicSelect
                options={languagesOptions}
                onChange={handleFromLangChange}
                placeholder='Select language...'
              />
            </div>
            <div>
              <label htmlFor="to_languages"
                className="block text-sm font-semibold text-gray-800 "
              >To <span className='text-[13px]  float-end text-blue-600'>(you can add multiple languages)</span>
              <p className='clear-end'></p>
               </label>
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
            <div>
              <label htmlFor="subject"
                className="block text-sm font-semibold text-gray-800"
              >Subject </label>
              <DynamicSelect
                options={topicsOptions}
                onChange={handleTopicChange}
                placeholder='Select subject...'

              />
            </div>
            <div>
              <label className='text-sm font-semibold '>File</label>
              <div className='bg-white border overflow-hidden border-gray-300 rounded  text-gray-500 p-[6px] '>
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
            <div className='mt-1'>
              <label htmlFor="numOfWords"
                className="block text-sm font-semibold text-gray-800"
              >Word Count</label>
              <input
                placeholder='Enter number of words...'
                type="number"
                id='numOfWords'
                name='numOfWords'
                onChange={getInputValue}
                className="block w-full  p-[6px] border border-gray-300 text-gray-700 bg-white  rounded focus:border-blue-500 focus:border-2  focus:outline-none "
              />

            </div>
            <div className='mt-1'>
              <label htmlFor='client_email'
                className="block text-sm font-semibold text-gray-800"
              >Email</label>
              <input
                onChange={getInputValue}
                type="email"
                id='client_email'
                name='client_email'
                className="block w-full  p-[6px] border border-gray-300 text-gray-700 bg-white  rounded focus:border-blue-500 focus:border-2  focus:outline-none "
                placeholder='Type your email...'
              />
            </div>
            <div>
              <button type='submit' className="w-full py-2  text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-indigo-600">Show Prices</button>
            </div>
          </div>
        </form>
        <div>
      
          {packagesData.length > 0 &&
            <div>
              {packagesData.length > 0 ? (
                <div className='flex border-1 mx-9 shadow my-7 border-gray-300'>
                  {packagesData?.map((pack, index) => (
                    <div key={index} className=" bg-white p-8 text-center w-1/3 border">
                   
                        <p className='text-2xl font-semibold my-3'>{pack?.package_name}</p>
                        <p className=''>{pack?.package_desc}</p>
                        <p className='text-sm mt-14 text-gray-500'>delivery guaranteed by</p>
                        <p className='font-medium'>{pack?.deliveryDate}</p>
                        <p className='text-sm text-gray-500'>Need it faster?</p>
                        <p className='text-2xl  font-semibold my-6'>${pack?.price}</p>
                        <button className='bg-blue-800 text-gray-200 py-2 w-1/2 rounded' onClick={()=>{
                          localStorage.setItem("packageId" , pack.package_id)
                          localStorage.setItem("packagePrice" , pack.price)
                          localStorage.setItem("packageDate" , pack.deliveryDate)
                        }}>
                          <Link href='/order'>Order</Link>
                          </button>
                
                    </div>
                  ))}
                </div>
              ) : ''}
            </div>
         } 
        </div>
      </div>
    </>
  )
}
