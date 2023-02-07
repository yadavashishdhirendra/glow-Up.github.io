import React, { Fragment, useState } from 'react'
import { ProSidebarProvider, Menu, MenuItem } from 'react-pro-sidebar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Bookings from '@material-ui/icons/Book';
import ServiceIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';
import { GiTicket } from "react-icons/gi"
import {HiTicket} from "react-icons/hi"
import LogoutIcon from '@material-ui/icons/LockOpen'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import GlowupLogo from '../Assets/Logo/rsz_glow_up_logo-04_1 1.png';
import { useDispatch } from 'react-redux';
import { loadUser, logoutUser } from '../../actions/UserActions';

const SideBar = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const openMenu = () => {
        setOpen(!open)
    }

    const logoutUserHandler = async () => {
       await dispatch(logoutUser())
       dispatch(loadUser())
    }

    return (
        <Fragment>
            <div>
                <button className='toggle-icon' onClick={() => openMenu()}><MenuIcon /></button>
            </div>
            {
                open ? <div className='relative-menu'>
                    <ProSidebarProvider image='https://azouaoui-med.github.io/react-pro-sidebar/static/media/bg2.de0153c5.jpg' collapsed={open}>
                        <div className='glowup-sidebar-logo'>
                            <img src={GlowupLogo} alt="" />
                        </div>
                        <Menu iconShape="circle">
                            <Link to='/'>
                                <MenuItem icon={<DashboardIcon />}>
                                    Home
                                </MenuItem>
                            </Link>
                            <Link to='/'>
                                <MenuItem icon={<ServiceIcon />}>
                                    Services
                                </MenuItem>
                            </Link>
                            <Link to='/'>
                                <MenuItem icon={<Bookings />}>
                                    Bookings
                                </MenuItem>
                            </Link>
                            <Link to='/coupans'>
                                <MenuItem icon={<GiTicket style={{color:"white",fontSize:"24px"}}/>}>
                                    All Coupans
                                </MenuItem>
                            </Link>
                            <Link to='/create-coupans'>
                                <MenuItem icon={<HiTicket style={{color:"white",fontSize:"24px"}}/>}>
                                    Create Coupan
                                </MenuItem>
                            </Link>
                        </Menu>
                    </ProSidebarProvider>
                    <div onClick={() => logoutUserHandler()} className='logout-session'>
                        <LogoutIcon />
                        <div>Logout</div>
                    </div>
                </div> : null
            }
        </Fragment>
    )
}

export default SideBar