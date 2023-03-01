import React, { useEffect, useState } from "react";
import MetaTitle from "../components/MetaTitle/MetaTitle";
import GirlImage from "../components/Assets/Image/GIRL_BACKPACK 1.png";
import GlowupLogo from "../components/Assets/Logo/rsz_glow_up_logo-04_1 1.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Input from "../components/Input/Input";
import {useNavigate } from "react-router-dom";
import { CareloginUser } from "../actions/CareUserAction";
const CustomerCareLogin = () => {
  const dispatch = useDispatch();
  const { careUserLoggedin, loading} = useSelector(
    (state) => state.customerCare
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginHandle = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("plesae fill all fields");
    } else {
      dispatch(CareloginUser(email, password));
    }
  };
  useEffect(() => {
    if (careUserLoggedin) {
      navigate("/todays-bookings");
    }
  },[navigate,careUserLoggedin]);
  return (
    <>
      <MetaTitle title="Glow Up Salon & Scheduling - Login" />
      <div className="banner-wrapper">
        <div className="login-grid-row">
          <div>
            <img src={GlowupLogo} alt="Glowup" />
            <p>Customer Care Login</p>
            <form onSubmit={loginHandle} className="login-form-wrapper">
              <Input
                htmlFor={"email"}
                laBel="Email"
                value={email}
                inputType="email"
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
              />
              <Input
                htmlFor={"password"}
                laBel="Password"
                value={password}
                inputType="text"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
              />
              <div className="login-btn">
                <button
                  type="submit"
                  disabled={!email || !password ? true : false}
                >
                  {loading ? "Loading" : "Login"}
                </button>
              </div>
            </form>
          </div>
          <div>
            <img src={GirlImage} alt="Girl-With-Bag" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerCareLogin;
