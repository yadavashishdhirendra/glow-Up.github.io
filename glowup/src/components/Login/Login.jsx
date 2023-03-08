import React, { useEffect, useState } from "react";
import MetaTitle from "../MetaTitle/MetaTitle";
import "./Login.css";
import GirlImage from "../Assets/Image/GIRL_BACKPACK 1.png";
import GlowupLogo from "../Assets/Logo/rsz_glow_up_logo-04_1 1.png";
import { useDispatch } from "react-redux";
import { loadUser, loginUser } from "../../actions/UserActions";
import { useSelector } from "react-redux";
import Input from "../Input/Input";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(email, password));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/bookings")
    }
    if (error) {
      alert(error);
    }
  }, [isAuthenticated,navigate, error]);

  return (
    <>
      <MetaTitle title="Glow Up Salon & Scheduling - Login" />
      <div className="banner-wrapper">
        <div className="login-grid-row">
          <div>
            <img src={GlowupLogo} alt="Glowup" />
            <p>Hello Again!</p>
            <p>
              <span>Good Morning!</span> Welcome back you’ve been missed.
            </p>
            <form
              onSubmit={(e) => handleLogin(e)}
              className="login-form-wrapper"
            >
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
              <Link to={"/customer-care/login"}>
                <p>Customer Care Login?</p>
              </Link>
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

export default Login;
