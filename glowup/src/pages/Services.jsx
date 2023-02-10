import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getServicesAction,
  updateServicesAction,
} from "../actions/SaloonAction";
import { DataGrid } from "@material-ui/data-grid";
import SideBar from "../components/Sidebar/Sidebar";
import Input from "../components/Input/Input";
import {
  deleteEmployeeAction,
  getAllEmployeesAction,
} from "../actions/EmployeesAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UPDATE_SERVICES_RESET } from "../constants/SaloonConstants";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
const Services = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [field, setField] = useState();
  const [value, setvalue] = useState();
  const [ids, setIds] = useState([]);
  const [empIds, setEmpids] = useState([]);
  const { services } = useSelector((state) => state.services);
  const { employees } = useSelector((state) => state.employees);
  const { updating, success } = useSelector((state) => state.updateServices);
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Employee",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deleteEmployeeAction(id)),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
      closeOnClickOutside: true,
      closeOnEscape: true,
    });
  };
  const updatefieilds = (e) => {
    e.preventDefault();
    if (field === "myemployees" && empIds.length > 0) {
      setvalue(empIds);
      dispatch(updateServicesAction(field, value, ids, empIds));
      setvalue("");
    } else if (!ids.length) {
      alert("select serivices");
    } else if (field === "myemployees" && !empIds.length) {
      alert("select employees");
    } else {
      dispatch(updateServicesAction(field, value, ids, empIds));
      setvalue("");
    }
  };
  useEffect(() => {
    if (success) {
      toast("services updated");
      setTimeout(() => {
        dispatch({ type: UPDATE_SERVICES_RESET });
      }, 5000);
    }
    dispatch(getServicesAction(params.id));
    dispatch(getAllEmployeesAction(params.owner));
  }, [dispatch, params, success]);
  const servicesColumns = [
    { field: "id", headerName: "Service Id", minWidth: 250, flex: 1.5 },
    {
      field: "servicetype",
      headerName: "Type",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 200,
      flex: 5,
    },
    {
      field: "servicename",
      headerName: "Service Name",
      minWidth: 270,
      flex: 1.5,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 200,
      length: 500,
      flex: 10,
    },
    {
      field: "myemployees",
      headerName: "Employees",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/service/${params.getValue(params.id, "id")}/employees`}>
              view employees
            </Link>
          </>
        );
      },
    },
    {
      field: "hour",
      headerName: "Hours",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 150,
      flex: 1,
    },
  ];
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
      field: "services",
      headerName: "Services",
      minWidth: 500,
      flex: 30,
      renderCell: (params) => {
        return (
          <div style={{width:"50%",overflow:"scroll"}}>
            {
              params?.value?.toString()
           }
         </div>
        )
      }
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
            <Button onClick={() => confirmDelete(params.id)}>
              <DeleteIcon style={{ color: "black" }} />
            </Button>
          </>
        );
      },
    },
  ];
  const keys = Object.keys(services?.length ? services[0] : "");
  return (
    <div style={{ height: "150vh" }}>
      <div>
        <SideBar />
        <div className="data-table-wrapper">
          <h1>Services</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <div>
              <label>Select Field To Update</label>
              <br />
              <select value={field} onChange={(e) => setField(e.target.value)}>
                <option> </option>
                {keys.map((key) => (
                  <option value={key} key={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>

            <Input
              inputType={"text"}
              laBel="Update Field"
              value={value}
              onChange={(e) => setvalue(e.target.value)}
            />
            <div className="login-btn">
              <button type="submit" onClick={updatefieilds}>
                {updating ? "updating..." : "update"}
              </button>
            </div>
          </div>
          <DataGrid
            rows={services?.length ? services : []}
            columns={servicesColumns}
            style={{ textOverflow: "inherit" }}
            checkboxSelection
            onSelectionModelChange={(itm) => setIds(itm)}
            pageSize={8}
            autoHeight
            sortingOrder="null"
          />
        </div>
        <div style={{ marginTop: "40px", marginBottom: "20px" }}>
          <ToastContainer
            position="top-center"
            hideProgressBar={true}
            theme="colored"
          />
          <div className="data-table-wrapper">
            <h1>Employees</h1>
            <DataGrid
              rows={employees?.length ? employees : []}
              columns={employeesColumn}
              style={{ textOverflow: "inherit" }}
              checkboxSelection
              onSelectionModelChange={(itm) => {
                setEmpids(itm);
              }}
              pageSize={8}
              autoHeight
              sortingOrder="null"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
