import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid'
import React, { useEffect } from 'react'
import MetaTitle from '../MetaTitle/MetaTitle'
import SideBar from '../Sidebar/Sidebar'
import './Bookings.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookings } from '../../actions/UserActions'
import Loader from '../Loader/Loader'


const BookingsList = () => {
    const dispatch = useDispatch();
    const { bookings, error, loading } = useSelector((state) => state.bookings);
    const columns = [
        { field: "id", headerName: "Booking Id", flex: 1, minWidth: 250 },
        { field: "date", headerName: "Date", flex: 1, minWidth: 200 },
        { field: "salon", headerName: "Salon Name", flex: 1, minWidth: 250 },
        { field: "client", headerName: "Client", flex: 1, minWidth: 200 },
        { field: "mobile", headerName: "Mobile Number", flex: 1, minWidth: 200 },
        { field: "category", headerName: "Category", flex: 1, minWidth: 250 },
        { field: "service", headerName: "Service Name", flex: 1, minWidth: 200 },
        { field: "stylist", headerName: "Stylist", flex: 1, minWidth: 200 },
        {
            field: "status", headerName: "Status", flex: 1, minWidth: 200, cellClassName: (params) => {
                return params.getValue(params.id, "status") !== "Cancelled" ? "greenColor" : "redColor"
            }
        },
        { field: "price", headerName: "Price", flex: 1, minWidth: 150 },
        { field: "intime", headerName: "In Time", flex: 1, minWidth: 150 },
        { field: "outtime", headerName: "Out Time", flex: 1, minWidth: 150 },
    ];
    useEffect(() => {
        if (error) {
            alert(error)
        }
        dispatch(getAllBookings())
    }, [dispatch, error])
    const MyExportButton = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        )
    }
    return (
        <div>
            <MetaTitle title='Bookings - Glow Up Salon & Scheduling' />
            {
                loading ? <Loader /> :
                    <>
                        <SideBar />
                        <div className='data-table-wrapper'>
                            <h1>Bookings</h1>
                            <p>{bookings?.length} Records</p>
                            <DataGrid
                                rows={bookings?.length?bookings:[]}
                                columns={columns}
                                pageSize={8}
                                autoHeight
                                components={{
                                    Toolbar: MyExportButton
                                }}
                                sortingOrder='null'
                            />
                        </div>
                    </>
            }
        </div>
    )
}

export default BookingsList