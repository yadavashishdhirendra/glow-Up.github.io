import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCoupanAction,
  fetchAllCoupansAction,
} from "../actions/CoupanActions";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { DataGrid } from "@material-ui/data-grid";
import SideBar from "../components/Sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DELETE_COUPAN_RESET } from "../constants/CoupanConstansts";
const Coupans = () => {
  const dispatch = useDispatch();
  const { coupans } = useSelector((state) => state.coupans);
  const { deletedCoupan } = useSelector((state) => state.deleteCoupan);
  const deleteCoupanHandler = (id) => {
    dispatch(deleteCoupanAction(id));
  };
  useEffect(() => {
        if (deletedCoupan) {
              toast(`${deletedCoupan.code} is deleted sucessfully`)
              setTimeout(() => {
              dispatch({ type: DELETE_COUPAN_RESET });
              },3000)
              dispatch(fetchAllCoupansAction())
    }
    dispatch(fetchAllCoupansAction());
  }, [dispatch,deletedCoupan]);

  const columns = [
    { field: "id", headerName: "Coupan Id", minWidth: 250, flex:1 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 0.5 },
    {
      field: "code",
      headerName: "Code",
      minWidth: 200,
      flex: 2,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 270,
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "expireAt",
      headerName: "Expiring On",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "all_vendors",
      headerName: "Applicable on Saloons",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "selected_vendors",
      headerName: "Selected Saloons",
      minWidth: 270,
      flex: 5,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() =>
                deleteCoupanHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon style={{ color: "black" }} />
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <div>
      <SideBar />
      <div className="data-table-wrapper">
        <ToastContainer
          position="top-center"
          hideProgressBar={true}
          theme="colored"
        />
        <h1>Coupans</h1>
        <DataGrid
          rows={coupans?.length?coupans:[]}
          columns={columns}
          pageSize={15}
          autoHeight
          sortingOrder="null"
        />
      </div>
    </div>
  );
};

export default Coupans;
