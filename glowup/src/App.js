import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './components/Login/Login';
import WebFont from 'webfontloader';
import { loadUser } from './actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import store from './store';
import BookingsList from './components/Bookings/BookingsList';
import GenerareCoupans from './pages/GenerareCoupans';
import Coupans from './pages/Coupans';
import Saloons from './pages/Saloons';
import Services from './pages/Services';
import Employees from './pages/Employees';

const App = () => {
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector((state)=> state.user)
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat', 'sans-serif']
      }
    })
    store.dispatch(loadUser())
  }, [dispatch])

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={isAuthenticated ? <BookingsList /> : <Login />} />
          <Route exact path='/create-coupans' element={isAuthenticated ? <GenerareCoupans /> : <Login />} />
          <Route exact path='/coupans' element={isAuthenticated ? <Coupans /> : <Login />} />
          <Route exact path='/saloons' element={isAuthenticated ? <Saloons /> : <Login />} />
          <Route exact path='/saloon/:id/services/:owner' element={isAuthenticated ? <Services /> : <Login />} />
          <Route exact path='/service/:id/employees' element={isAuthenticated ? <Employees /> : <Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App