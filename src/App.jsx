import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Introduction from './pages/Introduction/Introduction'
import Adoption from './pages/Adoption/Adoption'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/introduction" element={<Introduction/>}/>
        <Route path="/adoption" element={<Adoption/>}/>

        {/* Auth */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App
