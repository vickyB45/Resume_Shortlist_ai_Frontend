import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"
import { ResumeProvider } from './components/context/resumeContext.jsx'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(

  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ResumeProvider >
        <App />
      </ResumeProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </BrowserRouter>,
  </QueryClientProvider>
)
