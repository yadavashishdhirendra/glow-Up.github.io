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
import EditEmployee from './pages/EditEmployee';
import Accounts from './pages/Accounts';
import SaloonBookings from './pages/SaloonBookings';
import CustomersBookings from './pages/CustomersBookings';
import CustomerCareLogin from './pages/CustomerCareLogin';
import { CareUserload } from './actions/CareUserAction';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user)
  const { careUserLoggedin }=useSelector(state=>state.customerCare)
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat', 'sans-serif']
      }
    })
    store.dispatch(loadUser())
    store.dispatch(CareUserload())
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
          <Route exact path='/edit/employee/:id' element={isAuthenticated ? <EditEmployee /> : <Login />} />
          <Route exact path='/accounting' element={isAuthenticated ? <Accounts /> : <Login />} />
          <Route exact path='/saloon/:id/bookings' element={isAuthenticated ? <SaloonBookings/> : <Login />} />
          <Route exact path='/todays-bookings' element={careUserLoggedin ? <CustomersBookings /> : <CustomerCareLogin />} />
          <Route exact path='/customer-care/login' element={<CustomerCareLogin/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App