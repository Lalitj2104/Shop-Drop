import { lazy, useState } from 'react'
import {Routes,Route, BrowserRouter} from "react-router-dom"

const UserLogin=lazy(()=>import("./pages/login/UserLogin"))
const AdminLogin=lazy(()=>import("./pages/login/AdminLogin"))
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
