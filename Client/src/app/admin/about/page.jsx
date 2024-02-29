import AboutData from "@/components/adminAbout/AboutData";
import AddAbout from "@/components/adminAbout/AddAbout";


export default function AdnimAbout() {
  return (
    <>
        <div className="p-4 m-4 rounded-lg grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 bg-gray-200 ">
        <div>
        <AboutData/>
        </div>
        <div>
          <div className="rounded p-2 ">
          <AddAbout/>
          </div>
        </div>
      </div>
    
    </>
  )
}
