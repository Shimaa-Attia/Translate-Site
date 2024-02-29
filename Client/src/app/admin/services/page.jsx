import AddService from "@/components/adminServices/AddService";
import ServicesData from "@/components/adminServices/ServicesData";

export default function AdnimServices() {
  return (
    <>
      <div className="p-4 m-4 rounded-lg grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 bg-gray-200 ">
        <div>
          <ServicesData />
        </div>
        <div>
          <div className="rounded p-2 ">
            <AddService />
          </div>
        </div>
      </div>
    </>
  )
}
