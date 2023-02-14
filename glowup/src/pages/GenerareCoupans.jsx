import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCoupanAction } from "../actions/CoupanActions";
import Input from "../components/Input/Input";
import SideBar from "../components/Sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { fetchAllSaloonsAction } from "../actions/SaloonAction";
import Select from "react-dropdown-select";
const GenerareCoupans = () => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [disPer, setDisPer] = useState(0);
  const [maxDis, setMaxDis] = useState(0);
  const [condition, setCondition] = useState();
  const [startDate, setStartState] = useState();
  const [endDate, setEndDate] = useState();
  const [category, setCategory] = useState([]);
  const [minAmount, setMinAmount] = useState();
  const [vendors, setVendors] = useState("");
  const [limit, setLimit] = useState(1);
  const [selectedVendors, setSelectedVen] = useState([]);
  const [resUse, setReUse] = useState(0);
  const { coupan, error } = useSelector((state) => state.newCoupan);
  const { saloons } = useSelector((state) => state.allSaloons);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const serviceCtaegories = ["Female", "Male", "Both"];
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(selectedVendors);
    if (
      name === "" ||
      description === "" ||
      !disPer ||
      !maxDis ||
      condition === "" ||
      category === ""
    ) {
      alert("please fill all fields");
    } else {
      dispatch(
        createCoupanAction(
          name,
          description,
          maxDis,
          disPer,
          category,
          condition,
          startDate,
          endDate,
          minAmount,
          resUse,
          vendors,
          selectedVendors,
          limit
        )
      );
      if (coupan.code) {
        toast(`Coupan code ${coupan.code} is saved `);
        navigate("/coupans");
      }
    }
  };
  useEffect(() => {
    if (error) {
      toast(error);
    }
    dispatch(fetchAllSaloonsAction());
  }, [error, dispatch]);
  return (
    <div>
      <SideBar />
      <div style={{ display: "flex" }}>
        <ToastContainer
          position="top-center"
          hideProgressBar={true}
          theme="colored"
        />
        <div className="data-table-wrapper">
          <h1 style={{ textAlign: "center" }}>Create Coupans</h1>
          <form
            onSubmit={onSubmitHandler}
            style={{ height: "160vh", width: "100%" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div>
                <Input
                  laBel={"Name"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  htmlFor="Name"
                  name={"Name"}
                  inputType="text"
                  id="Name"
                />
                <Input
                  laBel={"Description"}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  htmlFor="description"
                  name={"description"}
                  inputType="text"
                  id="description"
                />
                <Input
                  laBel={"Discount Percentage"}
                  value={disPer}
                  onChange={(e) => setDisPer(e.target.value)}
                  htmlFor="disPer"
                  name={"disPer"}
                  inputType="number"
                  id="disPer"
                  min="0"
                  max="100"
                />
                <Input
                  laBel={"Max Discount in Rs"}
                  value={maxDis}
                  onChange={(e) => setMaxDis(e.target.value)}
                  htmlFor="maxDis"
                  name={"maxDis"}
                  inputType="number"
                  id="maxDis"
                  min="0"
                />
                <Input
                  laBel={"Min order amount"}
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                  htmlFor="min_ord_am"
                  name={"min_ord_am"}
                  inputType="number"
                  id="min_ord_am"
                  min="0"
                />
                <Input
                  laBel={"Usage Limit Per User"}
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  htmlFor="limit"
                  name={"limit"}
                  inputType="number"
                  id="limit"
                  min="0"
                />
              </div>
              <div style={{ width: "200px" }}></div>
              <div>
                <div>
                  <label htmlFor="Category">Category</label>
                  <br />
                  <select
                    name="Category"
                    id="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {serviceCtaegories.map((cat) => (
                      <option value={cat} key={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  laBel={"Condition"}
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  htmlFor="condition"
                  name={"condition"}
                  inputType="text"
                  id="condition"
                />
                <Input
                  laBel={"Start Date"}
                  value={startDate}
                  onChange={(e) => setStartState(e.target.value)}
                  htmlFor="start-date"
                  name={"start-date"}
                  inputType="datetime-local"
                  id="start-date"
                />
                <Input
                  laBel={"End Date"}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  htmlFor="end-date"
                  name={"end-date"}
                  inputType="datetime-local"
                  id="end-date"
                />
                <Input
                  laBel={"Re-usable After Days"}
                  value={resUse}
                  onChange={(e) => setReUse(e.target.value)}
                  htmlFor="re-use"
                  name={"re-use"}
                  inputType="number"
                  id="re-use"
                />

                <div>
                  <label htmlFor="Vendors">All Vendors</label>
                  <br />
                  <select
                    name="Vendors"
                    id="vendors"
                    value={vendors}
                    onChange={(e) => setVendors(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                {vendors === "no" && (
                  <div>
                    <Select
                      style={{
                        width: "400px",
                      }}
                      dropdownHeight="100px"
                      searchBy="shopname"
                      options={saloons?.length ? saloons : []}
                      labelField="shopname"
                      valueField="_id"
                      dropdownPosition="bottom"
                      multi={true}
                      required
                      onChange={(values) =>
                        setSelectedVen(values?.map((val) => val._id))
                      }
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="login-btn">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GenerareCoupans;
