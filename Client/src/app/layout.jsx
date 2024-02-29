
import './globals.css'
import { Toaster } from 'sonner'
import AppContextProvider from '@/context'


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </body>
    </html>
  )
}

