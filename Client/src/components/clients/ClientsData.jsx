"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
export function ClientsData() {
  // getting projects 
  let [clientsData, setClientsData] = useState([]);
  let getClientsData = async () => {
    try {
      let { data } = await axios.get(`http://127.0.0.1:8000/api/clients`)
      console.log(data);
      if (data) {
        setClientsData(data.data);
      }
    } catch (error) {
      toast.error('Something went wrong.')
    }
  }
  useEffect(() => {
    getClientsData()
  }, [])
  //edit client
  const formRef = useRef(null);
  let [isOpen, setIsOpen] = useState(false);
  let [clientId, setClientId] = useState('');
  let [clients, setClients] = useState({
    name: '',
    desc: ''
  });
  let getInputValue = (event) => {
    let myClients = { ...clients };
    myClients[event?.target?.name] = event?.target?.value;
    setClients(myClients);
  }
  let sendingEditedClientsDataToApi = async (clientId) => {
    await axios.put(`http://127.0.0.1:8000/api/clients/${clientId}`, clients).then((res) => {
      toast.success(res?.data?.message);
      getClientsData();
      setClients({
        name: '',
        desc: ''
      });
      setClientId('')
      formRef.current.reset()
      setIsOpen(false)
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
  let validateEditedClientsForm = () => {
    const schema = Joi.object({
      name: Joi.string().empty(''),
      desc: Joi.string().empty(''),
    });
    return schema.validate(about, { abortEarly: false });
  };
  let submitEditedClientsForm = async (e) => {
    e.preventDefault();
    let validation = validateEditedClientsForm();
    if (!validation?.error) {
      sendingEditedClientsDataToApi(clientId);
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
  let showClients = () => {
    if (clientsData.length > 0) {
      return (

        <div className="shadow rounded my-4  bg-gray-100 mx-3 p-3  ">

          <table className=" border border-slate-500  w-full text-center">
            <thead className="bg-gray-400 " >
              <tr >
                <th className="border p-1"> Name</th>
                <th className="border p-1"> Email</th>
                <th className="border p-1">Phone</th>
                <th className="border p-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clientsData.map((client, index) => <tr key={index}>
                <td className="border p-1">{client?.name}</td>
                <td className="border p-1">{client?.email}</td>
                <td className="border p-1">{client?.phone}</td>  
                <td className="border p-1">
                  <div className='cursor-pointer' onClick={() => {
                    deleteClient(client.id)
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600  m-auto">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </div>
                </td>

              </tr>

              )}
            </tbody>

          </table>
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
  //delete client 
  let deleteClient = async (clientId) => {
    alert('Are you sure to delete this item?')
    try {
      let { data } = await axios.delete(`http://127.0.0.1:8000/api/clients/delete/${clientId}`);
      toast.success(data.message)
      getClientsData()
    } catch (error) {
      toast.error('Something went wrong.')
    }
  }
  return (
    <>
      <div>
        {showClients()}
      </div>

    </>
  )
}
