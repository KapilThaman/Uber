import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'
import UserProtectWrapper from './pages/UserProtectWrapper'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
function App() {
  return (
    <div>
    <Routes>
      <Route path='/' element={<Start />} />
      <Route path='/home' element={
      <UserProtectWrapper>
        <Home/>
      </UserProtectWrapper>} />
      <Route path='/login' element={<UserLogin />} />
      <Route path='/riding' element={<Riding />} />

      <Route path='/signup' element={<UserSignUp />} />
      <Route path='/captain-login' element={<Captainlogin />} />
      <Route path='/captain-riding' element={<CaptainRiding />} />
      <Route path='/captain-signup' element={<CaptainSignup />} />
      <Route  path='/captain-home' element={
      <CaptainProtectWrapper>
        <CaptainHome/>
      </CaptainProtectWrapper>} />
    </Routes>
  </div>
  )
}

export default App