
"use client"

import QuoteForm from "@/components/quote/QuoteForm";
import Link from "next/link";
import Menu from "@/components/menu/Menu";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function PublicData() {

  const navRef = useRef(null);
  const [activeSection, setActiveSection] = useState(null); // State to track active section
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const clientsRef = useRef(null);
  const reviewRef = useRef(null);
  const contactRef = useRef(null);
  useEffect(() => {
    // Function to scroll to the default selected section on component mount
    scrollToTop(homeRef, "home");
  }, []);
  const scrollToTop = (ref, section) => {
    if (ref && ref.current && navRef.current) {
      const topOffset = ref.current.offsetTop - navRef.current.offsetHeight;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
      setActiveSection(section); // Update active section

    }
  };
  //getting data of home description
  let [homeData, setHomeData] = useState([]);
  let getHomeData = async () => {
    try {
      let { data } = await axios.get(`http://127.0.0.1:8000/api/customFields/getCustomList/homeDescription`)
      if (data) {
        setHomeData(data.data);
      }
    } catch (error) {
      toast.error('Something went wrong.')
    }
  }
  useEffect(() => {
    getHomeData()
  }, [])
  let ShowHomeDesc = () => {
    if (homeData.length > 0) {
      return (
        <div>
          {homeData?.map((desc) => (
            <div key={desc.id} className="my-4">
              <p>{desc?.name}</p>
            </div>
          ))}
        </div>
      )
    }
  }
  // getting about 
  let [aboutData, setAboutData] = useState([]);
  let getAboutData = async () => {
    try {
      let { data } = await axios.get(`http://127.0.0.1:8000/api/about`)
      if (data) {
        setAboutData(data);
      }
    } catch (error) {
      toast.error('Something went wrong.')
    }
  }
  useEffect(() => {
    getAboutData()
  }, [])
  let showAbout = () => {
    if (aboutData?.length > 0) {
      return (
        <div className=" grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1  ">
          {aboutData?.map((about) => (
            <div key={about.id} className="my-1 p-4 bg-white m-2 rounded-md">
              <p className="text-blue-700 text-xl font-medium mb-4">{about?.name}</p>
              <p>{about?.desc}</p>

            </div>
          ))}
        </div>
      )
    }
  }
  // getting service
  let [servicesData, setServicesData] = useState([]);
  let getServicesData = async () => {
    try {
      let { data } = await axios.get(`http://127.0.0.1:8000/api/services`)
      if (data) {
        setServicesData(data);
      }
    } catch (error) {
      toast.error('Something went wrong.')
    }
  }
  useEffect(() => {
    getServicesData()
  }, [])
  let showServices = () => {
    if (servicesData?.length > 0) {
      return (
        <div className=" grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  ">
          {servicesData?.map((service) => (
            <div key={service.id} className="bg-sky-100 m-2 text-center p-3 rounded-md" >
              <p>{service?.name}</p>
              <p>{service?.desc}</p>
            </div>
          ))}
        </div>
      )
    }
  }
  // getting prev client 
  let [prevClientsData, setPrevClientsData] = useState([]);
  let getPrevClientsData = async () => {
    try {
      let { data } = await axios.get(`http://127.0.0.1:8000/api/previousClients`)
      if (data) {
        setPrevClientsData(data.data);
      }
    } catch (error) {
      toast.error('Something went wrong.')
    }
  }
  useEffect(() => {
    getPrevClientsData()
  }, [])
  let showClient = () => {
    if (prevClientsData?.length > 0) {
      return (
        <div className=" grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  ">
          {prevClientsData?.map((client) => (
            <div key={client.id} className="p-4 m-auto text-center">
              <p>{client?.name}</p>
              <div className="my-6">
                <img src={client?.logo} className="w-[200px] h-[200px]  rounded-full" alt="client logo" />
              </div>
            </div>
          ))}
        </div>
      )
    } else {
      return (
        <>

        </>
      )
    }
  }

  // getting reviews 
  let [reviewsData, setReviewsData] = useState([]);
  let getReviewsData = async () => {
    try {
      let { data } = await axios.get(`http://127.0.0.1:8000/api/reviews`)
      if (data) {
        setReviewsData(data);
      }
    } catch (error) {
      toast.error('Something went wrong.')
    }
  }
  useEffect(() => {
    getReviewsData()
  }, [])
  let showReview = () => {
    return (
      <div className="mb-5">
        {reviewsData.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            slidesPerView={1}
            spaceBetween={15}
            breakpoints={{
              480: { slidesPerView: 2 },
              740: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {reviewsData.map((review) => (
              <SwiperSlide key={review.id} className=" !flex items-center justify-center">
                <div className="p-3 bg-gray-100 border border-blue-700 rounded-lg  break-words w-[280px] h-[300px]">
                  <p>{review.body}</p>
                </div>

              </SwiperSlide>

            ))}
          </Swiper>
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    );

  };


  return (

    <>
      {/*start of  navbar */}
      <nav ref={navRef} className="h-12 bg-[#182078]  p-10 z-10 sticky text-white  top-0 w-full  flex justify-between items-center  border-b " >
        {/* logo */}
        <div className=" w-full  flex justify-between mx-auto">
          <div className="flex items-center">
            <Link href='/' >Logo</Link>
          </div>
          <div className='text-xl md:hidden'>
            <Menu />
          </div>
          <div className='hidden md:flex items-center gap-4 font-semibold text-sm lg:text-lg ' >
            <div
              className={`cursor-pointer ${activeSection === "home" ? "text-gray-400" : ""
                }`}
              onClick={() => scrollToTop(homeRef, "home")}
            >
              <span>Home</span>
            </div>
            <div
              className={`cursor-pointer ${activeSection === "about" ? "text-gray-400" : ""
                }`}
              onClick={() => scrollToTop(aboutRef, "about")}
            >
              <span>About us</span>
            </div>
            <div
              className={`cursor-pointer ${activeSection === "services" ? "text-gray-400" : ""
                }`}
              onClick={() => scrollToTop(servicesRef, "services")}
            >
              <span>Our Services</span>
            </div>
            <div
              className={`cursor-pointer ${activeSection === "clients" ? "text-gray-400" : ""
                }`}
              onClick={() => scrollToTop(clientsRef, "clients")}
            >
              <span >Clients </span>
            </div>
            <div
              className={`cursor-pointer ${activeSection === "reviews" ? "text-gray-400" : ""
                }`}
              onClick={() => scrollToTop(reviewRef, "reviews")}
            >
              <span >Reviews </span>
            </div>
            <div
              className={`cursor-pointer border p-2  ${activeSection === "contact" ? "text-gray-400" : ""
                }`}
              onClick={() => scrollToTop(contactRef, "contact")}
            >
            <span>Contact us</span>
            </div>
            <div
              className={`cursor-pointer transition ease-in-out delay-150  bg-indigo-600 text-white  hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 duration-300    p-2 rounded ${activeSection === "home" ? "" : ""
                }`}
              onClick={() => scrollToTop(homeRef, "home")}
            >
              <span>Instant quote</span>
            </div>

          </div>
        </div>
      </nav>
      {/*end of  navbar */}
      <main className="flex-grow bg-gray-100 " > {/* Adding pb-16 for padding bottom */}
        {/*start of home section */}
        <section ref={homeRef} className="p-6">
          <div className=" bg-white p-4 shadow-lg pb-10">
            <div className="text-center">
              <div className=" mx-10 p-2 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 bg-blue-400">
                <div>
                  Big Logo
                </div>
                <div>
                  <h1>Company Name</h1>
                </div>
              </div>
              <div>
                {ShowHomeDesc()}
              </div>
            </div>
            <QuoteForm />
          </div>
        </section>
        {/*end of home section */}
        {/*start of about section */}
        <section ref={aboutRef} className="p-6 " >
          <h5 className="text-center text-4xl font-bold text-blue-900"> About Us</h5>
          <div className="border-b border-blue-600  mt-2 w-6  m-auto "></div>
            <div className="border-b-2 border-blue-600  my-1 w-10  m-auto "></div>
            <div className="border-b-2 border-blue-600 mb-20  w-14  m-auto "></div>
          {showAbout()}

        </section>
        {/*start of about section */}
        {/*start of services section */}
        <section ref={servicesRef} className="p-4 ">
          <div className=" bg-white p-8 shadow-lg">
            <h5 className="text-center text-4xl font-bold mt-6 text-blue-900"> SERVICES</h5>
            <div className="border-b border-blue-600  mt-2 w-6  m-auto "></div>
            <div className="border-b-2 border-blue-600  my-1 w-10  m-auto "></div>
            <div className="border-b-2 border-blue-600 mb-20  w-14  m-auto "></div>
            {showServices()}
          </div>
        </section>
        {/*end of services section */}
        {/*start of clients section */}
        <section ref={clientsRef} className="p-6">
          <h5 className="text-center text-4xl font-bold mt-6 text-blue-900"> CLIENTS</h5>
          <div className="border-b border-blue-600  mt-2 w-6  m-auto "></div>
            <div className="border-b-2 border-blue-600  my-1 w-10  m-auto "></div>
            <div className="border-b-2 border-blue-600 mb-20  w-14  m-auto "></div>
          {showClient()}
        </section>
        {/*end of clients section */}
        {/*start of reviews section */}
        <section ref={reviewRef} className="p-4 relative" >
          <div className=" bg-white p-4 shadow-lg">
            <h5 className="text-center text-4xl font-bold mt-6  text-blue-900 "> REVIEWS</h5>
            <div className="border-b border-blue-600  mt-2 w-6  m-auto "></div>
            <div className="border-b-2 border-blue-600  my-1 w-10  m-auto "></div>
            <div className="border-b-2 border-blue-600 mb-20  w-14  m-auto "></div>
            {showReview()}
          </div>
        </section>
        {/*end of reviews section */}
      </main>
      {/* start of footer  */}
      <footer className="bg-[#182078] text-white py-14  w-ful" ref={contactRef}>
        <div className="flex items-center justify-center ">
          <Link href="https://www.facebook.com/your-profile" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
            </svg>
          </Link>
          <Link href="https://t.me/Shimaa_Attia" target="_blank" className="mx-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-telegram" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
            </svg>
          </Link>
          <Link href="https://www.instagram.com/your-profile" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
            </svg>
          </Link>
        </div>
        <div className="container m-auto mt-5  text-center ">
          <div className="">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>


        </div>
        <div className="flex items-center justify-center fixed z-10 bottom-8 right-8">
          <Link href="https://wa.me/201127699777" target="_blank" className="text-green-600  hover:text-green-700 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className=" bi bi-whatsapp" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
            </svg>
          </Link>
        </div>
      </footer>

      {/* end of footer  */}
    </>




  )
}


