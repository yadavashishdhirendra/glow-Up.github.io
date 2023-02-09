import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEmployeesAction } from "../actions/EmployeesAction";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { DataGrid } from "@material-ui/data-grid";
import SideBar from "../components/Sidebar/Sidebar";
const Employees = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { serviceEmployees } = useSelector((state) => state.employees);
  useEffect(() => {
    dispatch(getEmployeesAction(params.id));
  }, [dispatch, params]);
  const employeesColumn = [
    { field: "id", headerName: "Employee Id", minWidth: 150, flex: 1 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
    },
    { field: "intime", headerName: "In Time", minWidth: 100, flex: 0.5 },
    {
      field: "outtime",
      headerName: "Out Time",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => {}}>
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
        <h1>{params.id} employees</h1>
        <DataGrid
          rows={serviceEmployees?.length ? serviceEmployees : []}
          columns={employeesColumn}
          style={{ textOverflow: "inherit" }}
          checkboxSelection
          pageSize={8}
          autoHeight
          sortingOrder="null"
        />
      </div>
    </div>
  );
};

export default Employees;
