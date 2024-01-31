
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Translation',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>

        {children}
        <Toaster  richColors  position="top-right"/>
        </body>
    </html>
  )
}

