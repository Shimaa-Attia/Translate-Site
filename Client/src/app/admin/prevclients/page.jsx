import AddPrevClients from "@/components/prevClients/AddPrevClients";
import PrevClientsData from "@/components/prevClients/PrevClientsData";


export default function PrevClients() {
  return (
    <div className="p-4 m-4 rounded-lg grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 bg-gray-200 ">
    <div>
     <PrevClientsData/>
    </div>
    <div>
      <div className="rounded p-2 ">
      <AddPrevClients/>
      </div>
    </div>
  </div>
  )
}
