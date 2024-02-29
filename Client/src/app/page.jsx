"use client"

import QuoteForm from "@/components/quote/QuoteForm";
import Link from "next/link";
import Menu from "@/components/menu/Menu";
import { useEffect, useRef, useState } from "react";

export default function Home() {

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
              className={`cursor-pointer ${
                activeSection === "reviews" ? "text-gray-400" : ""
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
        <QuoteForm />
      </section>
      {/*end of home section */}
      {/*start of about section */}
      <section ref={aboutRef}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi consequatur provident voluptates voluptatum repellendus temporibus velit, ullam facilis est quisquam! Sapiente aperiam amet nisi, provident voluptatibus deserunt repellendus facilis doloribus repudiandae aut assumenda quam optio quod consectetur architecto soluta perferendis alias ex mollitia, necessitatibus minus ea reprehenderit porro similique. Adipisci temporibus laborum modi ipsum saepe? Quibusdam, vero porro? Consequuntur molestias hic eveniet cum iusto. Quia quam reprehenderit dicta nemo alias vero corporis unde. Iure, similique, quia dolor corrupti expedita possimus distinctio dicta incidunt veritatis a mollitia? Debitis, excepturi reiciendis quasi temporibus facere saepe porro exercitationem dicta quas ut minus dolore vitae accusamus! Pariatur iusto dolorem, doloribus ut molestiae consequatur ratione amet ad nisi officia nostrum corrupti iste facere dolorum placeat quaerat eum quas beatae ea ex vero. Veniam optio dicta culpa deserunt, nisi obcaecati cupiditate ipsam voluptatum quisquam et possimus nemo inventore commodi molestias explicabo ducimus soluta eveniet ipsum adipisci temporibus id voluptatem esse? Id fugiat aperiam sed pariatur nulla excepturi dolorum veniam voluptatem aliquid expedita, unde repudiandae tempore dignissimos tempora iste quo. Ratione iure nam ducimus, magnam tempore qui, quos necessitatibus velit porro facilis, distinctio assumenda blanditiis? Neque error, consectetur non illum ab nam laboriosam. Doloribus dicta ullam illum quae esse obcaecati saepe suscipit eveniet eum, cumque eligendi expedita, cupiditate libero! Animi, ea natus consequuntur, necessitatibus, neque facere ut tempora vel atque amet sunt obcaecati corrupti? Voluptas maxime deleniti praesentium ad tenetur totam iure quas! Temporibus consectetur expedita neque, esse maiores laboriosam repellendus provident animi asperiores hic fugit dolorum quaerat distinctio quos perferendis praesentium ab iste soluta odit voluptas blanditiis exercitationem! Magni repellendus libero, fugiat quidem ipsum quasi culpa ipsam obcaecati. Dolores eos neque asperiores commodi quibusdam esse quo! Aperiam, saepe iure ullam nihil nulla sed placeat itaque dolores fuga enim deleniti distinctio soluta vel corporis hic iste officiis. Nobis cumque doloribus iure soluta nam voluptas rem laudantium esse suscipit, corporis non velit est dicta modi, dolorum sapiente. Aperiam debitis autem labore perferendis inventore totam soluta aliquid tempora at distinctio reprehenderit, pariatur cupiditate quasi doloribus, maxime quia tenetur fugiat necessitatibus ad! Labore veniam tempore perspiciatis nisi velit odit non culpa cupiditate, a neque debitis quidem? Accusamus voluptate rem voluptatibus vero nobis voluptatum laborum placeat eveniet earum nihil asperiores dolor veritatis, quaerat recusandae dolores consectetur iure ipsa facilis molestias cum dignissimos ab? Facilis autem est eos! Saepe atque deserunt a non suscipit quia quasi quidem rerum libero pariatur quod possimus mollitia provident odit cumque nulla, ipsam facere culpa cum consequatur. Nam, aut! Laboriosam aperiam id sint cumque ad officia beatae delectus nostrum eligendi, placeat nam, natus esse, accusamus assumenda cum temporibus quam harum architecto eum cupiditate reprehenderit? Perferendis ipsam dicta dolorem eaque officia ab eveniet numquam dolorum laboriosam harum corrupti nisi ipsa animi, sed atque, facilis quasi illum deleniti ex quos qui aut modi. Accusantium voluptatibus facilis perferendis necessitatibus ratione architecto nam. Nihil temporibus, omnis non dolor nesciunt sit dolorem eaque deserunt quae possimus debitis ad quasi quia dolorum molestiae minima id maiores cum et. Dolore blanditiis amet molestiae aspernatur saepe incidunt! Molestiae sed labore sequi perferendis magni cupiditate accusantium aliquam rem officia eaque obcaecati iure in ut sapiente excepturi iusto voluptates quia optio, praesentium dicta quasi corporis repellendus ratione! Ullam, at possimus? Temporibus cupiditate deleniti aspernatur, nam facilis, ea neque ullam similique ipsum debitis totam modi reprehenderit. Voluptatum atque inventore fugiat officiis magni officia! Nam inventore ipsam atque praesentium voluptatem molestiae dolore! Cupiditate recusandae laboriosam deleniti voluptatem doloremque ipsa labore iusto, rem dicta ipsum culpa quae aspernatur esse unde ad voluptatibus qui natus ducimus a vitae dignissimos. Tempora, doloremque. Incidunt nisi recusandae molestiae nemo perferendis autem eum culpa, ipsum voluptates fugiat aspernatur sequi iste laudantium nam excepturi, inventore dolorem saepe! Beatae possimus velit perferendis voluptates impedit voluptas. Est, recusandae? Doloremque debitis, temporibus tempore voluptas quae modi ut non officia iusto ex nemo quia illum eos ea quisquam deleniti nam numquam iure. Dicta consequatur assumenda repellendus! Eos tempora ea et porro recusandae nulla alias cum. Inventore, minima. Error nam eos quis excepturi ad impedit in, hic culpa iure, quisquam nihil tenetur laborum tempora quae deserunt quo, ab inventore illum exercitationem aperiam. Iure, autem doloremque officiis perspiciatis iusto, tenetur ea adipisci similique deserunt harum quia voluptates quam voluptatum mollitia reprehenderit ratione!
      </section>
      {/*start of about section */}
      {/*start of services section */}
      <section ref={servicesRef}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea iste recusandae ipsum hic pariatur omnis ullam numquam, ratione explicabo nam consequuntur? Soluta, repellat provident quasi iste maiores rerum accusantium facilis quia harum doloribus temporibus! Incidunt, explicabo quas. Aliquid cupiditate optio reprehenderit suscipit sed! Vero sapiente tempora fuga aliquam commodi quibusdam veritatis facilis. Iure sapiente deleniti dolores, quisquam, libero harum qui veritatis ipsa debitis voluptas sequi. Culpa repellat consequuntur repellendus, aut nesciunt delectus quaerat obcaecati tempore maxime hic minima iusto pariatur ducimus quos iste dolorem reiciendis incidunt illum temporibus animi totam, quas suscipit ipsam. Ad fuga eligendi voluptatem? Velit, est maxime! Quia pariatur a doloribus id. Amet natus deleniti eum unde maiores voluptate. Maiores illum aspernatur sequi qui! Sed, dolores? Quo dignissimos minima molestiae pariatur consectetur quia, optio possimus impedit, deleniti et obcaecati expedita laudantium nemo in aut enim quidem qui amet iure illum odio quisquam. Voluptas, doloremque, eveniet cupiditate esse fuga accusantium rem ullam facere dolorum dolores perspiciatis, dolorem magni. Ipsa repellat commodi, vitae at, fugiat beatae deserunt temporibus quibusdam pariatur delectus incidunt earum error maiores culpa eveniet quam qui officia dicta tempora sed nisi consectetur animi dolore eos. Earum, magni harum! Id reiciendis, veritatis quasi nihil consectetur blanditiis error quae excepturi dicta vel eos dolor quidem earum ipsa tempora dolores minus, consequuntur animi saepe qui rem perferendis illum dolorem. Libero rerum beatae pariatur harum aspernatur ipsum aperiam maiores veritatis, quam ad fugit nisi sequi illo non quaerat qui molestiae quae? Repellat, dolores asperiores expedita officiis, qui aliquid officia autem hic dolorum illum quisquam ab ipsam deserunt illo iusto quam sint mollitia ad animi porro, culpa ex rem ea suscipit? At eveniet qui dolorum a iste aperiam aliquam necessitatibus modi! Nisi dolor consectetur doloremque est similique minima quo repudiandae corrupti, voluptate, earum pariatur accusamus necessitatibus quia, libero praesentium dolorum laudantium dolores vero aspernatur. Dolore voluptates asperiores saepe, culpa deleniti nam magni quaerat itaque repellat, dolorem, consectetur ullam maiores rerum numquam dicta ex nobis quasi quos vel illo obcaecati sint. Vitae temporibus in nobis magnam suscipit, voluptas ratione consequatur sequi, facere sed quod reiciendis odit voluptate quas quibusdam deserunt cum nostrum ducimus eum, sit ad perferendis quisquam voluptates quasi. Molestias mollitia similique laborum perspiciatis sapiente illo quos fuga labore quaerat consequatur cupiditate officiis veniam temporibus doloremque quis quisquam, nobis numquam. Voluptatibus id impedit fugit sint vitae, accusantium quae laborum. Earum illum soluta quod eveniet blanditiis in rem quo iure ratione molestiae doloribus cumque porro aperiam eaque nulla, quas magni! Aliquam, debitis saepe veritatis eligendi, praesentium assumenda esse nam suscipit vero officiis ab quos aspernatur consectetur optio beatae perspiciatis cumque impedit nostrum animi nulla harum quae! Dignissimos, vero beatae. Eligendi ea magnam atque obcaecati aliquid ad unde sunt neque, pariatur doloremque nobis. Fugit soluta animi, laborum, corrupti commodi ducimus rerum voluptatum est quo ipsum facilis non, saepe illum consectetur eligendi temporibus quos? Vitae laudantium eius iste officia molestias itaque, officiis id quibusdam ex voluptates necessitatibus dolorem labore quis maiores sit atque nesciunt debitis dicta rerum consequuntur inventore molestiae ullam? Optio debitis unde quo eligendi magni alias, nulla delectus quod nam itaque enim officia, consequatur aliquam voluptatibus perferendis pariatur doloremque earum officiis, sed ipsam qui ipsum tempora. Maiores id esse deleniti magni explicabo eius suscipit dolore minima quasi veniam. Fugiat doloribus corrupti doloremque fugit aspernatur, reiciendis cum perspiciatis laborum facere natus quaerat id, laudantium, non sunt provident qui odit obcaecati voluptas itaque libero laboriosam? Nemo iusto cumque consequuntur accusamus hic temporibus soluta nisi maiores dolorum ipsum ipsa ratione corrupti sapiente nobis voluptates perferendis at eligendi aliquam autem, omnis corporis neque ex perspiciatis? Quae eligendi expedita vero ab quam rem aperiam quia accusamus vel.
      </section>
      {/*end of services section */}
      {/*start of clients section */}
      <section ref={clientsRef}>
<h2>clients rev</h2>
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit illo sapiente voluptates ex repellendus quasi eius hic libero, fuga quos. Alias quia deserunt rem molestiae, dolorum harum? Corrupti quia accusantium nulla voluptas quibusdam rem voluptate! Nam a repellendus perferendis asperiores fugit laborum earum, ad incidunt iure, autem accusamus. Architecto voluptas numquam officiis suscipit quo earum quisquam libero placeat natus fugit eos, nobis, neque saepe ducimus nostrum aperiam! Labore minima harum suscipit at, ab ut, soluta laboriosam earum, dolorum corporis ad asperiores distinctio in aperiam molestiae eius deleniti eum error ex eos illo. Ipsum, quidem sint adipisci alias incidunt nisi obcaecati voluptatibus accusamus porro quaerat soluta, pariatur eveniet labore, ea suscipit doloremque magni veritatis blanditiis! Laboriosam soluta, porro nisi repudiandae quas qui saepe laudantium repellendus provident voluptatibus fugiat neque nulla! Vel sit hic eius autem tenetur incidunt ducimus quaerat quis corrupti quos. Doloribus, tenetur. Magni obcaecati enim, eum dolor praesentium doloremque autem quae necessitatibus unde distinctio, est nobis nostrum delectus cupiditate illum blanditiis laudantium quia, dolorem pariatur placeat soluta. Voluptatum aspernatur culpa non ex cum. Maiores quod, error voluptate possimus consequuntur, esse earum sed at quo doloremque, mollitia nisi cupiditate. Beatae eius, aspernatur tenetur dignissimos accusantium perspiciatis quis reiciendis consequatur nihil sed officiis distinctio ratione illum perferendis! Reprehenderit, esse doloribus aut repellat ipsam, temporibus ipsum tenetur, ullam assumenda porro voluptatum? Culpa dicta inventore ipsa voluptatum alias ipsum obcaecati minima, fuga debitis repellendus vitae quam aspernatur omnis pariatur illo, a veritatis perspiciatis possimus natus unde nulla reprehenderit nihil. Beatae qui ad minus perferendis tenetur numquam vero nobis, sint minima excepturi mollitia ipsa odio expedita, laudantium saepe corporis, necessitatibus quo ut non placeat! Adipisci, earum magnam consequuntur qui harum deleniti alias debitis doloribus provident, aut repellendus autem ea dolor in veritatis. Aut, iusto amet! Cum repudiandae earum magnam quia perferendis voluptatibus ipsa magni pariatur laudantium cupiditate vitae laborum, iusto doloremque facilis nulla voluptatum deleniti nam consequuntur, dicta neque. Dignissimos, ut! Quae alias ipsam assumenda adipisci dolorem tempore explicabo minima delectus! Consectetur alias nostrum enim vero, porro tempora dolor quasi eligendi totam ipsam ipsa, amet nobis, vitae natus. Tenetur, dolorum quia. Nostrum dignissimos delectus, voluptatibus distinctio modi nemo nam accusantium voluptas quos possimus dicta repudiandae velit quidem reiciendis. Ipsa vitae accusamus repellat odit quam, esse optio earum fugiat nostrum expedita accusantium fugit ex, officia iste iure aut veritatis laborum perspiciatis reiciendis omnis ullam alias recusandae blanditiis assumenda! Debitis ut sed nobis maiores nam officiis, laudantium molestias neque magnam beatae, illum saepe quam? Assumenda aliquid repellendus, magni natus necessitatibus error velit fuga, inventore corporis eaque facere eveniet soluta consequuntur provident nobis quos. Praesentium reiciendis nostrum similique, eum ullam repudiandae libero rerum voluptas rem nisi? Quos eligendi rerum adipisci, nesciunt assumenda minus, et eum repellendus voluptatem iure explicabo sed porro aliquid hic architecto autem placeat reiciendis necessitatibus? Placeat, nisi quisquam suscipit ipsam ut mollitia? Quam iste debitis reiciendis esse tempora laborum voluptate eos, molestias, vero aperiam suscipit pariatur obcaecati neque molestiae recusandae autem? Architecto sapiente, tempora ex voluptatibus magni officia doloremque. Eos nemo harum unde dolor.
      </section>
      {/*end of clients section */}
      {/*start of reviews section */}
      <section ref={reviewRef} >
   revies 
      </section>
      {/*end of reviews section */}
    </>




  )
}


