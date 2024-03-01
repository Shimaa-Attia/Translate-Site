
"use client"

import QuoteForm from "@/components/quote/QuoteForm";
import Link from "next/link";
import Menu from "@/components/menu/Menu";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Navigation, Pagination ,A11y } from 'swiper/modules';
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
  //make Swiper for reviews 
  // Initialize Swiper core
  // const swiper = new Swiper('.swiper', {
  //   // configure Swiper to use modules
  //   modules: [Navigation, Pagination],
  // });
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
      <div>
        {reviewsData.length > 0 ? (
          <Swiper
          modules={[Navigation,Pagination, A11y]}
          slidesPerView={1}
          spaceBetween={15}
          breakpoints={{
            480:{slidesPerView:2},
            740:{slidesPerView:3},
            1024:{slidesPerView:4},
          }}
          >
            {reviewsData.map((review) => (
              <SwiperSlide key={review.id} className=" !flex items-center justify-center">
                <div className="p-3 bg-gray-100 border-2 border-blue-800 rounded-lg w-[280px] h-[200px]">
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
            <div className='border p-2 '>
              <span>Contact us</span>
            </div>
            <div className='transition ease-in-out delay-150  bg-indigo-600 text-white  hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 duration-300    p-2 rounded '>
              <span>Instant quote</span>
            </div>

          </div>
        </div>
      </nav>
      {/*end of  navbar */}
      <main className="flex-grow bg-gray-100 " > {/* Adding pb-16 for padding bottom */}
        {/*start of home section */}
        <section ref={homeRef} className="p-6">
          <div className=" bg-white p-4 shadow-lg">
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
          <h5 className="text-center text-4xl font-bold mb-10"> About Us</h5>
          {showAbout()}

        </section>
        {/*start of about section */}
        {/*start of services section */}
        <section ref={servicesRef} className="p-4 ">
          <div className=" bg-white p-8 shadow-lg">
            <h5 className="text-center text-4xl font-bold mt-6 mb-10"> SERVICES</h5>
            {showServices()}
          </div>
        </section>
        {/*end of services section */}
        {/*start of clients section */}
        <section ref={clientsRef} className="p-6">
          <h5 className="text-center text-4xl font-bold mt-6 mb-10"> Clients</h5>
          {showClient()}
        </section>
        {/*end of clients section */}
        {/*start of reviews section */}
        <section ref={reviewRef} className="p-4" >
          <div className=" bg-white p-4 shadow-lg">
            <h5 className="text-center text-4xl font-bold mt-6 mb-10"> REVIEWS</h5>
            {showReview()}
          </div>
        </section>
        {/*end of reviews section */}
      </main>
      {/* start of footer  */}
      <footer className="bg-[#182078] text-white py-10   w-full">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <p>&copy; 2024 Your Company. All rights reserved.</p>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-right mt-4 md:mt-0">
              <a href="#" className="inline-block mr-4">Privacy Policy</a>
              <a href="#" className="inline-block">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center fixed bottom-8 right-8">
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


