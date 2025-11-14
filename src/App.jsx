import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import LoginPage from "@/pages/auth/Login"
import Jobs from "@/pages/Index"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
