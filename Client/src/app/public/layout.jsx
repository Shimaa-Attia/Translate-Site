import Navbar from '@/components/navbar/Navbar'
import { Inter } from 'next/font/google'



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Translate',
    description: 'Generated by create next app',
}

export default function PublicLayout({ children }) {
    return (
    <>
        <div className={inter.className}>
                <Navbar/>
                {children}
            </div>
    </>
        
    )
}