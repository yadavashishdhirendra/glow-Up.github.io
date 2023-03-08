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
import ProctectedDashBoardRoute from './components/ProctectedDashBoardRoute';
import CcProtectedRoute from './components/CcRoutes';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user)
  const { careUserLoggedin } = useSelector(state => state.customerCare)
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
          <Route path='/' element={<Login />} />
          <Route exact path='/bookings' element={
            <ProctectedDashBoardRoute islogged={isAuthenticated}>
              <BookingsList />
            </ProctectedDashBoardRoute>
          } />

          <Route exact path='/create-coupans' element={
            <ProctectedDashBoardRoute islogged={isAuthenticated}>
              <GenerareCoupans />
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/coupans' element={
            <ProctectedDashBoardRoute islogged={isAuthenticated}>
              <Coupans />
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/saloons' element={
            <ProctectedDashBoardRoute islogged={isAuthenticated}>
              <Saloons />
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/saloon/:id/services/:owner' element={
            <ProctectedDashBoardRoute islogged={isAuthenticated}>
              <Services />
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/service/:id/employees' element={
            <ProctectedDashBoardRoute islogged={isAuthenticated}>
              <Employees />
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/edit/employee/:id' element={
            <ProctectedDashBoardRoute islogged={isAuthenticated}>
              <EditEmployee />
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/accounting' element={
            <ProctectedDashBoardRoute islogged={isAuthenticated}>
              <Accounts />
            </ProctectedDashBoardRoute>
          } />
          <Route exact path='/saloon/:id/bookings' element={
            <ProctectedDashBoardRoute islogged={isAuthenticated}>
              <SaloonBookings />
            </ProctectedDashBoardRoute>
          } />

          <Route exact path='/todays-bookings' element={
            <CcProtectedRoute loggedIn={careUserLoggedin}>
              <CustomersBookings />
            </CcProtectedRoute>} />
          <Route exact path='/customer-care/login' element={<CustomerCareLogin />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App