
"use client"

import QuoteForm from "@/components/quote/QuoteForm";
import Link from "next/link";
import Menu from "@/components/menu/Menu";
import { useEffect, useRef, useState } from "react";

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
      <main className="flex-grow "> {/* Adding pb-16 for padding bottom */}

        {/*start of home section */}
        <section ref={homeRef} >
          <div className="text-center">
            <div className=" mx-10 p-2 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 bg-blue-400">
              <div>
                Big Logo
              </div>
              <div>
                Company Name
              </div>
            </div>
            <div>
              Company Description
            </div>
          </div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora facere consequuntur suscipit voluptatum, sed architecto, laboriosam porro est ullam reprehenderit nihil rem autem? Quidem, obcaecati! A nobis in excepturi iure quam ex corrupti distinctio eius aliquid debitis inventore esse reprehenderit, illo quibusdam sit sequi repudiandae rem, totam numquam. Assumenda, quo.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, blanditiis!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure autem incidunt aperiam assumenda quidem nesciunt doloribus magnam, quasi ratione deserunt?
          <QuoteForm />
        </section>
        {/*end of home section */}
        {/*start of about section */}
        <section ref={aboutRef}>
<h1>About</h1>
        </section>
        {/*start of about section */}
        {/*start of services section */}
        <section ref={servicesRef}>
        <h1>service</h1>
        </section>
        {/*end of services section */}
        {/*start of clients section */}
        <section ref={clientsRef}>
        <h1>our clients</h1>
<p>our clients</p> 

        </section>
        {/*end of clients section */}
        {/*start of reviews section */}
        <section ref={reviewRef} >
        <h1>REviews</h1>
        <p>Good company</p>
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
        <div class="flex items-center justify-center fixed bottom-8 right-8">
          <Link href="https://wa.me/01127699777" target="_blank" className="text-green-600  hover:text-green-700 transition duration-300">
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


