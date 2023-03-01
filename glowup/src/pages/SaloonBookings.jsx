import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllBookingsOfSaloon } from "../actions/SaloonAction";
import { DataGrid } from "@material-ui/data-grid";
import SideBar from "../components/Sidebar/Sidebar";
const SaloonBookings = () => {
  const { id } = useParams();
  const { bookings } = useSelector((state) => state.bookings);
  const dispatch = useDispatch();
  const columns = [
    { field: "id", headerName: "Booking Id", flex: 1, minWidth: 250 },
    { field: "date", headerName: "Date", flex: 1, minWidth: 200 },
    { field: "client", headerName: "Client", flex: 1, minWidth: 200 },
    { field: "mobile", headerName: "Mobile Number", flex: 1, minWidth: 200 },
    { field: "category", headerName: "Category", flex: 1, minWidth: 250 },
    { field: "service", headerName: "Service Name", flex: 1, minWidth: 200 },
    { field: "stylist", headerName: "Stylist", flex: 1, minWidth: 200 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 200,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") !== "Cancelled"
          ? "greenColor"
          : "redColor";
      },
    },
    { field: "price", headerName: "Price", flex: 1, minWidth: 150 },
    { field: "discounted_price", headerName: "Discount Price", flex: 1, minWidth: 150 },
    { field: "discounted_amount", headerName: "Discount Amount", flex: 1, minWidth: 150 },
    { field: "intime", headerName: "In Time", flex: 1, minWidth: 150 },
    { field: "outtime", headerName: "Out Time", flex: 1, minWidth: 150 },
  ];
  useEffect(() => {
    dispatch(getAllBookingsOfSaloon(id));
  }, [id, dispatch]);
  return (
    <div>
      <SideBar/>
      <div className="data-table-wrapper">
        <h1>Bookings</h1>
        <p>{bookings?.length} Records</p>
        <DataGrid
          rows={bookings?.length ? bookings : []}
          columns={columns}
          pageSize={12}
          autoHeight
        />
      </div>
    </div>
  );
};

export default SaloonBookings;
