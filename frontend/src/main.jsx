
import App from './App.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Petregister from './pages/Petregister.jsx'
import FindDog from "./pages/FindDog";
import FindCat from "./pages/FindCat";
import FindOther from "./pages/FindOther";
import PetCard from './components/PetCard.jsx'
import AllPets from './pages/AllPets.jsx'
import About from "./pages/About";
import ForgotPassword from "./pages/forgotpass.jsx";
import ResetPassword from "./pages/resetpass.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<LandingPage />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
      <Route path='/petregister' element={<Petregister />}></Route>
      <Route path='/allpets' element={<AllPets />}></Route>
      <Route path="/about" element={<About />} />
      <Route path="/dogs" element={<FindDog />} />
      <Route path="/cats" element={<FindCat />} />
      <Route path="/pets" element={<FindOther />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
