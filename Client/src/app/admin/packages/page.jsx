import AddPackages from "@/components/packages/AddPackages";
import { PackagesData } from "@/components/packages/PackagesData";

export default function Packages() {
  return (
    <>
    <div className="p-4 m-4 rounded-lg grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 bg-gray-200 ">
      <div>
       <PackagesData/>
      </div>
      <div>
        <div className="rounded p-2 ">
          <AddPackages />
        </div>
      </div>
    </div>
  </>
  )
}
