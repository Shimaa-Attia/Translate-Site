"use client"
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export let AppContext = createContext({});
export default function AppContextProvider(props) {
    let [isAdmin, setIsAdmin] = useState(false);
    let pathName = usePathname();
    useEffect(() => {
        // console.log(pathName.startsWith('/admin'));
        setIsAdmin(pathName.startsWith("/admin"));
    }, [pathName])
    return <AppContext.Provider value={{ isAdmin }}>
        {props.children}
    </AppContext.Provider>

}
