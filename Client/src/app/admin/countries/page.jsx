
import { CountriesData } from "../../../components/countries/countriesData";
import AddCountries from "@/components/countries/AddCountries";
export default function Countries() {
  return (
    <>
      <div className="p-4 m-4 rounded-lg grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 bg-gray-200 ">
        <div>
          <CountriesData/>
        </div>
        <div>
          <div className=" rounded p-2 ">
            <AddCountries />
          </div>
        </div>  
      </div>
    </>

  )
}
