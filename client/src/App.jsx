import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


const App = () => {
  return (
      <Router>
        <main className='bg-purple-500'>
         <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
         </Routes>
        </main>
      </Router>
  )
}

export default App
