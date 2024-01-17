import AddLanguages from "@/components/languages/AddLanguage";
import { LanguagesData } from "@/components/languages/LanguagesData";

export default function Languages() {
  return (
    <>
      <div className="p-4 m-4 rounded-lg grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 bg-gray-200 ">
        <div>
          <LanguagesData />
        </div>
        <div>
          <div className="rounded p-2 ">
            <AddLanguages />
          </div>
        </div>
      </div>
    </>

  )
}
