import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCoupanAction } from "../actions/CoupanActions";
import Input from "../components/Input/Input";
import SideBar from "../components/Sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const GenerareCoupans = () => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [disPer, setDisPer] = useState(0);
  const [maxDis, setMaxDis] = useState(0);
  const [condition, setCondition] = useState();
  const [category, setCategory] = useState([]);
  const { coupan, error } = useSelector((state) => state.newCoupan);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const serviceCtaegories = [
    "All",
    "Men",
    "Women",
    "Treatments",
    "Makeup",
    "Skin",
    "Nails",
  ];
  const onSubmitHandler = (e) => {
    e.preventDefault();
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
          condition
        )
      );
      if (coupan.code) {
        toast(`Coupan code ${coupan.code} is saved `);
        navigate("/coupans")
      }
    }
  };
  useEffect(() => {
    if (error) {
      toast(error);
    }
  }, [error]);
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
          <form onSubmit={onSubmitHandler}>
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
            />
            <Input
              laBel={"Max Discount in Rs"}
              value={maxDis}
              onChange={(e) => setMaxDis(e.target.value)}
              htmlFor="maxDis"
              name={"maxDis"}
              inputType="number"
              id="maxDis"
            />

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
