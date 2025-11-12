import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/Login"
import HelloWorld from "@/pages/HelloWorld"
function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<HelloWorld />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
