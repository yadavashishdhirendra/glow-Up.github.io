import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { getDateBooking, getTodaysBooking } from "../actions/UserActions";
import Input from "../components/Input/Input";
import { careLogoutUser } from "../actions/CareUserAction";
import { useNavigate } from "react-router-dom";
const CustomersBookings = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookings);
  const { bookings: dateBooking } = useSelector((state) => state.dateBookings);
  const navigate=useNavigate()
  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedDate) {
      alert("select Date");
    } else {
      dispatch(getDateBooking(selectedDate));
    }
  };
  const logouthandle = (e) => {
    e.preventDefault();
    dispatch(careLogoutUser())
    navigate("/")
  };
  const columns = [
    { field: "id", headerName: "Booking Id", flex: 1, minWidth: 250 },
    { field: "saloon", headerName: "Saloon Name", flex: 1, minWidth: 250 },
    {
      field: "saloon_no",
      headerName: "Saloon Contact",
      flex: 1,
      minWidth: 200,
    },
    { field: "category", headerName: "Category", flex: 2, minWidth: 400 },
    { field: "service", headerName: "Service Name", flex: 1, minWidth: 300 },
    {
      field: "customerId",
      headerName: "Customer Id",
      flex: 1,
      minWidth: 250,
    },
    {
      field: "customer",
      headerName: "Customer Name",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "customer_no",
      headerName: "Customer Contact",
      flex: 1,
      minWidth: 200,
    },
    { field: "payment", headerName: "Payment", flex: 1, minWidth: 150 },
    {
      field:"booking_date_time",
      headerName: "Date",
      flex: 1,
      minWidth: 250,
      renderCell: (params) => {
          return <>{new Date(params?.formattedValue).toLocaleString()}</>;
      }
    },
  ];
  useEffect(() => {
    dispatch(getTodaysBooking());
  }, [dispatch]);
  return (
    <div style={{ margin: "80px" }}>
      <div className="data-table-wrapper">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <h1>Today's Bookings</h1>
            <p>{bookings?.length} Records</p>
          </div>
          <div className="login-btn">
            <button type="submit" onClick={logouthandle}>
              Logout
            </button>
          </div>
        </div>

        <DataGrid
          rows={bookings?.length ? bookings : []}
          columns={columns}
          pageSize={12}
          autoHeight
        />
      </div>
      <div style={{ margin: "50px" }}>
        <div className="data-table-wrapper">
          <h1>Future Bookings</h1>
          <p>{dateBooking?.length} Records</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Input
              inputType={"date"}
              laBel="Select Date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <div className="login-btn">
              <button type="submit" onClick={submitHandler}>
                Submit
              </button>
            </div>
          </div>
          {dateBooking?.length ? (
            <DataGrid
              rows={dateBooking?.length ? dateBooking : []}
              columns={columns}
              pageSize={12}
              autoHeight
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomersBookings;
