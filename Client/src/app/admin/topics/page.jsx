import AddTopic from "@/components/topics/AddTopic";
import { TopicsData } from "@/components/topics/TopicsData";

export default function Topics() {
  return (
    <>
      <div className="p-4 m-4 rounded-lg grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 bg-gray-200 ">
        <div>
        <TopicsData/>
        </div>
        <div>
          <div className="rounded p-2 ">
          <AddTopic/>
          </div>
        </div>
      </div>
    </>

  )
}
