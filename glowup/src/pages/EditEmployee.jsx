import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  editEmployeeAction,
  getSingleEmployeeAction,
} from "../actions/EmployeesAction";
import Input from "../components/Input/Input";
import SideBar from "../components/Sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
const EditEmployee = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { employee } = useSelector((state) => state.employees);
  const { edited, loading } = useSelector((state) => state.editEmployee);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [intime, setIntime] = useState("");
  const [outtime, setOuttime] = useState("");
  const [status, setStatus] = useState("");

  const updateEmployee = (e) => {
    e.preventDefault();
    confirmAlert({
      title: "Update Employee",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            dispatch(
              editEmployeeAction(
                params.id,
                firstName,
                lastName,
                intime,
                outtime,
                status
              )
            ),
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
  useEffect(() => {
    dispatch(getSingleEmployeeAction(params.id));
    if (edited) {
      toast(`employee updated`);
    }
  }, [dispatch, params, edited]);
  useEffect(() => {
    setFirstName(employee?.firstname);
    setLastName(employee?.lastname);
    setOuttime(employee?.outtime);
    setIntime(employee?.intime);
    setStatus(employee?.status);
  }, [employee]);
  return (
    <div>
      <SideBar />
      <div style={{ display: "flex" }}>
        <div className="data-table-wrapper">
          <ToastContainer
            position="top-center"
            hideProgressBar={true}
            theme="colored"
          />
          <h1>
            Edit:- {firstName} {lastName}
          </h1>
          <form onSubmit={updateEmployee}>
            <Input
              laBel={"First Name"}
              inputType="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              laBel={"Last Name"}
              inputType="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              laBel={"In Time"}
              inputType="text"
              value={intime}
              onChange={(e) => setIntime(e.target.value)}
            />
            <Input
              laBel={"Out Time"}
              inputType="text"
              value={outtime}
              onChange={(e) => setOuttime(e.target.value)}
            />
            <Input
              laBel={"Status"}
              inputType="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />

            <div className="login-btn">
              <button type="submit" disabled={loading ? true : false}>
                {loading ? "updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
