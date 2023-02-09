import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSaloonsAction } from "../actions/SaloonAction";
import { DataGrid } from "@material-ui/data-grid";
import SideBar from "../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
const Saloons = () => {
  const dispatch = useDispatch();
  const { saloons } = useSelector((state) => state.allSaloons);
  useEffect(() => {
    dispatch(fetchAllSaloonsAction());
  }, [dispatch]);
  const columns = [
    { field: "id", headerName: "Saloon Id", minWidth: 200, flex: 1 },
    { field: "name", headerName: "Saloon Name", minWidth: 150, flex: 1 },
    {
      field: "address",
      headerName: "Address",
      minWidth: 350,
      flex: 2,
    },
    {
      field: "owner_id",
      headerName: "Owner",
      minWidth: 270,
      flex: 1,
    },
    {
      field: "ratings",
      headerName: "Ratings",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 100,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        console.log(params.row)
        return (
          <>
            <Link to={`/saloon/${params.getValue(params.id, "id")}/services/${params.row.owner_id}`}>
              view services
            </Link>
          </>
        );
      },
    },
  ];
  const saloonData = [];
  saloons &&
    saloons.forEach((saloon) => {
      saloonData.push({
        id: saloon._id,
        name: saloon.shopname,
        owner_id: saloon.owner,
        address: `${saloon.address},${saloon.addresssec},${saloon.city},${saloon.pincode}`,
        ratings: saloon.ratings,
      });
    });
  return (
    <div>
      <SideBar />
      <div className="data-table-wrapper">
        <h1>Saloons</h1>
        <DataGrid
          rows={saloonData}
          columns={columns}
          pageSize={15}
          autoHeight
          sortingOrder="null"
        />
      </div>
    </div>
  );
};

export default Saloons;
